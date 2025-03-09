package com.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long review_id;
	
	private String review_text;
	
	private String review_score;
	
    // 리뷰 작성자 (FK)
    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;  // 리뷰 작성자

    // 리뷰 대상자 (FK)
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;  // 리뷰 대상자

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;  // 찜한 상품 (FK)
    
    @Column(name = "review_time")  
    private LocalDateTime reviewTime; 
    
}
