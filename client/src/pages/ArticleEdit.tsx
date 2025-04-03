import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const editorRef = React.useRef<Editor>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${id}`
        );
        setTitle(response.data.title);
        setNickname(response.data.nickname);
        setContent(response.data.content);
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

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${id}`,
        {
          title,
          nickname,
          content,
        }
      );

      if (response.status === 200) {
        navigate(`/wiki/${id}`);
      }
    } catch (error) {
      console.error("글 수정 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-none sm:rounded-lg border-t border-b sm:border border-gray-800 p-3 sm:p-5 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-5 lg:mb-8">
            편집하기
          </h2>
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
