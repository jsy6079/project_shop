package com.project;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.Product;
import com.project.entity.User;
import com.project.entity.Wish;
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;
import com.project.repository.WishRepository;

@SpringBootTest
public class WishData {
	
    @Autowired
    private WishRepository wr;
    
    @Autowired
    private ProductRepository pr;
    
    @Autowired
    private UserRepository ur;

    @Test
    public void insertWishListData() {
        // 임시 유저 가져오기 (예: userId = 1)
        User user = ur.findById(1L)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        
        // 모든 상품 데이터 가져오기
        List<Product> products = pr.findAll();

        for (Product product : products) {
            // 찜(좋아요) 추가
            Wish wishList = new Wish();
            wishList.setUser(user);
            wishList.setProduct(product);
            wr.save(wishList);
            
            // 제품 테이블의 like_count 증가
            product.setProduct_like_Count(product.getProduct_like_Count() + 1);
            pr.save(product);
        }

        System.out.println("찜(좋아요) 데이터 삽입 완료");
    }
}
