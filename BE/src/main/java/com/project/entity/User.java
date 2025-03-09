package com.project.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    
    private String user_name;
    
    @Column(name = "user_email")
    private String userEmail;
    
    private String profileImg;
    private String user_phone;
    private String user_address;
    private Long user_money;
    private Long user_reviewScore;

}
