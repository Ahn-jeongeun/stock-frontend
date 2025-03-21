import { POLY_API_KEY } from './config.js';

const polyAxios = axios.create({
  baseURL: 'https://api.polygon.io',
  headers: { Authorization: 'Bearer ' + POLY_API_KEY },
});

const _axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

_axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = sessionStorage.getItem('Authorization') ?? '';
    return config;
  },
);

_axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async(error) => {
    if (error.response && error.response.status === 401) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    
      try {
          // 로그아웃 요청 보내기
          await _axios.post('/users/logout', {});
    
          // 로그아웃 성공 시 세션 스토리지에서 토큰 및 사용자 정보 삭제
          sessionStorage.removeItem('Authorization');
          sessionStorage.removeItem('name');
    
          // 로그아웃 알림 후 페이지 새로고침
          window.location.reload(); // 새로 고침으로 상태 초기화
      } catch (logoutError) {
          // 로그아웃 실패 시 에러 처리
          console.error('Logout Error:', logoutError);
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    }
    return Promise.reject(error); // 에러를 다시 던져서 다른 부분에서 처리할 수 있도록 함
    
    
    
  },
);

export { _axios, polyAxios };

