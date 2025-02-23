package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	
    private Long product_id;
    private String product_image;
    private String product_description;
    private String product_name;
    private int product_price;
    private String product_status;
    private LocalDateTime product_time;
    private int product_view;
    private Long category_id;  // FK로 category_id 추가
    private Long user_id;      // FK로 user_id 추가
    private int product_like_Count;

    // 엔티티를 DTO로 변환하는 메서드
    public static ProductDTO fromEntity(Product product) {
        return new ProductDTO(
            product.getProduct_id(),
            product.getProduct_image(),
            product.getProduct_description(),
            product.getProduct_name(),
            product.getProduct_price(),
            product.getProduct_status(),
            product.getProduct_time(),
            product.getProduct_view(),
            product.getCategory() != null ? product.getCategory().getCategory_id() : null,
            product.getUser() != null ? product.getUser().getUser_id() : null,
            product.getProduct_like_Count()
        );
    }
}
