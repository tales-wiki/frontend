import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_BACKEND_API_URL
}/api/articles/categories`;

export interface CategoryItem {
  id: number;
  title: string;
  isHiding: boolean;
}

export interface CategoryResponse {
  responses: CategoryItem[];
}

export const categoryService = {
  getArticlesByCategory: async (
    category: string
  ): Promise<CategoryResponse> => {
    const response = await axios.get(`${API_URL}/${category}`);
    return response.data;
  },
};
