import {
  FaBook,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaFlag,
  FaHistory,
  FaSearch,
  FaUserShield,
} from "react-icons/fa";
import RecentEdits from "../components/RecentEdits";

const Home = () => {
  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 안내문 내용 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-800 tracking-tight">
              안내문
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                테일즈위키에 오신 것을 환영합니다.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                테일즈위키는 공익성을 목적으로 문서를 작성하고 공유하는
                커뮤니티입니다.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <FaEdit className="text-xl sm:text-2xl text-blue-500 mt-1" />
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                    누구나 자유롭게 위키를 작성하고 수정할 수 있습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <FaUserShield className="text-xl sm:text-2xl text-green-500 mt-1" />
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                    익명성을 보장하여 안전하게 참여할 수 있습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <FaExclamationTriangle className="text-xl sm:text-2xl text-red-500 mt-1" />
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                    부적절한 내용은 무통보 삭제될 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800 tracking-tight">
                  위키 사용 방법
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <FaSearch className="text-xl sm:text-2xl text-purple-500 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800">
                        검색하기
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        상단 검색창에서 원하는 문서 제목을 검색해보세요.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <FaBook className="text-xl sm:text-2xl text-orange-500 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800">
                        사전 읽기
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        각 문서에서 인물, 길드에 관한 다양한 정보를 확인할 수
                        있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <FaHistory className="text-xl sm:text-2xl text-blue-500 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800">
                        편집하기
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        문서의 편집 버튼을 통해 내용을 추가하거나 수정할 수
                        있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <FaClock className="text-xl sm:text-2xl text-indigo-500 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800">
                        버전별 읽기
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        문서의 이전 버전을 확인할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <FaFlag className="text-xl sm:text-2xl text-red-500 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800">
                        신고하기
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        부적절한 내용이나 잘못된 정보가 있다면 신고해주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default Home;
