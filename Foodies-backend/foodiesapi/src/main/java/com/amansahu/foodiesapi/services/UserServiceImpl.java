package com.amansahu.foodiesapi.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationFacade authenticationFacade;
	
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
			.password(passwordEncoder.encode(userRequest.getPassword()))
			.name(userRequest.getName())
			.build();
	}

	@Override
	public String findByUserId() {
		String loggedInUserEmail =  authenticationFacade.getAuthentication().getName();
		UserEntity user = userRepo.findByEmail(loggedInUserEmail).orElseThrow(()-> new UsernameNotFoundException("User not found!"));
		return user.getId();
	}
}
