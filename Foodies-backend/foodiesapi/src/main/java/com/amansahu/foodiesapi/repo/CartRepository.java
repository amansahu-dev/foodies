package com.amansahu.foodiesapi.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.amansahu.foodiesapi.entities.CartEntity;

@Repository
public interface CartRepository extends MongoRepository<CartEntity, String>{
	Optional<CartEntity> findByUserId(String userId);
	void deleteByUserId(String userId);
}
