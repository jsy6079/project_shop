package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.ChatUserMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatUserMessageDTO {
	

	  private Long chatUserMessageId;
	  private String sender;
	  private String receiver;
	  private String chatUserMessagecontent;
	  private LocalDateTime chatUserMessageTime;
	  private String role;
	  private String imgUrl;
	  
	  public static ChatUserMessageDTO fromEntity(ChatUserMessage message) {
		  String roleImgUrl;
		  
		  if("user".equals(message.getRole())) {
			  roleImgUrl = message.getUser().getProfileImg();
		  } else if("admin".equals(message.getRole())){
			  roleImgUrl = message.getAdmin().getAdminImgUrl();
		  } else {
		        // admin이거나 예외적인 값도 여기에 처리
		        roleImgUrl = message.getAdmin().getAdminImgUrl();
		    }
		  
		 
		  return new ChatUserMessageDTO(
				  message.getChatUserMessageId(),
				  message.getUser().getUserEmail(),
				  message.getAdmin().getAdminUserEmail(),
				  message.getChatUserMessagecontent(),
				  message.getChatUserMessageTime(),
				  message.getRole(),
				  roleImgUrl
			);
	  }
	 	

}
