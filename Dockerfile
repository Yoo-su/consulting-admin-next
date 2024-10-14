# 기본 Node.js 이미지
FROM node:20 AS builder

# 앱 디렉토리 생성
WORKDIR /consulting-admin

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_MOCKING

ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_MOCKING=${NEXT_PUBLIC_MOCKING}

# 나머지 애플리케이션 코드 복사
COPY . .

# 사용자 정의 build-and-check 스크립트를 작업 디렉토리에 복사
COPY build-and-check.sh /usr/bin/

# build-and-check 스크립트가 실행 가능한지 확인
RUN chmod +x /usr/bin/build-and-check.sh

# Next.js 텔레메트리 비활성화
RUN npx next telemetry disable

# 빌더 단계에서 .next 디렉토리 존재 여부 확인
# RUN echo "빌더 단계에서 .next 디렉토리 확인:" && ls -la ../usr/bin

# 사용자 정의 스크립트를 사용하여 Next.js 애플리케이션 빌드
RUN build-and-check.sh

# 빌더 단계에서 .next 디렉토리 존재 여부 확인
RUN echo "빌더 단계에서 .next 디렉토리 확인:" && ls -la .next

# 프로덕션 단계
FROM node:20-alpine AS production

# stdbuf를 위한 coreutils 설치
RUN apk add --no-cache coreutils

WORKDIR /consulting-admin

# 빌드 단계에서 생성된 에셋 복사
COPY --from=builder /consulting-admin/.next ./.next
RUN echo "COPY 후 프로덕션 단계에서 .next 디렉토리 확인:" && ls -la .next

COPY --from=builder /consulting-admin/public ./public
COPY --from=builder /consulting-admin/package*.json ./

# 프로덕션 의존성 설치
RUN npm ci --omit=dev

# 의존성 설치 후 .next 디렉토리 존재 여부 확인
RUN echo "npm ci 후 프로덕션 단계에서 .next 디렉토리 확인:" && ls -la .next

# 포트 노출
EXPOSE 3000

# 로그가 확실히 플러시되도록 unbuffer를 사용하여 애플리케이션 시작
CMD ["/bin/sh", "-c", "echo '현재 디렉토리의 파일 목록:' && ls -la && echo '.next 디렉토리의 파일 목록:' && ls -la .next && echo 'Next.js 시작 중...' && stdbuf -oL npm run start"]