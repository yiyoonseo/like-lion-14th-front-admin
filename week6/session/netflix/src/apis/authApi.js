import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * [기존 기본 버전 - fetch] (세션용 보관)
 */
// export const loginAPI = async ({ username, password }) => {
//   try {
//     // 1) 로그인 API 요청 (POST /api/auth/login)
//     const response = await fetch(`${BASE_URL}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         // 2) JSON 형식으로 보낸다고 서버에 알림
//         "Content-Type": "application/json",
//       },
//       // 3) username, password를 요청 본문에 담아 전송
//       body: JSON.stringify({ username, password }),
//     });
//
//     // 4) 서버 응답(JSON) 파싱
//     const data = await response.json();
//
//     // 5) HTTP 상태코드가 실패면 에러 처리
//     if (!response.ok) {
//       throw new Error("로그인 실패");
//     }
//
//     // 6) 응답에서 accessToken 추출
//     const accessToken = data.accessToken;
//
//     // 7) 토큰이 없으면 실패 처리
//     if (!accessToken) {
//       throw new Error("로그인 실패");
//     }
//
//     // 8) 로그인 성공 시 토큰 반환
//     return accessToken;
//   } catch (error) {
//     // 9) 네트워크/서버/파싱 에러를 공통 메시지로 처리
//     throw new Error("로그인 실패");
//   }
// };

/**
 * [업데이트 버전 - axios]
 */
export const loginAPI = async ({ username, password }) => {
  try {
    // 1) axios로 로그인 요청
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });

    // 2) 응답에서 accessToken 추출
    const accessToken = data.accessToken;

    // 3) 토큰이 없으면 실패 처리
    if (!accessToken) {
      throw new Error("로그인 실패");
    }

    // 4) 성공 시 토큰 반환
    return accessToken;
  } catch (error) {
    // 5) 실패 시 공통 메시지 처리
    throw new Error("로그인 실패");
  }
};