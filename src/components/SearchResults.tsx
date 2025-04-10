import { Link, useLocation } from "react-router-dom";

interface SearchResult {
  articleVersionId: number;
  title: string;
  category: string;
}

const SearchResults = () => {
  const location = useLocation();
  const { results, query } = location.state as {
    results: SearchResult[];
    query: string;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">"{query}" 검색 결과</h1>

      {results.length === 0 ? (
        <p className="text-slate-600">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.articleVersionId}
              to={`/article/${result.articleVersionId}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-slate-800">
                {result.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{result.category}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
