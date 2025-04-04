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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        const errorCode = apiError.response.data.code;
        switch (errorCode) {
          case "ALREADY_WRITTEN_ARTICLE_TITLE_AND_CATEGORY":
            setError(
              category === "person"
                ? "이미 등록된 인물입니다. 다른 닉네임을 사용해주세요."
                : "이미 등록된 길드입니다. 다른 길드명을 사용해주세요."
            );
            break;
          case "INVALID_ARTICLE_TITLE_LENGTH":
            setError(
              category === "person"
                ? "닉네임 길이가 올바르지 않습니다. (최대 12자)"
                : "길드명 길이가 올바르지 않습니다. (최대 12자)"
            );
            break;
          case "INVALID_ARTICLE_TITLE":
            setError(
              category === "person"
                ? "닉네임이 올바르지 않습니다."
                : "길드명이 올바르지 않습니다."
            );
            break;
          case "INVALID_ARTICLE_NICKNAME_LENGTH":
            setError(
              category === "person"
                ? "닉네임 길이가 올바르지 않습니다. (최대 10자)"
                : "길드명 길이가 올바르지 않습니다. (최대 10자)"
            );
            break;
          default:
            setError(apiError.response.data.message);
        }
      } else {
        console.error("글 작성 중 오류가 발생했습니다:", error);
        setError("글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border-t border-b sm:border border-slate-800 p-3 sm:p-5 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-5 lg:mb-8">
            {category === "person" ? "인물사전" : "길드사전"} 작성하기
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
