import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { RootState } from "../store/types";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/members/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <header className="bg-slate-800 shadow-md relative">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-[60px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full py-3">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/" className="text-xl lg:text-2xl font-bold text-white">
              테일즈위키
            </Link>
            <button
              className="lg:hidden text-white hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* 데스크톱 검색바 */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex space-x-8">
            <Link
              to="/runners"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              런너사전
            </Link>
            <Link
              to="/guilds"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              길드사전
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-slate-300 hover:text-white transition-colors text-sm cursor-pointer"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일/태블릿 메뉴 */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[60px] left-0 right-0 bg-slate-800 border-t border-slate-700 px-4 md:px-6 py-3 z-50`}
        >
          {/* 모바일/태블릿 검색바 */}
          <div className="mb-2">
            <SearchBar onNavigate={() => setIsMenuOpen(false)} />
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              to="/runners"
              className="text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 rounded-lg transition-colors text-sm text-center w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              런너사전
            </Link>
            <Link
              to="/guilds"
              className="text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 rounded-lg transition-colors text-sm text-center w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              길드사전
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 rounded-lg transition-colors text-sm text-center w-full cursor-pointer"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 rounded-lg transition-colors text-sm text-center w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
