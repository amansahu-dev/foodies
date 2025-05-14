package com.amansahu.foodiesapi.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amansahu.foodiesapi.io.FoodRequest;
import com.amansahu.foodiesapi.io.FoodResponse;
import com.amansahu.foodiesapi.services.FoodServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/food")
public class FoodController {

	@Autowired
	FoodServiceImpl service;
	
	@PostMapping("/add-food")
	private ResponseEntity<FoodResponse> addFood(@RequestPart("food") String foodJson, @RequestPart("file") MultipartFile file ) throws IOException {
		FoodResponse food1 = null;
		try {
	        ObjectMapper mapper = new ObjectMapper();
	        FoodRequest food = mapper.readValue(foodJson, FoodRequest.class);

	        food1 = service.addFood(food, file);
	    } catch (JsonProcessingException e) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid Json Format");
	    } catch (IOException e) {
	    	throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"File Type Error");
		}
		 
		return new ResponseEntity<>(food1, HttpStatus.CREATED);
	}
	
	@GetMapping("/get-foods")
	private ResponseEntity<List<FoodResponse>>getFoods(){
		List<FoodResponse> foods = null;
		foods = service.getFoods();
		return new ResponseEntity<>(foods, HttpStatus.OK);
	}
	
	@GetMapping("/get-food/{id}")
	private ResponseEntity<FoodResponse> getFood(@PathVariable String id){
		FoodResponse food = null;
		try {
			food = service.getFood(id);
			return new ResponseEntity<>(food,HttpStatus.OK);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Food not found");
		}
		
	}
	
	@GetMapping("/get-food-image/{id}")
	private ResponseEntity<byte[]> getFoodImage(@PathVariable String id){
		byte[] image = null;
		try {
			image = service.getFoodImage(id);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_PNG);
			
			return new ResponseEntity<>(image,HttpStatus.OK);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Image not found");
		}
	}
	
	@DeleteMapping("/delete-food/{id}")
	@ResponseStatus(HttpStatus.OK)
	private void deleteFood(@PathVariable String id) {
		try{
			service.deleteFood(id);
		} catch(RuntimeException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Food not found by id: "+ id);
		}
	}
	
	@PutMapping("/update-food/{id}")
	private ResponseEntity<FoodResponse> updateFood(@PathVariable String id,@RequestPart("food") String foodJson, @RequestPart("file") MultipartFile file) {
		FoodResponse foodResponse = null;
		try{
			ObjectMapper mapper = new ObjectMapper();
			FoodRequest food = mapper.readValue(foodJson, FoodRequest.class);
			foodResponse = service.updateFood(id,food,file);
			return new ResponseEntity<>(foodResponse,HttpStatus.OK);
		} catch(Exception e){
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error while updating food");
		}
		
	}
}
