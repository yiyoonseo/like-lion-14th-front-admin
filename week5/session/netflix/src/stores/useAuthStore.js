import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
            clearAccessToken: () => set({ accessToken: null }), // 로그아웃용 추가
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuthStore;