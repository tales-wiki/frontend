import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  // 이미지 업로드 핸들러 함수
  const handleImageUpload = async (
    file: File,
    callbackFn: (url: string, altText: string) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 서버에서 반환된 이미지 URL을 사용
      callbackFn(response.data.url, file.name);
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${id}`,
        {
          title,
          nickname,
          content: editorRef.current?.getInstance().getMarkdown() || "",
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
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 bg-gray-100"
                  required
                />
              </div>
              <div className="w-full sm:w-1/4">
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  작성자
                </label>
                <input
                  type="text"
                  id="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700"
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
                  initialValue={content}
                  previewStyle="vertical"
                  height="400px"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  hooks={{
                    addImageBlobHook: handleImageUpload,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/wiki/${id}`)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
              >
                편집하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
