package com.project.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
public class Wish {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wish_id;
	
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // 찜한 사용자 (FK)

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;  // 찜한 상품 (FK)
    
    @Column(name = "wish_time")  
    private LocalDateTime wishTime; 

}
