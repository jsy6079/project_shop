package com.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Money {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "money_id")
	private Long moneyId;
	
	@Column(name = "money_time")
	private LocalDateTime moneyTime;
	
	@Column(name = "money_type")
	private String moneyType;
	
	@Column(name = "money_amount")
	private int moneyAmount;
	
	@Column(name = "money_comment")
	private String moneyComment;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
