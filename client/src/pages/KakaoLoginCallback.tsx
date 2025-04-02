import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const code = searchParams.get("code");
        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
        const response = await axios.get(
          `${backendUrl}/api/members/login/kakao?code=${code}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 로그인 성공 시 홈페이지로 이동
          navigate("/");
        }
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류 발생:", error);
        // 에러 발생 시 로그인 페이지로 이동
        navigate("/login");
      }
    };

    handleKakaoLogin();
  }, [navigate, searchParams]);

  return (
    <div className="h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          로그인 처리 중...
        </h2>
        <p className="mt-2 text-sm text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoLoginCallback;
