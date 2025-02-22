package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ProductDTO;
import com.project.entity.Product;
import com.project.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
	
	private final ProductService ps;
	
	// 가장 높은 조회수 8개 조회
	 @GetMapping("/mostview")
	 public ResponseEntity<List<ProductDTO>> getMostViewedProducts() {
	     List<ProductDTO> products = ps.mostView();
	    return ResponseEntity.ok(products);
	 }
	
	
	// 가장 많은 찜 4개 조회
	 @GetMapping("/likeview")
	 public ResponseEntity<List<ProductDTO>> getMostLikedProducts(){
		 List<ProductDTO> products = ps.mostLike();
		 return ResponseEntity.ok(products);
	 }
	 
	// 가장 최근 등록된 제품 4개 조회
	 @GetMapping("/recent")
	 public ResponseEntity<List<ProductDTO>> getMostRecentProducts(){
		 List<ProductDTO> products = ps.mostRecent();
		 return ResponseEntity.ok(products);
	 }

}
