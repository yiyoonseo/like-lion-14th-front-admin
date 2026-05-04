import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 border-b border-gray-600 left-0 right-0 h-20 bg-black text-white flex items-center justify-between px-6 md:px-10 z-50">
      {/* 데스크탑 왼쪽 메뉴 */}
      <div className="hidden md:flex space-x-10 items-center">
        <Link to="/" className="font-semibold text-2xl">
          MovieList🎬
        </Link>
        <Link to="/top100">Top 100</Link>
        <Link to="/mypage">My Page</Link>
      </div>

      {/* 모바일 로고 */}
      <Link
        to="/"
        className="md:hidden font-semibold text-xl"
        onClick={() => setIsOpen(false)}
      >
        MovieList🎬
      </Link>

      {/* 데스크탑 로그인 */}
      <Link to="/login" className="hidden md:block">
        Login
      </Link>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 열기/닫기"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-black flex flex-col px-6 py-4 space-y-4 border-b border-gray-600">
          <Link to="/top100" onClick={() => setIsOpen(false)}>
            Top 100
          </Link>
          <Link to="/mypage" onClick={() => setIsOpen(false)}>
            My Page
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
