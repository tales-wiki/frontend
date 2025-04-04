import axios from "axios";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { setLogout } from "../store/slices/authSlice";

interface SearchResult {
  id: number;
  title: string;
  category: string;
}

const Header = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<number | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const getCategoryName = useCallback((category: string) => {
    switch (category) {
      case "GUILD":
        return "길드";
      case "PERSON":
        return "인물";
      default:
        return category;
    }
  }, []);

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_API_URL
          }/api/articles/search?keyword=${encodeURIComponent(searchQuery)}`
        );
        setSearchResults(response.data.responses);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    navigate("/");
  }, [dispatch, navigate]);

  const handleMobileMenuClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSearchQueryChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setIsSearchOpen(true);

      // 기존 타이머가 있으면 취소
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (value.trim()) {
        searchTimeoutRef.current = setTimeout(async () => {
          setIsSearching(true);
          try {
            const response = await axios.get(
              `${
                import.meta.env.VITE_BACKEND_API_URL
              }/api/articles/search?keyword=${encodeURIComponent(value)}`
            );
            setSearchResults(response.data.responses);
          } catch (error) {
            console.error("검색 중 오류 발생:", error);
            setSearchResults([]);
          } finally {
            setIsSearching(false);
          }
        }, 300);
      } else {
        setSearchResults([]);
      }
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
          <div
            ref={searchRef}
            className="hidden md:block flex-1 max-w-xl mx-8 relative"
          >
            <form
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder="검색어를 입력하세요..."
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* 검색 결과 */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-slate-300 text-center">
                    검색 중...
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <Link
                          to={`/wiki/${result.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                          className="block px-4 py-2 hover:bg-slate-700 text-slate-100"
                        >
                          <div className="font-medium">{result.title}</div>
                          <div className="text-sm text-slate-400">
                            {getCategoryName(result.category)}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-slate-300 text-center">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            )}
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
});

export default Header;
