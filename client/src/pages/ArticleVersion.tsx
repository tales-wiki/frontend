import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import ErrorPopup from "../components/ErrorPopup";
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
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleService.getArticleVersion(id!, version!);
        setArticle(data);
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError.response?.data?.code === "HIDING_ARTICLE") {
          setError("이 게시글은 숨김 처리되어 있습니다.");
          setShowErrorPopup(true);
        } else {
          console.error("문서를 불러오는데 실패했습니다:", err);
          setError("문서를 불러오는 중 오류가 발생했습니다.");
          setShowErrorPopup(true);
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

  if (!article && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">문서를 찾을 수 없습니다.</div>
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
            showEditButton={false}
            showHistoryButton={true}
            showReportButton={false}
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

export default ArticleVersion;
