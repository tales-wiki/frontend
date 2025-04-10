import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
import { login } from "../store/authSlice";

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const code = searchParams.get("code");
  const isKakao = location.pathname.includes("kakao");
  const isGoogle = location.pathname.includes("google");

  useEffect(() => {
    const handleLoginCallback = async () => {
      try {
        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        let endpoint = "";
        if (isKakao) {
          endpoint = "/members/login/kakao";
        } else if (isGoogle) {
          endpoint = "/members/login/google";
        } else {
          throw new Error("잘못된 로그인 경로입니다.");
        }

        // 서버에 인증 코드를 전송하여 토큰을 받아옵니다
        await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          params: { code },
          withCredentials: true,
        });

        dispatch(login());
        navigate("/");
      } catch (error) {
        console.error("로그인 처리 중 오류가 발생했습니다:", error);
        navigate("/login");
      }
    };

    handleLoginCallback();
  }, [code, navigate, isKakao, isGoogle, dispatch]);

  return (
    <PageLayout title="로그인 처리 중">
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    </PageLayout>
  );
};

export default LoginCallback;
