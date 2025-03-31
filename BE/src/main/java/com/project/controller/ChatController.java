package com.project.controller;

import java.time.LocalDateTime;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.project.dto.ChatMessage;

@Controller
public class ChatController {
	
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        // 메시지에 전송 시간 추가
        message.setChatUserMessageTime(LocalDateTime.now());
        return message;
    }
}
