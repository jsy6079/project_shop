package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.dto.ReviewDTO;

public interface ReviewService {

	// 리뷰 조회
	Page<ReviewDTO> reviewList(String email, Pageable pageable);

	
}
