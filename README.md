# 🚉 MOA 모두의 아이템

## **🗓** 2025.2 - 2025.4 (2개월)

### 개인프로젝트
MOA 모두의 아이템

→ 고가 중고 아이템 거래 기반 리세일 플랫폼으로 판매자-구매자 간 거래 이후 검수·결제·정산까지 전 과정을 갖춘 웹 서비스 프로젝트

🌐  랜딩 페이지 

http://43.200.254.17/

🛠️  관리자 페이지 

 http://43.200.254.17/admin/login ( ID : admin , PW: 1234 )

🎥  실행 화면 영상

https://youtu.be/2i1uFR9srLk

📝 기술 셋

- React, Spring Boot, JPA, MySQL, JWT, AWS (RDS, EC2, S3)

**💡** 주요 기여

- 프론트엔드 개발
    1. UI 구성, 데이터 연동 및 처리
        - 상품 리스트, 상세보기, 내 정보, 관리자 페이지 등 UI 개발
        - RESTful API 통신을 활용한 데이터 연동 및 처리
    2. 자동 응답 챗봇 구현
        - 리엑트 라이브러리를 활용한 자동 응답 챗봇 기능 개발
    3. 실시간 채팅 및 인터랙션 구현
        - STOMP 클라이언트와 WebSocket 연결을 통한 관리자-사용자 간 실시간 채팅 UI 구현
        - 채팅 메시지 송·수신 처리
    4. 카카오 소셜 로그인과 JWT 인증 처리 및 상태 관리 
        - Axios 기반 API 연동 및 로그인 상태 관리 로직 구현
- 백엔드 개발
    1. RESTful API 설계 및 개발
        - 유저, 상품, 주문, 리뷰, 거래, 채팅 기록 등 핵심 비즈니스 로직 처리
    2. Oauth + JWT + Refresh Token  인증 시스템 구현
        - Oauth 2.0 을 통한 카카오 소셜 로그인 구현
        - JWT를 활용한 사용자 로그인 및 인증 기능 개발
        - Access token, Refresh token 만료주기 설정 및 갱신 로직 적용
    3. 결제 시스템 구축
        - iamport API를 연동하여 결제 시스템  구현
    
     4. 검수 및 거래 상태 관리 로직 구현
    
    - 검수 실패/성공 처리, 환불 및 마일리지 적립 자동화
    1. 실시간 채팅 시스템 구축
        - STOMP 기반 WebSocket 서버 설정
        - 메시지 저장 및 인증 기반 송수신 처리 로직 구축
- 배포 및 인프라 구성
    1. AWS EC2/S3/RDS 기반 클라우드 인프라 구축
        - EC2에 백엔드 및 프론트 배포, S3로 이미지 업로드 처리, RES(MySQL) 운영
        - 빌드스크립트 구성하여 배포 자동화

**🚀** 성과

- 리세일 플랫폼의 실사용 흐름(상품 등록 → 검수 → 거래 완료)을 직접 구현하며 서비스 기획 및 개발 역량 강화
- 실시간 채팅, 검수 처리 등 복잡한 상태 전환 로직을 성공적으로 설계 및 적용
- AWS 기반의 클라우드 배포 경험을 통해 인프라 구성과 운영의 전반적인 실무 경험 확보
- JWT 기반 인증, 아임포트 API 연동 등 보안성과 확장성을 고려한 구조 설계 경험
