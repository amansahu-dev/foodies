package com.amansahu.foodiesapi.io;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {
	private String id;
	private String userId;
	private String userAddress;
	private String phoneNumber;
	private String email; 
	private double amount;
	private String orderStatus;
	private String paymentStatus;
	private String razorpayOrderId; 
	private List<OrderItem> orderedItems;
}
