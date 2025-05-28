package com.amansahu.foodiesapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amansahu.foodiesapi.io.AuthenticationRequest;
import com.amansahu.foodiesapi.io.AuthenticationResponse;
import com.amansahu.foodiesapi.services.AppUserDetailsService;
import com.amansahu.foodiesapi.util.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authenticationManager;
	private final AppUserDetailsService userDetailsService;
	private final JwtUtil jwt;
	
	//STEP:6 ,7 ,8-> IMPORT USERDETAILS AND JWTUTIL  and STEP:9 --> creating filter for JWT
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		final UserDetails userDetails =  userDetailsService.loadUserByUsername(request.getEmail());
		final String jwtToken = jwt.generateToken(userDetails);
		AuthenticationResponse response = new AuthenticationResponse(request.getEmail(),jwtToken);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
