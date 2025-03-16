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
	
	@Size(max = 13, message = "필수 사항 또는 유효성을 확인해주세요.")
	@NotBlank(message = "필수 사항 또는 유효성을 확인해주세요.")
	private String phone;
	
	@Size(max = 100, message = "필수 사항 또는 유효성을 확인해주세요.")
	@NotBlank(message = "필수 사항 또는 유효성을 확인해주세요.")
	private String address;
	

}
