# noogabob-server

### 디렉토리 구조

```
src
 └ api                              → api 구현 로직
    └ controllers                   → express framework handler
    └ middlewares                   → 라우터 미들웨어
         └ auth                     → 권한이 있는지 인증하는 미들웨어
         └ multer                   → multipart/form-data parser 미들웨어
         └ validators               → 요청의 유효성을 검사하는 미들웨어
    └ models                        → 모델
    └ routes                        → api 라우터
    └ service                       → controller와 model 사이의 로직을 처리
 └ configs                          → 서버 환경 설정
 └ loaders                          → 시작 프로세스를 모듈로 분할 구현
 └ utils                            → 애플리케이션 유틸리티
 └ .env                             → 애플리케이션 환경 변수 (ignore)
 └ index.js                         → 메인 애플리케이션 진입점 (entry point)
 └ server.js                        → 서버 애플케이션 구현
```

## 설치

깃허브 클론을 진행합니다.

```bash
git clone https://github.com/teamcadi/noogabob-server.git <폴더이름>
```

모듈을 설치합니다.

```bash
npm install
```

환경 변수를 셋팅합니다.

```
# 데이터베이스
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=

# 디비 스키마
DB_SCHEMA=

# 서버
PORT=
HOSTNAME=

# TOKEN 비밀키
JWT_SECRET=

# router 접두어
ROUTE_PREFIX=/api

# 실행 환경
NODE_ENV=

# dog multer fieldName
DOG_IMAGE_FIELDNAME=image
```

서버를 개발 스크립트로 실행합니다.

```
npm run dev
```

## 배포

모든 설치가 완료되면 빌드 스크립트로 트랜스파일 합니다.

```bash
npm run build
```

pm2 를 서버에 글로벌로 설치합니다.

```bash
npm install -g pm2
```

> npm 으로 실행
>
> > `npm run start`
>
> pm2 로 실행 (cluster mode)
>
> > `pm2 start ecosystem.config.js`
