// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // 1) 인증 토큰 상태
      accessToken: null,

      // 2) 토큰 저장 함수 (카카오, 일반 로그인 공용)
      setAccessToken: (token) => set({ accessToken: token }),

      // 3) 로그아웃 / 토큰 초기화 함수
      clearAccessToken: () => set({ accessToken: null }),

      // 4) 현재 로그인 상태 반환 (set 대신 get 사용!)
      isLoggedIn: () => !!get().accessToken,
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);

export default useAuthStore;
