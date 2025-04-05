import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import React, { useEffect, useState } from "react";
import ReportModal from "./ReportModal";
import TableOfContents from "./TableOfContents";

interface ArticleContentProps {
  title: string;
  content: string;
  createdAt: string;
  onNavigate?: (path: string) => void;
  showEditButton?: boolean;
  showHistoryButton?: boolean;
  showReportButton?: boolean;
  articleId?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  title,
  content,
  createdAt,
  onNavigate,
  showEditButton = true,
  showHistoryButton = true,
  showReportButton = true,
  articleId,
}) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
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
    // 목차 생성
    const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
    const headingCounts: { [key: string]: number } = {};
    const tocItems = headings.map((heading: string) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading
        .replace(/^#+\s+/, "")
        .replace(/<[^>]*>/g, "")
        .replace(/&[^;]+;/g, "")
        .trim();

      const baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]/g, "-")
        .replace(/-+/g, "-");

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
  }, [content]);

  return (
    <div className="w-full lg:flex-[5]">
      <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
              {title}
            </h1>
            {onNavigate &&
              articleId &&
              (showEditButton || showHistoryButton || showReportButton) && (
                <div className="flex gap-1.5">
                  {showReportButton && (
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-400 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
                    >
                      신고하기
                    </button>
                  )}
                  {showHistoryButton && (
                    <button
                      onClick={() => onNavigate(`/wiki/${articleId}/history`)}
                      className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                    >
                      편집로그
                    </button>
                  )}
                  {showEditButton && (
                    <button
                      onClick={() => onNavigate(`/wiki/${articleId}/edit`)}
                      className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-100 bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                    >
                      편집하기
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>

        <TableOfContents items={toc} onItemClick={scrollToSection} />

        <div className="prose max-w-none">
          <Viewer
            initialValue={content}
            customHTMLSanitizer={(html: string) => {
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

      <div className="mt-4">
        <div className="bg-white rounded-lg border border-gray-800 p-5 lg:px-10 lg:py-7">
          <div className="text-gray-600 text-sm">
            이 문서는{" "}
            {new Date(createdAt)
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

      {showReportModal && articleId && (
        <ReportModal
          articleId={articleId}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};

export default ArticleContent;
