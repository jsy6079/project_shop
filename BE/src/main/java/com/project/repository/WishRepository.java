package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long> {

}
