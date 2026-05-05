import { useState } from "react"; // 리액트 상태 훅
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅
import { loginAPI } from "../apis/authAPI"; // 로그인 API 함수
import useAuthStore from "../stores/useAuthStore"; // zustand 인증 스토어

const Login = () => {
  // 1) 스토어에서 토큰 저장 함수 가져오기
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate(); // 리다이렉트 함수

  // 2) 입력값 상태
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 3) 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

    // 4) 로그인 API 호출
    const accessToken = await loginAPI({ username, password });

    // 5) 토큰 저장
    setAccessToken(accessToken);

    // 6) 성공 안내
    alert("로그인 성공");
    console.log("발급된 토큰:", accessToken);

    // 7) 홈으로 이동
    navigate("/", { replace: true });
  };

  return (
    // A) 화면 전체를 감싸는 영역 (세로 가운데 정렬 + 다크 배경)
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center px-6">
      {/* B) 로그인 카드 컨테이너 */}
      <div className="w-full max-w-[420px] rounded-lg bg-black/75 p-10">
        {/* C) 페이지 제목 */}
        <h1 className="mb-6 text-3xl font-bold">로그인</h1>

        {/* D) 로그인 폼: submit 시 handleSubmit 실행 */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* E) 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            value={username} // input에 표시될 현재 상태값
            onChange={(e) => setUsername(e.target.value)} // 사용자가 입력할 때마다 실행되어 username 상태를 최신 값으로 변경
            className="h-12 w-full rounded border border-gray-500 bg-black px-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* F) 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password} // input에 표시될 현재 상태값
            onChange={(e) => setPassword(e.target.value)} // 사용자가 입력할 때마다 실행되어 password 상태를 최신 값으로 변경
            className="h-12 w-full rounded border border-gray-500 bg-black px-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* G) 로그인 제출 버튼 */}
          <button
            type="submit"
            className="mt-1 h-12 w-full rounded bg-blue-600 text-base font-bold hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;