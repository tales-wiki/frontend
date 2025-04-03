import React from "react";
import { Link } from "react-router-dom";

const RecentEdits: React.FC = () => {
  return (
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
  );
};

export default RecentEdits;
