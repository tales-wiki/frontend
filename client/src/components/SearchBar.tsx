import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { articleService, SearchResult } from "../services/articleService";

interface SearchBarProps {
  isMobile?: boolean;
  onSearchClose?: () => void;
}

const SearchBar = memo(
  ({ isMobile = false, onSearchClose }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchTimeoutRef = useRef<number | undefined>(undefined);
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

    const handleSearch = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
          setSearchResults([]);
          return;
        }

        setIsSearching(true);
        try {
          const results = await articleService.searchArticles(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("검색 중 오류 발생:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      },
      [searchQuery]
    );

    const handleSearchQueryChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsSearchOpen(true);

        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        if (value.trim()) {
          searchTimeoutRef.current = setTimeout(async () => {
            setIsSearching(true);
            try {
              const results = await articleService.searchArticles(value);
              setSearchResults(results);
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
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="검색어를 입력하세요."
            className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 ${
              isMobile ? "px-3" : ""
            }`}
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

        {isSearchOpen && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-slate-300 text-center">검색 중...</div>
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
                        onSearchClose?.();
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
    );
  }
);

export default SearchBar;
