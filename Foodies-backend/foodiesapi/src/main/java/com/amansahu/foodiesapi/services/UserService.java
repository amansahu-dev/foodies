package com.amansahu.foodiesapi.services;

import com.amansahu.foodiesapi.io.UserRequest;
import com.amansahu.foodiesapi.io.UserResponse;

public interface UserService {
	
	UserResponse registerUser(UserRequest userRequest);
}
