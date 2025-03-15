package com.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Category;
import com.project.entity.User;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Optional<Category> findByCategoryName(String productCategory);

}
