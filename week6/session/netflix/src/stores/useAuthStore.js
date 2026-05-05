import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 인증 전역 스토어 (localStorage 저장)
 * - accessToken: 로그인 성공 시 받은 토큰
 * - setAccessToken: 토큰 저장
 * - isLoggedIn: 로그인 여부 확인
 */
const useAuthStore = create(
  persist(
    (set) => ({
      // 1) 인증 토큰 상태
      accessToken: null,

      // 2) 토큰 저장 함수
      setAccessToken: (token) => set({ accessToken: token }),

      // 3) 현재 로그인 상태 반환 (토큰 있으면 true)
      isLoggedIn: () => !!set().accessToken,
    }),
    {
      // localStorage key
      name: "auth-storage",
    }
  )
);

export default useAuthStore;