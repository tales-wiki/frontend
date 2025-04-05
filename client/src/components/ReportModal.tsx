import React, { useState } from "react";
import { reportArticle } from "../services/reportService";

interface ReportModalProps {
  articleId: string;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ articleId, onClose }) => {
  const [reportReason, setReportReason] = useState("");

  const handleReport = async () => {
    try {
      await reportArticle(articleId, reportReason);
      alert("신고가 접수되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">게시글 신고</h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="신고 사유를 입력해주세요. (최대 100자)"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleReport}
            className="w-full bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
          >
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
