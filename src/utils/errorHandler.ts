import axios from "axios";
import { ErrorResponse } from "../types/error";

export const handleApiError = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ErrorResponse;

    if (response.code === "NOT_FOUND_COOKIE") {
      window.location.href = "/login";
      alert("로그인이 필요합니다.");
    } else if (response.code === "NOT_FOUND_ARTICLE_VERSION_ID") {
      alert("존재하지 않는 게시글 버전입니다.");
      window.location.href = "/";
    } else if (response.code === "INVALID_MEMBER_AUTHORITY") {
      alert("권한이 없습니다.");
      window.location.href = "/";
    } else {
      alert(response.message);
    }
    return response;
  }

  throw error;
};

export const isApiError = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
};
