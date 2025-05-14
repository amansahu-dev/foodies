package com.amansahu.foodiesapi.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
import com.amansahu.foodiesapi.io.FoodRequest;
import com.amansahu.foodiesapi.io.FoodResponse;

public interface FoodService {
	FoodResponse addFood(FoodRequest food, MultipartFile file) throws IOException;
}
