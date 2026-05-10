import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

// 인증이 필요없는 기본 instance
export const publicInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 인증이 필요한 instance (토큰 자동 첨부)
export const privateInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

privateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAPI = async ({ username, password }) => {
  try {
    const { data } = await publicInstance.post('/api/auth/login', {
      username,
      password,
    });

    const accessToken = data.accessToken;

    if (!accessToken) throw new Error('로그인 실패');

    localStorage.setItem('accessToken', accessToken); // 토큰 저장
    return accessToken;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};

export const logoutAPI = async () => {
  try {
    await privateInstance.post('/api/auth/logout');
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('auth-storage'); // zustand persist 스토리지도 제거
  }
};