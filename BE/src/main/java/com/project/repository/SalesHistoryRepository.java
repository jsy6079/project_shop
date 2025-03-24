package com.project.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Product;
import com.project.entity.SalesHistory;
import com.project.entity.TransactionsList;
import com.project.entity.User;

public interface SalesHistoryRepository extends JpaRepository<SalesHistory, Long> {

	Optional<SalesHistory> findByProduct(Product product);

	Page<SalesHistory> findByUser(User user, Pageable pageable);

	Optional<SalesHistory> findByTransactionsList(TransactionsList transactionsList);

}
