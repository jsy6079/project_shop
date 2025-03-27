package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.dto.ReviewDTO;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminReviewServiceImpe implements AdminReviewService {
	
	private final ReviewRepository rr;
	private final UserRepository ur;
	
	// 검토가 필요한 리뷰 리스트 가져오기
	@Override
	public Page<ReviewDTO> findReviewConfirm(Pageable pageable) {
		
		Page<Review> reviewPage = rr.findReviewConfirm(pageable);
		
		return reviewPage.map(review -> ReviewDTO.fromEntity(review));
	}

	// 리뷰 삭제 요청 승인 (점수 하락 로직 추가)
	@Override
	public void reviewRequestDeletePermit(Long review_id) {
		
		Review review = rr.findById(review_id).orElseThrow(()-> new IllegalArgumentException("해당 리뷰가 존재하지 않습니다."));
		User user = review.getSeller();
		
		user.setUser_reviewScore(user.getUser_reviewScore()-review.getReview_score());
		review.setReviewStatus("삭제승인");
		
		rr.save(review);
		ur.save(user);
		
	}

	// 리뷰 삭제 요청 반려
	@Override
	public void reviewRequestDeleteReject(Long review_id) {
		
		Review review = rr.findById(review_id).orElseThrow(()-> new IllegalArgumentException("해당 리뷰가 존재하지 않습니다."));
		
		review.setReviewStatus("삭제반려");
		
		rr.save(review);
		
	}
	
	

}
