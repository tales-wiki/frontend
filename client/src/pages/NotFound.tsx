import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-slate-100">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-slate-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          to="/"
          className="w-full sm:w-auto inline-block px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-slate-100 bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
