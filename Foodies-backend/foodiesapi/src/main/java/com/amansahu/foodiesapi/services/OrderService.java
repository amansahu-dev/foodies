package com.amansahu.foodiesapi.services;

import java.util.List;
import java.util.Map;

import com.amansahu.foodiesapi.io.OrderRequest;
import com.amansahu.foodiesapi.io.OrderResponse;
import com.razorpay.RazorpayException;

public interface OrderService {
	OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;
	
	void verifyPayment(Map<String,String> paymentData,String status);
	
	List<OrderResponse> getUserOrders();
	
	void removeOrder(String orderId);
	
	List<OrderResponse> getAllOrders();
	
	void updateOrderStatus(String orderId,String status);
}
