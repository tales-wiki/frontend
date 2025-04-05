import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import ErrorPopup from "../components/ErrorPopup";
import RecentEdits from "../components/RecentEdits";
import { Article, articleService } from "../services/articleService";
import { ApiError } from "../types/api";

const ArticleView = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getArticle(id!);
        setArticle(data);
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError.response?.data?.code === "HIDING_ARTICLE") {
          setError("이 게시글은 숨김 처리되어 있습니다.");
          setShowErrorPopup(true);
        } else {
          console.error("게시글을 불러오는데 실패했습니다:", err);
          setError("게시글을 불러오는 중 오류가 발생했습니다.");
          setShowErrorPopup(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:flex-[5]">
            <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-12">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-[1]">
            <RecentEdits />
          </div>
        </div>
      </div>
    );
  }

  if (!article && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">게시글을 찾을 수 없습니다.</div>
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
      {article && (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <ArticleContent
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
            onNavigate={navigate}
            articleId={id}
          />

          {/* 오른쪽 섹션: 최근 편집 내용 */}
          <div className="w-full lg:flex-[1]">
            <RecentEdits />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
