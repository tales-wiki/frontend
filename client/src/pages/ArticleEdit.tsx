import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { articleService } from "../services/articleService";
import { ApiError } from "../types/api";

const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const editorRef = React.useRef<Editor>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleService.getArticle(id!);
        setTitle(data.title);
        setNickname("");
        setContent(data.content);
      } catch (error) {
        console.error("글 불러오기 중 오류가 발생했습니다:", error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await articleService.updateArticle(id!, {
        nickname,
        content,
      });
      navigate(`/wiki/${id}`);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 400) {
        setError(apiError.response.data.message);
      } else if (apiError.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        console.error("글 수정 중 오류가 발생했습니다:", error);
        setError("글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border-t border-b sm:border border-slate-800 p-3 sm:p-5 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-5 lg:mb-8">
            편집하기
          </h2>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          <ArticleForm
            title={title}
            nickname={nickname}
            content={content}
            onTitleChange={setTitle}
            onNicknameChange={setNickname}
            onContentChange={setContent}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/wiki/${id}`)}
            submitButtonText="편집하기"
            isTitleReadOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
