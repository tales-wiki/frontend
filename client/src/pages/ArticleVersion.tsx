import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import RecentEdits from "../components/RecentEdits";
import { articleService } from "../services/articleService";
import { ApiError } from "../types/api";

interface ArticleVersionResponse {
  title: string;
  content: string;
  version: number;
  createdAt: string;
  nickname: string;
}

const ArticleVersion = () => {
  const { id, version } = useParams<{ id: string; version: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleVersionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleService.getArticleVersion(id!, version!);
        setArticle(data);
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError.response?.data?.code === "HIDING_ARTICLE") {
          setError("이 게시글은 숨김 처리되어 있습니다.");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          console.error("문서를 불러오는데 실패했습니다:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, version, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg border border-slate-800 p-6 sm:p-8 shadow-lg w-full max-w-md text-center">
          <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
            ⚠️
          </div>
          <div className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
            {error}
          </div>
          <div className="text-sm sm:text-base text-slate-500">
            잠시 후 이전 페이지로 돌아갑니다.
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">문서를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <ArticleContent
          title={article.title}
          content={article.content}
          createdAt={article.createdAt}
          onNavigate={navigate}
          articleId={id}
          showEditButton={false}
          showHistoryButton={true}
        />

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default ArticleVersion;
