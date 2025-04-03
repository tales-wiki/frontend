import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`;

export interface ArticleData {
  title: string;
  nickname: string;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface RecentEdit {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export const articleService = {
  getArticle: async (id: string): Promise<Article> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateArticle: async (id: string, articleData: ArticleData) => {
    const response = await axios.put(`${API_URL}/${id}`, articleData);
    return response.data;
  },

  getRecentEdits: async () => {
    const response = await axios.get(`${API_URL}/recent-edits`);
    return response.data.responses;
  },
};

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

interface ArticleCreateData {
  title: string;
  nickname: string;
  content: string;
  category: string;
}

export const createArticle = async (data: ArticleCreateData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`,
    data
  );
  return response;
};
