import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getLatestArticles } from "../services/articleService";

interface RecentArticle {
  articleVersionId: number;
  title: string;
  category: string;
  updatedAt: string;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "런너":
      return "bg-blue-100 text-blue-700";
    case "길드":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentEdits = () => {
  const navigate = useNavigate();

  const {
    data: recentArticles = [],
    isLoading,
    error,
  } = useQuery<RecentArticle[]>({
    queryKey: ["recentArticles"],
    queryFn: async () => {
      const { payload } = await getLatestArticles();
      return payload;
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
    gcTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
  });

  if (isLoading) {
    return (
      <div className="w-full lg:w-[240px] shrink-0">
        <div className="bg-white p-4 lg:p-6 lg:rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold mb-2 text-center">최근 편집</h2>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-[240px] shrink-0">
        <div className="bg-white p-4 lg:p-6 lg:rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold mb-2 text-center">최근 편집</h2>
          <div className="text-red-500 text-center">
            데이터를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[240px] shrink-0">
      <div className="bg-white p-4 lg:p-6 lg:rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold mb-2 text-center">최근 편집</h2>
        <div className="space-y-1.5">
          {recentArticles.map((article: RecentArticle, index: number) => (
            <div key={article.articleVersionId}>
              <div
                className="group cursor-pointer rounded p-1.5 hover:bg-slate-50 transition-colors"
                onClick={() =>
                  navigate(`/articles/${article.articleVersionId}`)
                }
              >
                <div className="text-sm text-gray-700 mb-0.5">
                  {article.title}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {index !== recentArticles.length - 1 && (
                <div className="h-px bg-gray-200 my-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentEdits;
