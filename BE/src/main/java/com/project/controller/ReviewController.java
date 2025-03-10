package com.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ReviewDTO;
import com.project.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
	
	private final ReviewService rs;
	
	// 리뷰 조회
	@GetMapping("/view/{email}")
	public ResponseEntity<Page<ReviewDTO>> getReviewList(@PathVariable (name = "email") String email, @RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){

		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewTime"));

		Page<ReviewDTO> response = rs.reviewList(email,pageable);
		return ResponseEntity.ok(response);
	}

}
