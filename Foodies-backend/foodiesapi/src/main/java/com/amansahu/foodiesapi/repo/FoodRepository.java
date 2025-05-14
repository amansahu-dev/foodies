package com.amansahu.foodiesapi.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.amansahu.foodiesapi.entities.FoodEntity;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {

	FoodEntity findByName(String name);

}
