package com.project.data;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.project.entity.Category;
import com.project.entity.Product;
import com.project.entity.User;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class ProductData {
	
	private final ProductRepository pr;
	private final UserRepository ur;
	private final CategoryRepository cr;

	public void insertDate() {
		if(pr.count() == 0) {
			 // 미리 존재하는 유저 가져오기 (예: userId = 1)
	        User user1 = ur.findById(1L).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
	        User user2 = ur.findById(2L).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

	        // 카테고리별 상품 20개 추가 (카테고리 1번부터 6번까지 유저 1번이 등록한것)
	        for (long categoryId = 1; categoryId <= 6; categoryId++) {
	            Category category = cr.findById(categoryId).orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

	            for (int i = 1; i <= 20; i++) {
	                Product product = new Product();
	                product.setProduct_name("테스트 상품 "+i);
	                product.setProduct_price(10000 + (i * 500));
	                product.setProduct_status("거래가능");
	                product.setProduct_image(null);
	                product.setProduct_description(i+"번째의 상품 설명입니다.");
	                product.setProduct_view(i);
	                product.setProduct_time(LocalDateTime.now());

	                product.setUser(user1); // FK: 판매자 설정
	                product.setCategory(category); // FK: 카테고리 설정
	                pr.save(product);
	            }
	        }
	        
	        // 카테고리별 상품 20개 추가 (카테고리 1번부터 6번까지 유저 1번이 등록한것)
	        for (long categoryId = 1; categoryId <= 6; categoryId++) {
	            Category category = cr.findById(categoryId).orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

	            for (int i = 21; i <= 40; i++) {
	                Product product = new Product();
	                product.setProduct_name("테스트 상품 "+i);
	                product.setProduct_price(10000 + (i * 500));
	                product.setProduct_status("거래가능");
	                product.setProduct_image(null);
	                product.setProduct_description(i+"번째의 상품 설명입니다.");
	                product.setProduct_view(i);
	                product.setProduct_time(LocalDateTime.now());

	                product.setUser(user2); // FK: 판매자 설정
	                product.setCategory(category); // FK: 카테고리 설정
	                pr.save(product);
	            }
	        }

	        System.out.println("카테고리별 상품 데이터 삽입 완료");
		}
		
	}

}
