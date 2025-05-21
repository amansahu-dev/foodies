package com.amansahu.foodiesapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amansahu.foodiesapi.io.UserRequest;
import com.amansahu.foodiesapi.io.UserResponse;
import com.amansahu.foodiesapi.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {
	
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<UserResponse> register(@RequestBody UserRequest userRequest) {
		UserResponse response = userService.registerUser(userRequest);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
}
