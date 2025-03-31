package com.project.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
	
//    private String senderEmail;
//    
//    private String content;
//    
//    private String role; // "user" or "admin"
//    
//    private LocalDateTime timestamp;
//    
//    private String imgUrl;
	
    private String sender; // 이메일
    private String receiver; // 이메일
    private String chatUserMessagecontent;
    private LocalDateTime chatUserMessageTime;
    private String role; // "user" or "admin"
    private String imgUrl;


    
}