package com.amansahu.foodiesapi.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amansahu.foodiesapi.entities.FoodEntity;
import com.amansahu.foodiesapi.io.FoodRequest;
import com.amansahu.foodiesapi.io.FoodResponse;
import com.amansahu.foodiesapi.repo.FoodRepository;

@Service
public class FoodServiceImpl implements FoodService{
	
	@Autowired
	FoodRepository repo;

	@Override
	public FoodResponse addFood(FoodRequest food, MultipartFile file) throws IOException {
		FoodEntity foodEntity = convertToEntity(food, file);
		foodEntity.setImageData(file.getBytes());
		FoodEntity foodNewEntity = repo.save(foodEntity);
		return convertToResponse(foodNewEntity);
				
	}
	
	public FoodEntity convertToEntity(FoodRequest food, MultipartFile file) {
		return FoodEntity.builder()
				.name(food.getName())
				.description(food.getDescription())
				.price(food.getPrice())
				.category(food.getCategory())
				.build();
	}
	public FoodResponse convertToResponse(FoodEntity food) {
		return FoodResponse.builder()
				.id(food.getId())
				.name(food.getName())
				.description(food.getDescription())
				.price(food.getPrice())
				.category(food.getCategory())
				.imageUrl("https://foodeeshub.up.railway.app/api/food/get-food-image/"+food.getId())
				.build();
	}

	public List<FoodResponse> getFoods() {
		List<FoodEntity> foods = repo.findAll();
		return foods.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
	}

	public FoodResponse getFood(String id){
		FoodEntity foodExisting = repo.findById(id).orElseThrow(()-> new RuntimeException("Food not found for the id:"+ id));
		return convertToResponse(foodExisting);
	}

	public byte[] getFoodImage(String id) {
		FoodEntity food = repo.findById(id).orElseThrow(()-> new RuntimeException("Image not found for the id:"+ id));
		return food.getImageData();
	}

	public void deleteFood(String id) {
		FoodResponse food = getFood(id);
		repo.deleteById(food.getId());
	}

	public FoodResponse updateFood(String id, FoodRequest food, MultipartFile file) throws IOException {
		try {
			FoodResponse foodResponse = getFood(id);
			FoodEntity existingFood = new FoodEntity();
			existingFood.setId(id);
			existingFood.setName(food.getName());
			existingFood.setDescription(food.getDescription());
			existingFood.setPrice(food.getPrice());
			existingFood.setCategory(food.getCategory());
			existingFood.setImageData(file.getBytes());
			FoodEntity updatedFood =  repo.save(existingFood);
			return convertToResponse(updatedFood);
		} catch(RuntimeException e) {
			throw new RuntimeException("Food not found"); 
		}
		
	}
}
