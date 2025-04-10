import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticle, reportArticle } from "../services/articleService";
import { handleApiError } from "../utils/errorHandler";
import PageLayout from "./layouts/PageLayout";

interface Article {
  articleId: number;
  articleVersionId: number;
  title: string;
  content: string;
  isNoEditing: boolean;
  isHiding: boolean;
  createdAt: string;
}

const ArticleViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [editor, setEditor] = useState<Viewer | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticle(id!);
        setArticle(response);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (article) {
      if (!editor) {
        const editorInstance = new Viewer({
          el: document.querySelector("#editor") as HTMLElement,
          initialValue: article.content,
        });
        setEditor(editorInstance);
      } else {
        editor.setMarkdown(article.content);
      }
    }
  }, [article, editor]);

  useEffect(() => {
    if (editor) {
      const headings = document.querySelectorAll(
        "#editor h1, #editor h2, #editor h3, #editor h4, #editor h5, #editor h6"
      );
      const tocContainer = document.querySelector("#toc");

      if (tocContainer) {
        const tocList = document.createElement("ul");
        tocList.className = "space-y-2";

        headings.forEach((heading, index) => {
          const headingId = `heading-${index}`;
          heading.id = headingId;

          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `#${headingId}`;
          link.textContent = heading.textContent;
          link.className =
            "text-gray-600 hover:text-gray-900 transition-colors duration-200";

          // 클릭 이벤트 핸들러 추가
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(headingId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          });

          // 제목 레벨에 따른 들여쓰기
          const level = parseInt(heading.tagName[1]);
          listItem.style.marginLeft = `${(level - 1) * 1}rem`;

          listItem.appendChild(link);
          tocList.appendChild(listItem);
        });

        tocContainer.innerHTML = "";
        tocContainer.appendChild(tocList);
      }
    }
  }, [editor, article]);

  const handleReport = async () => {
    try {
      await reportArticle(article!.articleVersionId, reportReason);
      setIsReportModalOpen(false);
      setReportReason("");
      alert("신고가 접수되었습니다.");
    } catch (error) {
      handleApiError(error);
    }
  };

  if (!article) {
    return (
      <PageLayout title="로딩 중..." showCreateButton={false}>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={article.title} showCreateButton={false}>
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {article.isNoEditing && (
                <span className="px-2 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                  편집 불가
                </span>
              )}
              {article.isHiding && (
                <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  내용 숨김
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors duration-200 cursor-pointer border border-red-200"
              >
                신고하기
              </button>
              <button
                onClick={() =>
                  navigate(`/articles/${article.articleId}/versions`)
                }
                className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer border border-gray-200"
              >
                편집로그
              </button>
              {!article.isNoEditing && (
                <button
                  onClick={() => navigate(`/articles/${id}/edit`)}
                  className="px-3 py-1 text-sm text-white bg-slate-600 hover:bg-slate-700 rounded-md transition-colors duration-200 cursor-pointer"
                >
                  편집하기
                </button>
              )}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-6" />
        </div>

        {/* 신고 모달 */}
        {isReportModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] sm:w-[32rem] max-w-[32rem] shadow-xl mx-4">
              <h2 className="text-xl font-semibold mb-4">🚨</h2>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="신고 사유를 입력해주세요 (최소 10자, 최대 100자)"
                className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4 placeholder:text-gray-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer border border-gray-200"
                >
                  닫기
                </button>
                <button
                  onClick={handleReport}
                  className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors duration-200 cursor-pointer border border-red-200"
                >
                  신고
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          >
            <span className="text-sm font-medium">목차</span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${
                isTocOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`mt-2 overflow-hidden transition-all duration-200 ${
              isTocOpen ? "h-auto" : "h-0"
            }`}
          >
            <div
              id="toc"
              className="p-4 border border-gray-200 rounded-lg bg-white"
            />
          </div>
        </div>

        <div id="editor" className="prose max-w-none" />
        <div className="text-sm text-gray-500 mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          마지막 수정일:{" "}
          {new Date(article.createdAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default ArticleViewer;
