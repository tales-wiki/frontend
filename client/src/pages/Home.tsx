import RecentEdits from "../components/RecentEdits";

const Home = () => {
  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 안내문 내용 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-lg border border-slate-800 p-5 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-5 lg:mb-8 text-slate-800">
              안내문
            </h2>
            <div className="space-y-5 lg:space-y-6">
              <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed">
                테일즈위키에 오신 것을 환영합니다.
              </p>
              <div className="space-y-4">
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  • 누구나 자유롭게 위키를 작성하고 수정할 수 있습니다.
                </p>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  • 익명성을 보장하여 안전하게 참여할 수 있습니다.
                </p>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  • 부적절한 내용은 무통보 삭제될 수 있습니다.
                </p>
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
