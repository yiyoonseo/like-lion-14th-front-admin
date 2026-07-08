import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import MovieList from './pages/MovieList'; // 홈(기본) 페이지
import MyPage from './pages/MyPage'; // 마이페이지
import NotFound from './pages/NotFound'; // 404 페이지
import Top100 from './pages/Top100'; // Top100 페이지
import Login from './pages/Login'; // 로그인 페이지
import Layout from './components/layouts/Layout'; // 공통 레이아웃(네브바 등)
import useAuthStore from './stores/useAuthStore'; // 인증 토큰 전역 상태(zustand)
import KakaoCallback from './pages/KakaoCallback';

function App() {
  // 1) zustand 스토어에서 accessToken 가져오기
  //    - 값이 있으면 로그인 상태, 없으면 비로그인 상태
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    // 2) 브라우저 라우터 시작
    <BrowserRouter>
      {/* 3) 전체 라우트 목록 */}
      <Routes>
        {/* 4) 루트 경로('/')에서 공통 Layout 사용 */}
        <Route path="/" element={<Layout />}>
          {/* 5) index 라우트: '/' 접속 시 MovieList 렌더링 */}
          <Route index element={<MovieList />} />

          {/* 6) 보호 라우트: '/mypage'는 토큰이 있을 때만 접근 허용 */}
          <Route
            path="mypage"
            element={
              accessToken ? <MyPage /> : <Navigate to="/login" replace />
            }
          />
          {/* accessToken 없음 -> 로그인 페이지로 리다이렉트 */}

          {/* 7) '/top100' 라우트 */}
          <Route path="top100" element={<Top100 />} />

          {/* 8) '/login' 라우트 */}
          <Route path="login" element={<Login />} />

          {/* 9) 위에 없는 모든 경로는 NotFound(404) 처리 */}
          <Route path="*" element={<NotFound />} />

          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; // 10) App 컴포넌트 내보내기
