import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { setLogout } from "../store/slices/authSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 검색 기능 구현
    console.log("검색어:", searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 모바일 뒤로가기 버튼 */}
          {location.pathname !== "/" ? (
            <div className="md:hidden flex items-center">
              <button
                onClick={handleGoBack}
                className="text-slate-300 hover:text-slate-100 focus:outline-none flex items-center justify-center"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="md:hidden w-6"></div>
          )}

          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-slate-100">
              테일즈위키
            </Link>
          </div>

          {/* 검색바 */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요..."
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-100 focus:outline-none flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/characters"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  isActive("/characters")
                    ? "text-slate-100"
                    : "text-slate-300 hover:text-slate-100"
                }`}
              >
                인물사전
              </Link>
              <Link
                to="/guild"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  isActive("/guild")
                    ? "text-slate-100"
                    : "text-slate-300 hover:text-slate-100"
                }`}
              >
                길드사전
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors duration-200 cursor-pointer flex items-center"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    isActive("/login")
                      ? "text-slate-100"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  로그인
                </Link>
              )}
            </div>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none flex items-center justify-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/characters"
                onClick={handleMobileMenuClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/characters")
                    ? "text-slate-100 bg-slate-900"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                }`}
              >
                인물사전
              </Link>
              <Link
                to="/guild"
                onClick={handleMobileMenuClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/guild")
                    ? "text-slate-100 bg-slate-900"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                }`}
              >
                길드사전
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    handleMobileMenuClick();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700 cursor-pointer"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleMobileMenuClick}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/login")
                      ? "text-slate-100 bg-slate-900"
                      : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                  }`}
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
