import axios from "axios";

export const getArticleHistory = async (articleId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/articles/${articleId}/versions`
  );
  return response.data;
};

export const getArticleVersion = async (articleId: string, version: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_BACKEND_API_URL
    }/api/articles/${articleId}/versions/${version}`
  );
  return response.data;
};
