package com.project;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.Category;
import com.project.entity.Product;
import com.project.entity.User;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;

@SpringBootTest
public class ProductData {
	
    @Autowired
    private ProductRepository pr;
    
    @Autowired
    private CategoryRepository cr;
    
    @Autowired
    private UserRepository ur;

    @Test
    public void insertProductData() {
        
        // 미리 존재하는 유저 가져오기 (예: userId = 1)
        User user = ur.findById(1L).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 카테고리별 상품 20개 추가 (카테고리 1번부터 6번까지)
        for (long categoryId = 1; categoryId <= 6; categoryId++) {
            Category category = cr.findById(categoryId).orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            for (int i = 1; i <= 20; i++) {
                Product product = new Product();
                product.setProduct_name("테스트 상품 "+i);
                product.setProduct_price(10000 + (i * 500));
                product.setProduct_status("거래가능");
                product.setProduct_image("image" + i + ".jpg");
                product.setProduct_view(i);
                product.setProduct_time(LocalDateTime.now());

                product.setUser(user); // FK: 판매자 설정
                product.setCategory(category); // FK: 카테고리 설정
                pr.save(product);
            }
        }

        System.out.println("카테고리별 상품 데이터 삽입 완료");
    }
}

