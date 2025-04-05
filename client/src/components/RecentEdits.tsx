import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { articleService, RecentEdit } from "../services/articleService";

const RecentEdits = () => {
  const { data: recentEdits, isLoading } = useQuery<RecentEdit[]>({
    queryKey: ["recentEdits"],
    queryFn: articleService.getRecentEdits,
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "PERSON":
        return "bg-blue-100 text-blue-800";
      case "GUILD":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "PERSON":
        return "인물";
      case "GUILD":
        return "길드";
      default:
        return category;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-6">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b border-slate-300 pb-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-6">
      <h2 className="text-xl lg:text-xl font-semibold mb-4">최근 편집</h2>
      <div className="space-y-4">
        {recentEdits?.map((edit) => (
          <Link
            key={edit.id}
            to={`/wiki/${edit.id}`}
            className={`block ${edit.isHiding ? "pointer-events-none" : ""}`}
          >
            <div className="border-b border-slate-300 pb-2">
              <p
                className={`text-base font-medium ${
                  edit.isHiding ? "line-through" : ""
                }`}
              >
                {edit.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getCategoryStyle(
                    edit.category
                  )}`}
                >
                  {getCategoryText(edit.category)}
                </span>
                <p className="text-sm text-slate-500">
                  {formatTimeAgo(edit.createdAt)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentEdits;
