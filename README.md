# Board with Vibe

간단한 회원 전용 게시판 프로젝트입니다.

## 기술 스택

### Backend
- Java 17
- Spring Boot 3.5.7
- Spring Security + JWT
- Spring Data JPA
- H2 Database

### Frontend
- React 18
- TypeScript 5
- React Router
- Axios

## 프로젝트 구조

```
board-with-vibe/
├── backend/          # Spring Boot 백엔드
└── frontend/         # React + TypeScript 프론트엔드
```

## 주요 기능

- 회원가입 / 로그인 (JWT 기반 인증)
- 게시글 목록 조회 (페이징 10개/페이지)
- 게시글 상세 조회
- 게시글 작성
- 게시글 수정 (본인 글만)
- 게시글 삭제 (본인 글만)

## 실행 방법

### Backend 실행

1. backend 디렉토리로 이동
```bash
cd backend
```

2. Maven을 사용하여 빌드 및 실행
```bash
mvn spring-boot:run
```

또는 IDE(IntelliJ, Eclipse 등)에서 `BoardApplication.java` 실행

- 백엔드 서버: http://localhost:8080
- H2 콘솔: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:boarddb`
  - Username: `sa`
  - Password: (비워두기)

### Frontend 실행

1. frontend 디렉토리로 이동
```bash
cd frontend
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

- 프론트엔드 서버: http://localhost:3000

## API 엔드포인트

### 인증 API
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

### 게시글 API (인증 필요)
- `GET /api/posts?page=0&size=10` - 게시글 목록
- `GET /api/posts/{id}` - 게시글 상세
- `POST /api/posts` - 게시글 작성
- `PUT /api/posts/{id}` - 게시글 수정
- `DELETE /api/posts/{id}` - 게시글 삭제

## 사용 흐름

1. 애플리케이션 접속 시 로그인/회원가입 페이지 표시
2. 회원가입 후 로그인
3. 로그인 성공 시 게시판 목록 페이지로 이동
4. 게시글 작성, 조회, 수정, 삭제 가능
5. 페이지네이션을 통한 게시글 목록 탐색

## 주의사항

- 백엔드를 먼저 실행한 후 프론트엔드를 실행해야 합니다.
- H2 데이터베이스는 인메모리 방식으로, 서버 재시작 시 데이터가 초기화됩니다.
- JWT 토큰은 24시간 동안 유효합니다.
- 본인이 작성한 게시글만 수정/삭제할 수 있습니다.

## 개발 환경

- Node.js 18 이상 권장
- Java 17 필수
- Maven 3.6 이상 권장
