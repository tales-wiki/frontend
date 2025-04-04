import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/members`;

export const authService = {
  kakaoLogin: async (code: string) => {
    const response = await axios.get(`${API_URL}/login/kakao?code=${code}`, {
      withCredentials: true,
    });
    return response;
  },

  googleLogin: async (code: string) => {
    const response = await axios.get(`${API_URL}/login/google?code=${code}`, {
      withCredentials: true,
    });
    return response;
  },

  logout: async () => {
    const response = await axios.delete(`${API_URL}/logout`, {
      withCredentials: true,
    });
    return response;
  },
};
