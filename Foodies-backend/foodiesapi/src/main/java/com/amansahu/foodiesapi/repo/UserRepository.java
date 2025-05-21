package com.amansahu.foodiesapi.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.amansahu.foodiesapi.entities.UserEntity;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String>{
	Optional<UserEntity> findByEmail(String email);
}
