import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

// localStorage에서 초기 상태 가져오기
const getInitialState = (): AuthState => {
  const savedAuth = localStorage.getItem("auth");
  return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isAuthenticated = true;
      // localStorage에 상태 저장
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      // localStorage에서 상태 제거
      localStorage.removeItem("auth");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
