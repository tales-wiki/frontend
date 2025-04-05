import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../components/ErrorPopup";
import RecentEdits from "../components/RecentEdits";
import { articleService } from "../services/articleService";
import { ApiError } from "../types/api";

interface HistoryResponse {
  title: string;
  responses: {
    nickname: string;
    version: number;
    size: number;
    createdAt: string;
  }[];
}

const ArticleHistory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const dayOfWeek = days[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await articleService.getArticleHistory(id!);
        setHistory(data);
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.code === "HIDING_ARTICLE") {
          setError("이 게시글은 숨김 처리되어 있습니다.");
          setShowErrorPopup(true);
        } else {
          console.error("편집 로그를 불러오는데 실패했습니다:", error);
          setError("편집 로그를 불러오는 중 오류가 발생했습니다.");
          setShowErrorPopup(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!history && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">편집 로그를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      {showErrorPopup && error && (
        <ErrorPopup
          message={error}
          onClose={() => {
            setShowErrorPopup(false);
            navigate(-1);
          }}
        />
      )}
      {history && (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:flex-[5]">
            <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-12">
              <div className="flex justify-between items-center mb-5 lg:mb-8">
                <h1 className="text-2xl lg:text-4xl font-bold text-slate-800">
                  편집 로그
                </h1>
                <button
                  onClick={() => navigate(`/wiki/${id}`)}
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-100 bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                >
                  돌아가기
                </button>
              </div>
              <h2 className="text-2xl lg:text-3xl text-slate-600 font-bold mb-5">
                {history.title}
              </h2>

              <div className="space-y-4">
                {/* 헤더 - 데스크톱에서만 표시 */}
                <div className="hidden md:grid grid-cols-4 gap-4 p-4 bg-slate-100 rounded-lg font-bold">
                  <div className="text-left">버전</div>
                  <div className="text-center">생성일시</div>
                  <div className="text-right">문서 크기</div>
                  <div className="text-right">편집자</div>
                </div>
                {history.responses.map((response) => (
                  <div
                    key={response.version}
                    className="border border-slate-400 rounded-lg hover:bg-slate-50 cursor-pointer overflow-hidden"
                    onClick={() =>
                      navigate(`/wiki/${id}/version/${response.version}`)
                    }
                  >
                    {/* 모바일 레이아웃 */}
                    <div className="md:hidden">
                      <div className="bg-slate-100 px-4 py-2 flex justify-between items-center">
                        <span className="font-semibold">
                          버전 {response.version}
                        </span>
                        <span className="text-slate-600">
                          {response.nickname}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-sm text-slate-600 flex items-center">
                          {formatDate(response.createdAt)}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center">
                          {response.size} 바이트
                        </div>
                      </div>
                    </div>

                    {/* 데스크톱 레이아웃 */}
                    <div className="hidden md:grid grid-cols-4 gap-4 p-4">
                      <div className="font-semibold text-left flex items-center">
                        {response.version}
                      </div>
                      <div className="text-center text-slate-600 flex items-center justify-center">
                        {formatDate(response.createdAt)}
                      </div>
                      <div className="text-right text-slate-600 flex items-center justify-end">
                        {response.size} 바이트
                      </div>
                      <div className="text-right text-slate-600 flex items-center justify-end">
                        {response.nickname}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션: 최근 편집 내용 */}
          <div className="w-full lg:flex-[1]">
            <RecentEdits />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleHistory;
