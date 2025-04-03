import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecentEdits from "../components/RecentEdits";

interface Article {
  id: number;
  title: string;
  nickname: string;
  content: string;
  createdAt: string;
}

interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toc, setToc] = useState<TableOfContents[]>([]);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // 헤더 높이 + 여유 공간
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${id}`
        );
        setArticle(response.data);
        // 목차 생성
        const headings = response.data.content.match(/^#{1,6}\s+.+$/gm) || [];
        const headingCounts: { [key: string]: number } = {};
        const tocItems = headings.map((heading: string) => {
          const level = heading.match(/^#+/)?.[0].length || 1;
          // HTML 태그 제거 및 텍스트만 추출
          const text = heading
            .replace(/^#+\s+/, "")
            .replace(/<[^>]*>/g, "")
            .replace(/&[^;]+;/g, "")
            .trim();

          // 기본 ID 생성
          const baseId = text
            .toLowerCase()
            .replace(/[^a-z0-9가-힣]/g, "-")
            .replace(/-+/g, "-");

          // 중복 체크 및 카운트 증가
          headingCounts[baseId] = (headingCounts[baseId] || 0) + 1;
          const id =
            headingCounts[baseId] > 1
              ? `${baseId}-${headingCounts[baseId]}`
              : baseId;

          return {
            id,
            text,
            level,
          };
        });
        setToc(tocItems);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

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
        <div className="text-xl">게시글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 게시글 내용 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-none md:rounded-lg lg:rounded-lg border-t border-b md:border lg:border border-gray-800 p-5 lg:p-12">
            <div className="mb-2">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
                  {article.title}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/wiki/${id}/edit`)}
                    className="bg-gray-700 text-white text-sm lg:text-base font-medium py-1.5 lg:py-2 px-3 lg:px-4 transition-colors cursor-pointer"
                  >
                    편집하기
                  </button>
                  <button
                    onClick={() => navigate(`/wiki/${id}/history`)}
                    className="bg-gray-700 text-white text-sm lg:text-base font-medium py-1.5 lg:py-2 px-3 lg:px-4 transition-colors cursor-pointer"
                  >
                    편집로그
                  </button>
                </div>
              </div>
              <div className="flex items-center text-gray-600 text-sm"></div>
            </div>

            {/* 목차 섹션 */}
            {toc.length > 0 && (
              <div className="mb-10 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm max-w-md ml-0">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-300">
                  목차
                </h2>
                <ul className="space-y-2.5">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={`cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
                        item.level === 1
                          ? "pl-0 font-medium text-base lg:text-base"
                          : item.level === 2
                          ? "pl-4 text-gray-700 text-sm lg:text-base"
                          : item.level === 3
                          ? "pl-8 text-gray-600 text-xs lg:text-sm"
                          : "pl-12 text-gray-500 text-xs lg:text-sm"
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose max-w-none">
              <Viewer
                initialValue={article.content}
                customHTMLSanitizer={(html: string) => {
                  // 헤딩 태그에 ID 추가
                  const headingCounts: { [key: string]: number } = {};
                  return html.replace(
                    /<h([1-6])(.*?)>(.*?)<\/h\1>/g,
                    (
                      _match: string,
                      level: string,
                      attrs: string,
                      content: string
                    ) => {
                      const baseId = content
                        .toLowerCase()
                        .replace(/<[^>]*>/g, "")
                        .replace(/[^a-z0-9가-힣]/g, "-")
                        .replace(/-+/g, "-");

                      headingCounts[baseId] = (headingCounts[baseId] || 0) + 1;
                      const id =
                        headingCounts[baseId] > 1
                          ? `${baseId}-${headingCounts[baseId]}`
                          : baseId;

                      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
                    }
                  );
                }}
              />
            </div>
          </div>

          {/* 마지막 편집 시간 섹션 */}
          <div className="mt-4">
            <div className="bg-white rounded-none md:rounded-lg lg:rounded-lg border-t border-b md:border lg:border border-gray-800 p-5 lg:px-10 lg:py-7">
              <div className="text-gray-600 text-sm">
                이 문서는{" "}
                {new Date(article.createdAt)
                  .toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                    formatMatcher: "basic",
                  })
                  .replace(/:/g, "시 ") + "분"}
                에 마지막으로 편집되었습니다.
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
