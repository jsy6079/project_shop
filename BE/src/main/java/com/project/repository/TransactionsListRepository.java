package com.project.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.dto.PurchaseRequestDTO;
import com.project.entity.TransactionsList;
import com.project.entity.User;

public interface TransactionsListRepository extends JpaRepository<TransactionsList, Long> {

	Page<TransactionsList> findByUser(User user, Pageable pageable);




}
