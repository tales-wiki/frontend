import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createArticle, uploadImage } from "../services/articleService";
import { handleApiError } from "../utils/errorHandler";
import { throttle } from "../utils/throttle";
import PageLayout from "./layouts/PageLayout";
import LoadingOverlay from "./LoadingOverlay";

interface ArticleWriterProps {
  category: string;
}

interface EditorConfig {
  el: HTMLElement;
  height: string;
  initialEditType: "markdown" | "wysiwyg";
  previewStyle: "vertical" | "tab";
  placeholder: string;
  hooks: {
    addImageBlobHook: (
      blob: Blob,
      callback: (url: string, altText: string) => void
    ) => Promise<void>;
  };
}

const ArticleWriter = ({ category }: ArticleWriterProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [articleTitle, setArticleTitle] = useState("");
  const [author, setAuthor] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<Editor | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const throttledUploadImage = throttle(
        async (
          blob: Blob,
          callback: (url: string, altText: string) => void
        ) => {
          try {
            setIsUploading(true);
            const imageUrl = await uploadImage(blob);
            callback(
              `${import.meta.env.VITE_IMAGE_LOCAL_URL}/${imageUrl}`,
              "이미지"
            );
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
            callback("이미지 업로드에 실패했습니다.", "이미지");
          } finally {
            setIsUploading(false);
          }
        },
        5000
      ) as (
        blob: Blob,
        callback: (url: string, altText: string) => void
      ) => Promise<void>;

      const options: EditorConfig = {
        el: editorRef.current,
        height: "500px",
        initialEditType: "markdown",
        previewStyle: "vertical",
        placeholder: "문서 내용을 입력하세요",
        hooks: {
          addImageBlobHook: throttledUploadImage,
        },
      };
      editorInstance.current = new Editor(options);
    }

    return () => {
      editorInstance.current?.destroy();
    };
  }, []);

  const getPageTitle = () => {
    switch (category) {
      case "runner":
        return "런너사전 작성하기";
      case "guild":
        return "길드사전 작성하기";
      default:
        return "문서 작성하기";
    }
  };

  const getCategory = () => {
    if (location.pathname.includes("runners/new")) {
      return "runner";
    } else if (location.pathname.includes("guilds/new")) {
      return "guild";
    }
    return category;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const content = editorInstance.current?.getMarkdown() || "";
      const response = await createArticle({
        title: articleTitle,
        nickname: author,
        category: getCategory(),
        content: content,
      });
      navigate(`/articles/${response.articleVersionId}`);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <PageLayout title={getPageTitle()} showCreateButton={false}>
      {isUploading && <LoadingOverlay message="이미지를 업로드중입니다..." />}
      <div className="flex flex-col min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-7/11">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
                  placeholder="문서 제목을 입력하세요"
                  required
                />
              </div>
              <div className="w-full lg:w-4/11">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  작성자
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
                  placeholder="작성자 이름을 입력하세요"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <div ref={editorRef} />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer border border-gray-200"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm text-white bg-slate-600 hover:bg-slate-700 rounded-md transition-colors duration-200 cursor-pointer"
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default ArticleWriter;
