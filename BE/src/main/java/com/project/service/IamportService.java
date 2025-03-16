package com.project.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IamportService {
	
	@Value("${iamport.api.key}")
	private String apiKey;
	
	@Value("${iamport.api.secret}")
	private String apiSecret;
	
	
    private final RestTemplate restTemplate;

    public IamportService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }
	
    
	
	// 토큰 발급
    public String getToken() {
        String url = "https://api.iamport.kr/users/getToken";

        Map<String, String> request = Map.of(
            "imp_key", apiKey,
            "imp_secret", apiSecret
        );
        

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Map<String, Object> body = (Map<String, Object>) response.getBody().get("response");
        
        System.out.println("imp_key2" + apiKey);
        System.out.println("imp_secret2" + apiSecret);
        
    	
        return (String) body.get("access_token");
        
        
    }

    // 결제 검증
    public Map<String, Object> verifyPayment(String impUid) {
        String token = getToken();
        String url = "https://api.iamport.kr/payments/" + impUid;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        return response.getBody(); // 검증 결과 반환
    }

	

}