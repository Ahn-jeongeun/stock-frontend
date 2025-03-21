# 실시간 주식 정보 조회 웹 서비스

<div>

</div>

![프로젝트 로고](/img/urecastock-bg.png)

실시간 주식 정보 조회 및 입출금 기능을 개발하며 보얀 취약점을 제고하고 실시간 통신을 구현해봤습니다.

- 시연 영상: https://youtu.be/JFfyY8l5ogk?si=dhuO34P-ooW7wICu

## 목차

- [전체 구조](#전체-구조)
- [주요 기능](#주요-기능)
- [트러블 슈팅](#트러블-슈팅)
- [기술 스택](#기술-스택)
- [팀원 소개](#팀원-소개)

## 전체 구조

- [Polygon.io](https://polygon.io/)의 WebSocket API를 사용하여 주식 정보를 실시간으로 받아옵니다.
- 로그인/회원가입과 입출금은 자체 서버에 구현하였습니다. ([Backend Github Repository](https://github.com/yyeonkim/stock-backend))

![서비스 전체 구조](/img/architecture.png)

## 주요 기능

### 1️⃣ WebSocket 설정 및 실시간 주식 정보 가져오기

Polygon에 구현된 WebSocket으로 토큰을 보내 권한을 받고, 별도의 요청(Request) 없이 실시간으로 주식 데이터를 받았습니다. 이 과정에서 WebSocket이 HTTP와 비교하여 실시간 통신에서 어떤 장점이 있는지 알게 되었습니다.

![웹소켓 특징 3가지](/img/websocket.png)

### 2️⃣ 회원가입/로그인

회원가입/로그인에 필요한 모달을 구현하고, 서버 애플리케이션에 구현한 API를 사용하여 ([Backend Github Repository](https://github.com/yyeonkim/stock-backend)) 브라우저에서 서버로 회원가입/로그인 요청을 보냈습니다.
이때 Axios interceptor를 설정하여, 401 에러가 반환되면 세션 스토리지의 로그인 정보를 삭제하고 다시 로그인 하도록 했습니다.

## 트러블 슈팅

### 1️⃣ 초기 주식 데이터가 표시되지 않는 문제

#### 문제

WebSocket이 분 단위로 데이터를 주는 제한 사항으로 1분이 지날 때 까지 주식 정보가 표시되지 않는 문제가 발생했습니다.

#### 해결

초기에는 REST API를 호출하여 최근 주식 정보를 표시하였습니다. 이때 `Promise.all`을 적용하여 비동기 통신을 병렬로 처리하여 성능을 약 1.5초 높였습니다.

### 2️⃣ 미국과의 시간 차로 요청한 날에 주식 데이터가 없는 문제 (404)

#### 문제

한국 기준으로 어제 일자의 주식 데이터를 요청했으나

1. 미국 주식 거래가 아직 끝나지 않았거나
2. 전 날이 주말인 경우

Polygon이 404 에러를 반환하였습니다.

#### 해결

주식 정보를 요청하는 함수에 try-catch문을 사용하여, 404 에러가 발생할 경우 날짜를 하나 줄이고 함수를 재귀 호출하여 다시 주식 데이터를 요청했습니다.

## 기술 스택

- 웹: HTML, CSS, Javascript
- HTTP 통신: Axios
- 날짜 포맷팅: day.js
- 주식 API: [Polygon.io](https://polygon.io/)

## 팀원 소개

<table>
  <tbody>
    <tr>
        <td align="center">
        <a href="https://github.com/yyeonkim">
            <img src="/img/coder-profile.png" width="100px;" alt=""/>
            <br />
            <sub><b>yyeonkim</b></sub>
        </a>
        <br />
        </td>
        <td align="center">
        <a href="https://github.com/Ahn-jeongeun">
            <img src="/img/profile.jpg" width="100px;" alt=""/>
            <br />
            <sub><b>Ahn-jeongeun</b></sub>
        </a>
        <br />
        </td>
    </tr>
    <tr>
        <td>
            웹소켓 통신 구현
            <br />
            입출금 구현
        </td>
        <td>
            로그인/회원가입
        </td>
    </tr>
  </tbody>
</table>
