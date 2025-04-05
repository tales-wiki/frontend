import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`;

interface ArticleCreateData {
  title: string;
  nickname: string;
  content: string;
  category: string;
}

export interface ArticleUpdateData {
  nickname: string;
  content: string;
}

export interface Article {
  title: string;
  content: string;
  createdAt: string;
}

export interface RecentEdit {
  id: number;
  title: string;
  category: string;
  isHiding: boolean;
  createdAt: string;
}

export interface SearchResult {
  id: number;
  title: string;
  category: string;
}

export const articleService = {
  createArticle: async (data: ArticleCreateData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/articles`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  getArticle: async (id: string): Promise<Article> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateArticle: async (id: string, articleData: ArticleUpdateData) => {
    const response = await axios.put(`${API_URL}/${id}`, articleData, {
      withCredentials: true,
    });
    return response.data;
  },

  getRecentEdits: async () => {
    const response = await axios.get(`${API_URL}/recent-edits`);
    return response.data.responses;
  },

  searchArticles: async (keyword: string): Promise<SearchResult[]> => {
    const response = await axios.get(
      `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`
    );
    return response.data.responses;
  },

  getArticleHistory: async (articleId: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/articles/${articleId}/versions`
    );
    return response.data;
  },

  getArticleVersion: async (articleId: string, version: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/api/articles/${articleId}/versions/${version}`
    );
    return response.data;
  },
};
