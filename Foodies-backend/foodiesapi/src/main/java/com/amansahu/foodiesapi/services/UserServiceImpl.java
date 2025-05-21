package com.amansahu.foodiesapi.services;

import org.springframework.stereotype.Service;

import com.amansahu.foodiesapi.entities.UserEntity;
import com.amansahu.foodiesapi.io.UserRequest;
import com.amansahu.foodiesapi.io.UserResponse;
import com.amansahu.foodiesapi.repo.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserRepository userRepo;

	@Override
	public UserResponse registerUser(UserRequest userRequest) {
		UserEntity newUser = convertToUserEntity(userRequest);
		newUser = userRepo.save(newUser);
		return convertToUserResponse(newUser); 
	}
	
	private UserResponse convertToUserResponse(UserEntity registeredUser) {
		return UserResponse.builder()
			.id(registeredUser.getId())
			.name(registeredUser.getName())
			.email(registeredUser.getEmail())
			.build();
	}

	private UserEntity convertToUserEntity(UserRequest userRequest) {
		return UserEntity.builder()
			.email(userRequest.getEmail())
			.password(userRequest.getPassword())
			.name(userRequest.getName())
			.build();
	}
}
