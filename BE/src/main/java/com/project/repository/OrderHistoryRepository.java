package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.OrderHistory;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

}
