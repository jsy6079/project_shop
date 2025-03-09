package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
