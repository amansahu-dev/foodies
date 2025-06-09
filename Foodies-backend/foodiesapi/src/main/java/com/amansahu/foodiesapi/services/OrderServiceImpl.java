package com.amansahu.foodiesapi.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amansahu.foodiesapi.entities.OrderEntity;
import com.amansahu.foodiesapi.io.OrderRequest;
import com.amansahu.foodiesapi.io.OrderResponse;
import com.amansahu.foodiesapi.repo.CartRepository;
import com.amansahu.foodiesapi.repo.OrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;


@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartRepository cartRepository;
	
	@Value("${razorpay_api_key}")
	private String RAZORPAY_API_KEY;
	@Value("${razorpay_secret}")
	private String RAZORPAY_SECRET;

	@Override
	public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {
		OrderEntity newOrder = convertToOrderEntity(request);
		newOrder = orderRepository.save(newOrder);
		// create Razorpay Payment Order
		RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_API_KEY,RAZORPAY_SECRET);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount",newOrder.	getAmount()*100);
		orderRequest.put("currency", "INR");
		orderRequest.put("payment_capture", 1);
		
		Order razorpayOrder = razorpayClient.orders.create(orderRequest);
		newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
		String loggedInUserId = userService.findByUserId();
		newOrder.setUserId(loggedInUserId);
		newOrder = orderRepository.save(newOrder);
		return convertToOrderResponse(newOrder);
	}

	private OrderResponse convertToOrderResponse(OrderEntity newOrder) {
		return OrderResponse.builder()
		.id(newOrder.getId())
		.userId(newOrder.getUserId())
		.userAddress(newOrder.getUserAddress())
		.amount(newOrder.getAmount())
		.email(newOrder.getEmail())
		.phoneNumber(newOrder.getPhoneNumber())
		.orderStatus(newOrder.getOrderStatus())
		.paymentStatus(newOrder.getPaymentStatus())
		.razorpayOrderId(newOrder.getRazorpayOrderId())
		.orderedItems(newOrder.getOrderedItems())
		.build();
	}

	private OrderEntity convertToOrderEntity(OrderRequest request) {
		return OrderEntity.builder()
				.orderedItems(request.getOrderedItems())
				.userAddress(request.getUserAddress())
				.amount(request.getAmount())
				.email(request.getEmail())
				.phoneNumber(request.getPhoneNumber())
				.orderStatus(request.getOrderStatus())
				.build();
	}

	@Override
	public void verifyPayment(Map<String, String> paymentData, String status) {
		System.out.println(paymentData);
		String razorpayOrderId = paymentData.get("razorpayOrderId");
		OrderEntity existingOrder = orderRepository.findByRazorpayOrderId(razorpayOrderId)
						.orElseThrow(()-> new RuntimeException("Order not found"));
		
		existingOrder.setPaymentStatus(status);
		existingOrder.setRazorpaySignature(paymentData.get("razorpaySignature"));
		existingOrder.setRazorpayPaymentId(paymentData.get("razorpayPaymentId"));
		orderRepository.save(existingOrder);
		if("paid".equalsIgnoreCase(status)) {
			cartRepository.deleteByUserId(existingOrder.getUserId());
		}
	}

	@Override
	public List<OrderResponse> getUserOrders() {
		String loggedInUserId = userService.findByUserId();
		List<OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
		return list.stream().map(entity -> convertToOrderResponse(entity)).collect(Collectors.toList());
	}

	@Override
	public void removeOrder(String orderId) {
		orderRepository.deleteById(orderId);	
	}

	@Override
	public List<OrderResponse> getAllOrders() {
		List<OrderEntity> orders =  orderRepository.findAll();
		return orders.stream().map(entity -> convertToOrderResponse(entity)).collect(Collectors.toList());
		
	}

	@Override
	public void updateOrderStatus(String orderId, String status) {
		OrderEntity entity = orderRepository.findById(orderId).orElseThrow(()-> new RuntimeException("Order not found"));
		entity.setOrderStatus(status);
		orderRepository.save(entity);
	}

}
