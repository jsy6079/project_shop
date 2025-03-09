package com.project;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.repository.ProductRepository;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;

@SpringBootTest
public class ReviewData {
	
	@Autowired
	private ReviewRepository rr;
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private ProductRepository pr;
	
	@Test
	public void insertReviewTest() {
	User buyer = ur.findById(5L).orElseThrow(() -> new RuntimeException("구매자 없음"));
	User seller = ur.findById(1L).orElseThrow(() -> new RuntimeException("구매자 없음"));
	Product product = pr.findById(1L).orElseThrow(() -> new RuntimeException("상품 없음"));
	
    Review review = new Review();
    review.setReview_text("좋은 거래 감사합니다!");
    review.setReview_score("5");
    review.setBuyer(buyer);
    review.setSeller(seller);
    review.setProduct(product);
    review.setReviewTime(LocalDateTime.now());

    rr.save(review);
    
    System.out.println("리뷰 데이터 삽입 완료");
    
	}
}
