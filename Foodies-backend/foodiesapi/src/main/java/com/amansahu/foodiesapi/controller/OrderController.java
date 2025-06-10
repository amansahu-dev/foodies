package com.amansahu.foodiesapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.amansahu.foodiesapi.io.OrderRequest;
import com.amansahu.foodiesapi.io.OrderResponse;
import com.amansahu.foodiesapi.services.OrderService;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

	private final OrderService orderService;
	
	@PostMapping("/create")
	public ResponseEntity<OrderResponse> createOrderWithPayment(@RequestBody OrderRequest request) throws RazorpayException {
		OrderResponse response =  orderService.createOrderWithPayment(request);
		return new ResponseEntity<OrderResponse>(response,HttpStatus.CREATED);
	}
	
	@PostMapping("/verify")
	public void verifyPayment(@RequestBody Map<String, String> paymentData) {
		orderService.verifyPayment(paymentData, "paid");
	}
	
	@GetMapping
	public ResponseEntity<List<OrderResponse>> getOrder(){
		List<OrderResponse> response = orderService.getUserOrders();
		return new ResponseEntity<List<OrderResponse>>(response,HttpStatus.OK);
	}
	
	//Admin panel
	@GetMapping("/all")
	public ResponseEntity<List<OrderResponse>> getAllOrders(){
		List<OrderResponse> response = orderService.getAllOrders();
		return new ResponseEntity<List<OrderResponse>>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{orderId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteOrder(@PathVariable String orderId) {
		orderService.removeOrder(orderId);
	}
	
	//Admin panel
	@PatchMapping("/update-status/{orderId}")
	public void updateOrderStatus(@PathVariable String orderId,@RequestParam String status){
		orderService.updateOrderStatus(orderId, status);
	}
}
