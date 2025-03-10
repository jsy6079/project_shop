package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
	
	private Long review_id;
	private LocalDateTime review_time;
	private Long review_score;
	private String review_text;
//	private Long buyer_id;
//	private Long seller_id;
	private String buyer_name;
	private String seller_name;
	private Long product_id;
	private boolean review_request_delete;
	

	
	
	// 엔티티를 DTO로 변환하는 메서드
	public static ReviewDTO fromEntity(Review review) {
	    return new ReviewDTO(
	        review.getReview_id(),
	        review.getReviewTime(),
	        review.getReview_score(),
	        review.getReview_text(),
//	        review.getBuyer().getUser_id(),
//	        review.getSeller().getUser_id(),
	        review.getBuyer().getUser_name(),
	        review.getSeller().getUser_name(),
	        review.getProduct().getProduct_id(),
	        review.isReview_request_delete()
	        
	    );
	}


}
