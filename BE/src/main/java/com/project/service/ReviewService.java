package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.project.dto.ReviewDTO;

public interface ReviewService {

	// 리뷰 조회
	Page<ReviewDTO> reviewList(String email, Pageable pageable);
	
	// 관리자에게 리뷰 삭제 요청 : 요청 값 변경 (false -> true)
	void reviewRequestDelete(Long review_id);

	// 리뷰 등록
	String registReview(ReviewDTO reviewDTO);

	
}
