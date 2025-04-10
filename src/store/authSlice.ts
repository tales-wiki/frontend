import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

// 스토리지에서 초기 상태를 불러옵니다
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return { isLoggedIn: false };
    }
    return JSON.parse(serializedState);
  } catch {
    return { isLoggedIn: false };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      // 로그인 상태를 스토리지에 저장
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      // 로그아웃 시 스토리지에서 상태 제거
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
