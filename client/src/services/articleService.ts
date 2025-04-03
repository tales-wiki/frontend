import axios from "axios";

export const getArticleHistory = async (articleId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${articleId}/versions`
  );
  return response.data;
};
