package com.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AdminUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long adminUserId;
	
	private String adminUserEmail;
	
	private String adminUserPassword;
	
	private String adminName;
	
	private String adminImgUrl;

}
