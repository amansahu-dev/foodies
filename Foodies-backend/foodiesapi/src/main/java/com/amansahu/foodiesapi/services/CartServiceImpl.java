package com.amansahu.foodiesapi.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.amansahu.foodiesapi.entities.CartEntity;
import com.amansahu.foodiesapi.io.CartRequest;
import com.amansahu.foodiesapi.io.CartResponse;
import com.amansahu.foodiesapi.repo.CartRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final UserService userService;
	
	
	@Override
	public CartResponse getCart() {
		String loggedInUserId = userService.findByUserId();
		CartEntity entity = cartRepository.findByUserId(loggedInUserId).orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
		return convertToResponse(entity);
	}
	
	@Override
	public CartResponse addToCart(CartRequest request) {
		String loggedInUserId = userService.findByUserId();
		Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
		CartEntity cart = cartOptional.orElseGet(()-> new CartEntity(loggedInUserId,new HashMap<String,Integer>()));
		Map<String,Integer> cartItems = cart.getItems();
		cartItems.put(request.getFoodId(),cartItems.getOrDefault(request.getFoodId(), 0)+1);
		cart.setItems(cartItems); 
		cart = cartRepository.save(cart);
		return convertToResponse(cart);
	}
	
	private CartResponse convertToResponse(CartEntity cart) {
		return CartResponse.builder()
		.id(cart.getId())
		.userId(cart.getUserId())
		.items(cart.getItems())
		.build();
	}

	@Override
	public void clearCart() {
		String loggedInUserId = userService.findByUserId();
		cartRepository.deleteByUserId(loggedInUserId);
	}

	@Override
	public CartResponse removeFromCart(CartRequest request) {
		String loggedInUserId = userService.findByUserId();
		CartEntity cart = cartRepository.findByUserId(loggedInUserId).orElseThrow(()-> new RuntimeException("Cart is not found"));
		Map<String,Integer>cartItems = cart.getItems();
		if(cartItems.containsKey(request.getFoodId())) {
			int currQuantity = cartItems.get(request.getFoodId());
			if(currQuantity>0) {
				cartItems.put(request.getFoodId(),currQuantity-1);
			}else {
				cartItems.remove(request.getFoodId());
			}
			cart = cartRepository.save(cart);
		}
		return convertToResponse(cart);
	}


	
}
