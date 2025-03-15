package com.project.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String region;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public S3Service(@Value("${aws.access-key}") String accessKey,
                     @Value("${aws.secret-key}") String secretKey,
                     @Value("${aws.s3.region}") String region) {
        this.region = region;
        this.s3Client = S3Client.builder()
                .region(Region.of(region)) 
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey))) 
                .build();
    }

    public String uploadFile(String folder, MultipartFile file) throws IOException {
        String fileName = folder + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        // S3 업로드
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .contentType(file.getContentType()) // 이미지 띄우기
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );


        // 접근 가능한 URL 반환
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
    }
}
