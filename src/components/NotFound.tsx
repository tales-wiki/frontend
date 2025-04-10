import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-8 text-center">
        요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수
        없습니다.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
