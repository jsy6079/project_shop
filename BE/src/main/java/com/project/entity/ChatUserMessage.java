package com.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatUserMessage {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long chatUserMessageId;
	  
	  // 유저: 일반 사용자 (필수)
	  @ManyToOne
	  @JoinColumn(name = "user_id", nullable = false)
	  private User user;

	  // 관리자: 필수
	  @ManyToOne
	  @JoinColumn(name = "adminUserId", nullable = false)
	  private AdminUser admin;

	  private String chatUserMessagecontent;
	  
	  private LocalDateTime chatUserMessageTime;
	  
	  private String role;
	 
	  
	

}
