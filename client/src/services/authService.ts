import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/members/login`;

export const authService = {
  kakaoLogin: async (code: string) => {
    const response = await axios.get(`${API_URL}/kakao?code=${code}`, {
      withCredentials: true,
    });
    return response;
  },

  googleLogin: async (code: string) => {
    const response = await axios.get(`${API_URL}/google?code=${code}`, {
      withCredentials: true,
    });
    return response;
  },
};
