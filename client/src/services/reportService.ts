import axios from "axios";
import { ApiError } from "../types/api";

export const reportArticle = async (articleId: string, reason: string) => {
  try {
    await axios.post(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/reports/articles/${articleId}`,
      {
        reason,
      }
    );
    return { success: true };
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (apiError.response?.data?.code === "ALREADY_REPORT_IP") {
      throw new Error("이미 신고한 게시글입니다.");
    }
    throw new Error("신고 접수 중 오류가 발생했습니다.");
  }
};
