package com.project.entity;

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
public class Size {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long size_id;
	
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
	
	private String size_value;

}
