package com.amansahu.foodiesapi.services;

import com.amansahu.foodiesapi.io.CartRequest;
import com.amansahu.foodiesapi.io.CartResponse;

public interface CartService {
	CartResponse addToCart(CartRequest request);
	
	CartResponse getCart();
	
	void clearCart();
	
	CartResponse removeFromCart(CartRequest request);
	
}	
