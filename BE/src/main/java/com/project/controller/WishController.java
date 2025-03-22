package com.project.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ProductDTO;
import com.project.dto.WishDTO;
import com.project.service.WishService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishController {
	
	private final WishService ws;
	
	// 찜 목록 등록하기
	@PostMapping("/regist")
	public ResponseEntity<String> registWishProducts(@RequestBody WishDTO wishDTO){
		return ws.registWish(wishDTO.getEmail(), wishDTO.getProduct_id());
	}
	
	// 찜 목록 조회
	@GetMapping("/view")
	public ResponseEntity<Page<ProductDTO>> getWishProducts(@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "wishTime"));

		Page<ProductDTO> response = ws.wishProducts(email,pageable);
		return ResponseEntity.ok(response);
	}
	
	// 찜 목록 삭제
	@DeleteMapping("/delete/{product_id}")
	public ResponseEntity<String> deleteWishProducts(@PathVariable (name = "product_id") Long product_id){
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		ws.deleteWish(email, product_id);
		
		return ResponseEntity.ok("해당 찜이 삭제되었습니다.");
	}

}
