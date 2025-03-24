package com.project.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.OrderHistory;
import com.project.entity.TransactionsList;
import com.project.entity.User;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

	Page<OrderHistory> findByUser(User user, Pageable pageable);

	Optional<OrderHistory> findByTransactionsList(TransactionsList transactionsList);

}
