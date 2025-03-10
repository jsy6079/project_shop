package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.dto.ProductDTO;
import com.project.dto.ReviewDTO;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.entity.Wish;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpe implements ReviewService {
	
	private final ReviewRepository rr;
	private final UserRepository ur;
	

	// 리뷰 조회
	@Override
	public Page<ReviewDTO> reviewList(String email, Pageable pageable) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Review 가져오기
		Page<Review> reviewPage = rr.findBySeller(user, pageable);

		 return reviewPage.map(review -> ReviewDTO.fromEntity(review));

	}
	

	

}
