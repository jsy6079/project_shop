package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.Review;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
	
	@NotNull(message = "필수 사항 또는 유효성을 확인해주세요.")
	private Long review_score;
	
	@Size(max = 100 , message = "필수 사항 또는 유효성을 확인해주세요.")
	@NotBlank(message = "필수 사항 또는 유효성을 확인해주세요.")
	private String review_text;
	
	private String buyer_name;
	private String buyer_email;
	private String buyer_name_img;
	private String seller_name;
	private String seller_email;
	private Long product_id;
	private String product_name;
	private boolean review_request_delete;
	

	
	
	// 엔티티를 DTO로 변환하는 메서드
	public static ReviewDTO fromEntity(Review review) {
	    return new ReviewDTO(
	        review.getReview_id(),
	        review.getReviewTime(),
	        review.getReview_score(),
	        review.getReview_text(),
	        review.getBuyer().getUser_name(),
	        review.getBuyer().getUserEmail(),
	        review.getBuyer().getProfileImg(),
	        review.getSeller().getUser_name(),
	        review.getSeller().getUserEmail(),
	        review.getProduct().getProduct_id(),
	        review.getProduct().getProduct_name(),
	        review.isReview_request_delete()
	        
	    );
	}


}
