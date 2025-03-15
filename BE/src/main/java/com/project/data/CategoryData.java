package com.project.data;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.project.entity.Category;
import com.project.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class CategoryData {
	
	private final CategoryRepository cr;

	public void insertDate() {
		if (cr.count() == 0) {
		String[] cn = {"의류","신발","가방","액세서리","패션잡화","라이프스타일"};
		
		for(String name : cn) {
			Category category = new Category();
			category.setCategoryName(name);
			cr.save(category);
		}
		
		System.out.println("카테고리 데이터 삽입 성공");
		
		}
		
	}

}
