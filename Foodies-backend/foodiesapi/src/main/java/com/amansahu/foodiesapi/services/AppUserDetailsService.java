package com.amansahu.foodiesapi.services;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.amansahu.foodiesapi.entities.UserEntity;
import com.amansahu.foodiesapi.repo.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepo;
	//STEP:7 -> creating object of UserDetail by inbuilt classes of User and UserDetail by spring core
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity user = userRepo.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User Not Found!"));
		return new User(user.getEmail(),user.getPassword(),Collections.emptyList());
	} 
}
