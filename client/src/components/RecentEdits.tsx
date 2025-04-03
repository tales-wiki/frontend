import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RecentEdit {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

const RecentEdits: React.FC = () => {
  const [recentEdits, setRecentEdits] = useState<RecentEdit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEdits = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/recent-edits`
        );
        setRecentEdits(response.data.responses);
      } catch (error) {
        console.error("최근 편집 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEdits();
  }, []);

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
        return "bg-gray-100 text-gray-800";
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-6">
        <h2 className="text-xl lg:text-xl font-semibold mb-4">최근 편집</h2>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-6">
      <h2 className="text-xl lg:text-xl font-semibold mb-4">최근 편집</h2>
      <div className="space-y-4">
        {recentEdits.map((edit) => (
          <Link key={edit.id} to={`/wiki/${edit.id}`} className="block">
            <div className="border-b pb-2">
              <p className="text-base font-medium">{edit.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getCategoryStyle(
                    edit.category
                  )}`}
                >
                  {getCategoryText(edit.category)}
                </span>
                <p className="text-sm text-gray-500">
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
