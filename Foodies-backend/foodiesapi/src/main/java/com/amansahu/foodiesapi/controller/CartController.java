package com.amansahu.foodiesapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.amansahu.foodiesapi.io.CartRequest;
import com.amansahu.foodiesapi.io.CartResponse;
import com.amansahu.foodiesapi.services.CartService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {	
	
	private final CartService cartService;
	
	@PostMapping
	public ResponseEntity<CartResponse> addToCart(@RequestBody CartRequest request){
		String foodId = request.getFoodId();
		if(foodId == null || foodId.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId is required");
		}
		CartResponse cartResponse = cartService.addToCart(request);
		return new ResponseEntity<CartResponse>(cartResponse,HttpStatus.OK); 
	}
	
	@GetMapping
	public ResponseEntity<CartResponse> getCart(){
		CartResponse cart = cartService.getCart();
		return new ResponseEntity<CartResponse>(cart,HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> clearCart(){
		cartService.clearCart();
		return new ResponseEntity<String>("Cart Cleared!",HttpStatus.OK);
	}
	
	@PostMapping("/remove")
	public ResponseEntity<CartResponse> removeFromCart(@RequestBody CartRequest request){
		String foodId = request.getFoodId();
		if(foodId == null || foodId.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId is required");
		}
		CartResponse cartResponse = cartService.removeFromCart(request);
		return new ResponseEntity<CartResponse>(cartResponse, HttpStatus.OK);
	}
}
