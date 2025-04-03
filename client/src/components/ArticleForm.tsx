import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import { useImageUpload } from "../hooks/useImageUpload";

interface ArticleFormProps {
  title: string;
  nickname: string;
  content: string;
  onTitleChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitButtonText: string;
  isTitleReadOnly?: boolean;
  category?: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  title,
  nickname,
  content,
  onTitleChange,
  onNicknameChange,
  onContentChange,
  onSubmit,
  onCancel,
  submitButtonText,
  isTitleReadOnly = false,
  category,
}) => {
  const editorRef = React.useRef<Editor>(null);
  const { handleImageUpload } = useImageUpload();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      onContentChange(markdown);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {category === "person"
              ? "닉네임"
              : category === "guild"
              ? "길드명"
              : "제목"}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            readOnly={isTitleReadOnly}
            className={`w-full px-3 py-2 border border-gray-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 ${
              isTitleReadOnly ? "bg-gray-100" : ""
            }`}
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
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
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
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
        >
          취소
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
