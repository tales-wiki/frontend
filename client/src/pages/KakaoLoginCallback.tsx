import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";
import { setLogin } from "../store/slices/authSlice";

const KakaoLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const code = searchParams.get("code");
        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        const response = await authService.kakaoLogin(code);

        if (response.status === 200) {
          dispatch(setLogin());
          navigate("/");
        }
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류 발생:", error);
        navigate("/login");
      }
    };

    handleKakaoLogin();
  }, [navigate, searchParams, dispatch]);

  return (
    <div className="h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          로그인 처리 중...
        </h2>
        <p className="mt-2 text-sm text-slate-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoLoginCallback;
