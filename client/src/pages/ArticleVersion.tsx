import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import RecentEdits from "../components/RecentEdits";
import { getArticleVersion } from "../services/articleService";

interface ArticleVersionResponse {
  title: string;
  content: string;
  version: number;
  createdAt: string;
  nickname: string;
}

const ArticleVersion: React.FC = () => {
  const { id, version } = useParams<{ id: string; version: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleVersionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleVersion(id!, version!);
        setArticle(data);
      } catch (error) {
        console.error("문서를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, version]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
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
