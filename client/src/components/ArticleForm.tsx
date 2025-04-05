import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import { useImageUpload } from "../hooks/useImageUpload";

const defaultContent = `# 마크다운 작성 예시

## 텍스트 스타일
**굵은 글씨**
*기울임체*
~~취소선~~

## 목록
- 순서 없는 목록
- 두 번째 항목
  - 들여쓰기된 항목

1. 순서 있는 목록
2. 두 번째 항목

## 인용문
> 인용문을 작성할 수 있습니다.

## 코드
\`\`\`javascript
console.log('코드 블록 예시');
\`\`\`

## 표
| 제목 | 설명 |
|------|------|
| 항목1 | 내용1 |
| 항목2 | 내용2 |

## 링크와 이미지
[링크 예시](https://example.com)
![이미지 예시](이미지 URL)

위와 같은 마크다운 문법을 사용하여 글을 작성할 수 있습니다.`;

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

const ArticleForm = ({
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
}: ArticleFormProps) => {
  const editorRef = React.useRef<Editor>(null);
  const { handleImageUpload } = useImageUpload();

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getInstance();
      const currentContent = editor.getMarkdown();
      if (currentContent !== (content || defaultContent)) {
        editor.setMarkdown(content || defaultContent);
      }
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
            className="block text-sm font-medium text-slate-700 mb-1"
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
            className={`w-full px-3 py-2 border border-slate-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-700 ${
              isTitleReadOnly ? "bg-slate-100" : ""
            }`}
            required
          />
        </div>
        <div className="w-full sm:w-1/4">
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            작성자
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-700 border-opacity-50 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-700"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          내용
        </label>
        <div className="border border-slate-700 border-opacity-50 rounded-md">
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
            autofocus={false}
            hideModeSwitch={false}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:gap-1.5">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
        >
          취소하기
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-100 bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
