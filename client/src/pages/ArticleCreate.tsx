import "@toast-ui/editor/dist/toastui-editor.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { articleService } from "../services/articleService";
import { ApiError } from "../types/api";

const ArticleCreate = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowErrorPopup(false);

    try {
      const response = await articleService.createArticle({
        title,
        nickname,
        content,
        category: category === "person" ? "인물" : "길드",
      });

      if (response.status === 201) {
        navigate(category === "person" ? "/characters" : "/guild");
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 400) {
        setError(apiError.response.data.message);
      } else if (apiError.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        console.error("글 작성 중 오류가 발생했습니다:", error);
        setError("글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border-t border-b sm:border border-slate-800 p-3 sm:p-5 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-5 lg:mb-8">
            {category === "person" ? "인물사전" : "길드사전"} 작성하기
          </h2>
          {showErrorPopup && error && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3">알림</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  확인
                </button>
              </div>
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
            onCancel={() =>
              navigate(category === "person" ? "/characters" : "/guild")
            }
            submitButtonText="작성하기"
            category={category}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCreate;
