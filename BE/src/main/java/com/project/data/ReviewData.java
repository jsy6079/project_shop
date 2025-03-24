package com.project.data;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.repository.ProductRepository;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class ReviewData {

	private final ReviewRepository rr;
	private final UserRepository ur;
	private final ProductRepository pr;

	public void insertDate() {
		if(rr.count() == 0) {
			User user1 = ur.findById(1L).orElseThrow(() -> new RuntimeException("유저 없음"));
			User user2 = ur.findById(2L).orElseThrow(() -> new RuntimeException("유저 없음"));
			Product product1 = pr.findById(1L).orElseThrow(() -> new RuntimeException("상품 없음"));
			Product product36 = pr.findById(36L).orElseThrow(() -> new RuntimeException("상품 없음"));

			// 첫번째 리뷰 데이터 
		    Review review1 = new Review();
		    review1.setReview_text("좋은 거래 감사합니다!");
		    review1.setReview_score(5L);
		    review1.setBuyer(user2);
		    review1.setSeller(user1);
		    review1.setProduct(product1); 
		    review1.setReviewTime(LocalDateTime.now());

		    rr.save(review1);
		    
		
		    // 두번째 리뷰 데이터 
		    Review review2 = new Review();
		    review2.setReview_text("거래 감사합니다!");
		    review2.setReview_score(3L);
		    review2.setBuyer(user1);
		    review2.setSeller(user2);
		    review2.setProduct(product36); 
		    review2.setReviewTime(LocalDateTime.now());

		    rr.save(review2);
		    
		    
		    System.out.println("리뷰 데이터 삽입 완료");
		}
		
	}

}
