package com.project.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.dto.ProductDTO;
import com.project.dto.ReviewDTO;
import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.entity.Wish;
import com.project.repository.ProductRepository;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpe implements ReviewService {
	
	private final ReviewRepository rr;
	private final UserRepository ur;
	private final ProductRepository pr;
	

	// 리뷰 조회 (상세페이지)
	@Override
	public Page<ReviewDTO> reviewList(String email, Pageable pageable) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Review 가져오기
		Page<Review> reviewPage = rr.findBySellerAndReviewStatusNot(user, "삭제승인", pageable);

		 return reviewPage.map(review -> ReviewDTO.fromEntity(review));

	}
	
	// 리뷰 조회 (내 정보)
	@Override
	public Page<ReviewDTO> reviewMyList(String email, Pageable pageable) {
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Review 가져오기
		Page<Review> reviewPage = rr.findBySeller(user, pageable);

		 return reviewPage.map(review -> ReviewDTO.fromEntity(review));
	}


	// 관리자에게 리뷰 삭제 요청 : 요청 값 변경 (false -> true)
	@Override
	public void reviewRequestDelete(Long review_id) {
		
		Review review = rr.findById(review_id).orElseThrow(()-> new IllegalArgumentException("해당 리뷰가 존재하지 않습니다."));
		
		review.setReview_request_delete_time(LocalDateTime.now());
		review.setReviewStatus("검토중");
		review.setReview_request_delete(true);
		
		rr.save(review);
		
	}


	// 리뷰 등록
	@Override
	public String registReview(ReviewDTO reviewDTO) {
		User buyer = ur.findByUserEmail(reviewDTO.getBuyer_email())
				.orElseThrow(()-> new IllegalArgumentException("해당 구매자의 이메일이 존재하지 않습니다."));
	
		
		User seller = ur.findByUserEmail(reviewDTO.getSeller_email())
				.orElseThrow(()-> new IllegalArgumentException("해당 판매자의 이메일이 존재하지 않습니다."));
		
		Product product = pr.findById(reviewDTO.getProduct_id())
				.orElseThrow(()-> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
		
		// 이미 해당 제품에 리뷰를 했는가 (해당 상품에 같은 로그인을 한 유저, 즉 product_id 와 user_id 가 일치하는 컬럼이 있다면 등록 불가능)
		if(rr.existsByBuyerAndProduct(buyer, product)) {
			return "이미 작성한 리뷰가 존재합니다.";
		}
		
		// 로그인 한 유저가 판매 물품을 올린 판매자와 같으면 리뷰 등록 불가능
		if(reviewDTO.getBuyer_email().equals(reviewDTO.getSeller_email())) {
			return "본인이 등록한 상품은 리뷰 작성이 불가합니다.";
		}
		
		Review review = new Review();
		review.setReviewTime(LocalDateTime.now());
		review.setReview_score(reviewDTO.getReview_score());
		review.setReview_text(reviewDTO.getReview_text());
		review.setBuyer(buyer);
		review.setProduct(product);
		review.setSeller(seller);
		review.setReviewStatus("정상");
		
		// 리뷰 점수 기존 점수에서 합산하기
		seller.setUser_reviewScore(seller.getUser_reviewScore() + reviewDTO.getReview_score());
		
		rr.save(review);
		
		return "리뷰가 등록 되었습니다.";
	}



	
}
