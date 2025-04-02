import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 안내문 내용 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-5 lg:mb-8 text-gray-800">
              안내문
            </h2>
            <div className="space-y-5 lg:space-y-6">
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                테일즈위키에 오신 것을 환영합니다.
              </p>
              <div className="space-y-4">
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  • 누구나 자유롭게 위키를 작성하고 수정할 수 있습니다.
                </p>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  • 익명성을 보장하여 안전하게 참여할 수 있습니다.
                </p>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  • 부적절한 내용은 무통보 삭제될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-6">
            <h2 className="text-xl lg:text-xl font-semibold mb-4">최근 편집</h2>
            <div className="space-y-4">
              <Link to="/wiki/제목1" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목1</p>
                  <p className="text-sm text-gray-500">방금 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목2" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목2</p>
                  <p className="text-sm text-gray-500">5분 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목3" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목3</p>
                  <p className="text-sm text-gray-500">15분 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목4" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목4</p>
                  <p className="text-sm text-gray-500">30분 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목5" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목5</p>
                  <p className="text-sm text-gray-500">1시간 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목6" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목6</p>
                  <p className="text-sm text-gray-500">2시간 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목7" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목7</p>
                  <p className="text-sm text-gray-500">3시간 전</p>
                </div>
              </Link>
              <Link to="/wiki/제목8" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목8</p>
                  <p className="text-sm text-gray-500">2025년 03월 13일</p>
                </div>
              </Link>
              <Link to="/wiki/제목9" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목9</p>
                  <p className="text-sm text-gray-500">2025년 03월 14일</p>
                </div>
              </Link>
              <Link to="/wiki/제목10" className="block">
                <div className="border-b pb-2">
                  <p className="text-base font-medium">제목10</p>
                  <p className="text-sm text-gray-500">2025년 03월 15일</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
