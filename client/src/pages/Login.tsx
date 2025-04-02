import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      // TODO: 카카오 로그인 API 연동
      console.log("카카오 로그인 시도");
      // 성공 시 홈페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: 구글 로그인 API 연동
      console.log("구글 로그인 시도");
      // 성공 시 홈페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 px-4 sm:px-6 lg:px-8 -mt-24">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            테일즈위키에 오신 것을 환영합니다
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-[#FEE500] focus:outline-none cursor-pointer"
          >
            <img
              src="/images/kakao-logo.svg"
              alt="카카오 로고"
              className="w-5 h-5 mr-2"
            />
            카카오로 계속하기
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white focus:outline-none cursor-pointer"
          >
            <img
              src="/images/google-logo.svg"
              alt="구글 로고"
              className="w-5 h-5 mr-2"
            />
            구글로 계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
