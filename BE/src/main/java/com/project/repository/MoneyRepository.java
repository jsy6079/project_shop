package com.project.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Money;
import com.project.entity.User;

public interface MoneyRepository extends JpaRepository<Money, Long> {

	Page<Money> findByUser(User user, Pageable pageable);


}
