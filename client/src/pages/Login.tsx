const Login = () => {
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = "email";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  return (
    <div className="h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-full space-y-8 px-4 sm:px-6 lg:px-8 -mt-24">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            테일즈위키에 오신 것을 환영합니다
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-[#FEE500] focus:outline-none cursor-pointer"
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
            className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white focus:outline-none cursor-pointer"
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
