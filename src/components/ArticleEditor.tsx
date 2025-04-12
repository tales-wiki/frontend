import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getArticle,
  updateArticle,
  uploadImage,
} from "../services/articleService";
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

interface EditorConfig {
  el: HTMLElement;
  height: string;
  initialEditType: "markdown" | "wysiwyg";
  previewStyle: "vertical" | "tab";
  initialValue: string;
  hooks: {
    addImageBlobHook: (
      blob: Blob,
      callback: (url: string, altText: string) => void
    ) => Promise<void>;
  };
}

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<Editor | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticle(id!);
        setArticle(response);
        setTitle(response.title);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (article && editorRef.current) {
      const options: EditorConfig = {
        el: editorRef.current,
        height: "500px",
        initialEditType: "markdown",
        previewStyle: "vertical",
        initialValue: article.content,
        hooks: {
          addImageBlobHook: async (
            blob: Blob,
            callback: (url: string, altText: string) => void
          ) => {
            try {
              const imageUrl = await uploadImage(blob);
              callback(
                `${import.meta.env.VITE_IMAGE_LOCAL_URL}/${imageUrl}`,
                "이미지"
              );
            } catch (error) {
              console.error("이미지 업로드 실패:", error);
              callback("이미지 업로드에 실패했습니다.", "이미지");
            }
          },
        },
      };
      editorInstance.current = new Editor(options);
    }

    return () => {
      editorInstance.current?.destroy();
    };
  }, [article]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editorInstance.current || !article) return;

    try {
      const response = await updateArticle(article.articleId, {
        nickname: author,
        content: editorInstance.current.getMarkdown(),
      });
      navigate(`/articles/${response.articleVersionId}`);
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
    <PageLayout title="편집하기" showCreateButton={false}>
      <div className="flex flex-col min-h-screen">
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-7/11">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 bg-gray-100"
                  placeholder="문서 제목을 입력하세요"
                  required
                  disabled
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
              onClick={() => navigate(`/articles/${id}`)}
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

export default ArticleEditor;
