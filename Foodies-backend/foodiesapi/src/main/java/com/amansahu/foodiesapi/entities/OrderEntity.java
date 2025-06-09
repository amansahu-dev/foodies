package com.amansahu.foodiesapi.entities;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.amansahu.foodiesapi.io.OrderItem;

import lombok.Builder;
import lombok.Data;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {
	private String id;
	private String userId;
	private String userAddress;
	private String phoneNumber;
	private String email;
	private List<OrderItem> orderedItems; 
	private String orderStatus;
	private double amount;
	private String paymentStatus;
	private String razorpayOrderId; 
	private String razorpaySignature;
	private String razorpayPaymentId;
}
