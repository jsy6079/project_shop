package com.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private String email;
	
	@Size(max = 13)
	@NotBlank(message = "전화번호를 입력해주세요.")
	private String phone;
	
	@Size(max = 100)
	@NotBlank(message = "주소를 입력해주세요.")
	private String address;
	

}
