package com.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Review;
import com.project.entity.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	// 리뷰 조회
	Page<Review> findBySeller(User seller, Pageable pageable); 

}
