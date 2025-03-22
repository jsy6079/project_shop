package com.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SalesHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long salesHistoryId;
	
	private LocalDateTime salesHistoryTime;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@OneToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "transactionId", nullable = true)
	private TransactionsList transactionsList;

}
