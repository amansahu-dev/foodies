package com.amansahu.foodiesapi.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.amansahu.foodiesapi.entities.OrderEntity;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, String>{
	List<OrderEntity> findByUserId(String userId);
	Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);
}
