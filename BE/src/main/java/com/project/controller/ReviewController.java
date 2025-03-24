package com.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ReviewDTO;
import com.project.dto.WishDTO;
import com.project.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
	
	private final ReviewService rs;
	
	// 리뷰 조회
	@GetMapping("/view/{email}")
	public ResponseEntity<Page<ReviewDTO>> getReviewList(@PathVariable(name = "email") String email,@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){
		
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewTime"));

		Page<ReviewDTO> response = rs.reviewList(email,pageable);
		return ResponseEntity.ok(response);
	}
	
	// 관리자에게 리뷰 삭제 요청 : 요청 값 변경 (false -> true)
	@PutMapping("/request/{review_id}")
	public ResponseEntity<String> putReviewRequestDelete(@PathVariable (name = "review_id") Long review_id) {
		
		rs.reviewRequestDelete(review_id);
		
		return ResponseEntity.ok("리뷰 삭제 요청이 정상적으로 접수되었습니다.");
	}
	
	
	// 리뷰 등록
	@PostMapping("/regist")
	public ResponseEntity<String> registReviewProducts(@Valid @RequestBody ReviewDTO reviewDTO, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			String response = bindingResult.getAllErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body(response);
		}
		
		String response = rs.registReview(reviewDTO);
		
		return ResponseEntity.ok(response); 
	}

}
