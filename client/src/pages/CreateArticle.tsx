import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateArticle: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const editorRef = React.useRef<Editor>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`,
        {
          title,
          nickname,
          content: editorRef.current?.getInstance().getMarkdown() || "",
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
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-5 lg:mb-8">
            {category === "person" ? "인물사전" : "길드사전"} 작성하기
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {category === "person" ? "닉네임" : "길드명"}
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700"
                  required
                />
              </div>
              <div className="w-1/4">
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  작성자
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                내용
              </label>
              <div className="border border-gray-700 border-opacity-50 rounded-md">
                <Editor
                  ref={editorRef}
                  initialValue=""
                  previewStyle="vertical"
                  height="600px"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() =>
                  navigate(category === "person" ? "/characters" : "/guild")
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
