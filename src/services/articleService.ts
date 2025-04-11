import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL;

export const searchArticles = async (title: string) => {
  try {
    const response = await axios.get(`${API_URL}/articles/search`, {
      params: {
        title,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getLatestArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles/latest-update`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getArticle = async (articleVersionId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles/versions/${articleVersionId}`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

interface ArticleData {
  title: string;
  nickname: string;
  category: string;
  content: string;
}

interface ArticleResponse {
  articleVersionId: number;
}

export const createArticle = async (
  data: ArticleData
): Promise<ArticleResponse> => {
  try {
    const response = await axios.post(`${API_URL}/articles`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getArticleVersions = async (articleId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles/${articleId}/versions`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateArticle = async (
  articleId: number,
  data: { nickname: string; content: string }
): Promise<ArticleResponse> => {
  try {
    const response = await axios.put(`${API_URL}/articles/${articleId}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const reportArticle = async (
  articleVersionId: number,
  reportReason: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/articles/versions/${articleVersionId}/report`,
      {
        reportReason,
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export interface Article {
  articleVersionId: number;
  title: string;
  content: string;
  category: string;
  nickname: string;
  createdAt: string;
}

export const getRecentEdits = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles/recent-edits`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const uploadImage = async (imageFile: Blob): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(`${API_URL}/images/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    throw handleApiError(error);
  }
};
