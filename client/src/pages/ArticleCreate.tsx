import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

const ArticleCreate: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`,
        {
          title,
          nickname,
          content,
          category: category === "person" ? "인물" : "길드",
        }
      );

      if (response.status === 201) {
        navigate(category === "person" ? "/characters" : "/guild");
      }
    } catch (error) {
      console.error("글 작성 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-none sm:rounded-lg border-t border-b sm:border border-gray-800 p-3 sm:p-5 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-5 lg:mb-8">
            {category === "person" ? "인물사전" : "길드사전"} 작성하기
          </h2>
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
