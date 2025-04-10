import googleLogo from "../assets/google-logo.svg";
import kakaoLogo from "../assets/kakao-logo.svg";
import PageLayout from "../components/layouts/PageLayout";

const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    }&response_type=code&scope=openid`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <PageLayout title="로그인">
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center w-full max-w-[300px] py-2.5 px-6 mb-3 bg-[#FEE500] text-black rounded-lg hover:opacity-90 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <img src={kakaoLogo} alt="카카오 로고" className="w-6 h-6 mr-3" />
          카카오 로그인
        </button>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full max-w-[300px] py-2.5 px-6 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <img src={googleLogo} alt="구글 로고" className="w-6 h-6 mr-3" />
          구글 로그인
        </button>
      </div>
    </PageLayout>
  );
};

export default Login;
