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
    public void insertUserAndProductData() {
        // ✅ 1. 유저 데이터 추가
        User user = new User();
        user.setUser_name("홍길동");
        user.setUser_email("test@example.com");
        user.setUser_phone("010-1234-5678");
        user.setUser_address("서울시 강남구");
        user.setUser_money(10000L);
        ur.save(user);

        // ✅ 2. 카테고리를 미리 가져오기 (의류)
        Category category = cr.findById(1L).orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        // ✅ 3. 상품 데이터 20개 추가
        for (int i = 1; i <= 20; i++) {
            Product product = new Product();
            product.setProduct_name("테스트 상품 " + i);
            product.setProduct_price((i * 500));
            product.setProduct_status("판매중");
            product.setProduct_image("image" + i + ".jpg");
            product.setProduct_time(LocalDateTime.now());

            product.setUser(user); // FK: 판매자
            product.setCategory(category); // FK: 카테고리
            pr.save(product);
        }

        System.out.println("유저 및 상품 데이터 삽입 완료");
    }
    
}
