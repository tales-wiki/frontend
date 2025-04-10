import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchArticles } from "../services/articleService";

interface SearchResult {
  articleVersionId: number;
  title: string;
  category: string;
}

interface SearchBarProps {
  onNavigate?: () => void;
}

const SearchBar = ({ onNavigate }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".search-result-item")
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await searchArticles(query);
      setSearchResults(response.payload);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
    onNavigate?.();
  };

  return (
    <div className="relative w-full lg:w-[500px]" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          placeholder="검색어를 입력하세요"
          className="w-full px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 text-sm"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          aria-label="검색어 지우기"
          onClick={() => {
            setSearchQuery("");
            setSearchResults([]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-400 hover:text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {isSearchFocused && searchQuery.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-[60]">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Link
                key={result.articleVersionId}
                to={`/articles/${result.articleVersionId}`}
                className="block p-3 hover:bg-slate-100 transition-colors search-result-item"
                onClick={handleResultClick}
              >
                <div className="text-sm font-medium text-slate-800">
                  {result.title}
                </div>
                <div className="text-xs text-slate-500">{result.category}</div>
              </Link>
            ))
          ) : (
            <div className="p-3 text-sm text-slate-500 text-center">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
