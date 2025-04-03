import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";
import { setLogin } from "../store/slices/authSlice";

const GoogleLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      try {
        // 에러 파라미터 체크
        const error = searchParams.get("error");
        if (error) {
          navigate("/login");
          return;
        }

        const code = searchParams.get("code");
        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        const response = await authService.googleLogin(code);

        if (response.status === 200) {
          // Redux store에 로그인 상태 저장
          dispatch(setLogin());

          // 로그인 성공 시 홈페이지로 이동
          navigate("/");
        }
      } catch (error) {
        console.error("구글 로그인 처리 중 오류 발생:", error);
        // 에러 발생 시 로그인 페이지로 이동
        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, [navigate, searchParams, dispatch]);

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

export default GoogleLoginCallback;
