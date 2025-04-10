import PageLayout from "./layouts/PageLayout";

const Main = () => {
  return (
    <PageLayout>
      <div className="grid gap-6">
        <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500 transform transition-transform duration-200 hover:scale-[1.02]">
          <h3 className="text-lg lg:text-xl font-semibold mb-3 text-blue-700">
            환영합니다
          </h3>
          <p className="text-sm lg:text-base text-gray-600">
            테일즈위키는 익명성과 공익성을 우선시 하는 사이트입니다.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-lg p-5 border-l-4 border-emerald-500 transform transition-transform duration-200 hover:scale-[1.02]">
          <h3 className="text-lg lg:text-xl font-semibold mb-3 text-emerald-700">
            위키 사용 방법
          </h3>
          <ul className="text-sm lg:text-base text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                상단 메뉴를 통해 원하는 카테고리로 이동할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>검색 기능을 활용하여 필요한 정보를 빠르게 찾아보세요.</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>누구나 게시글 작성과 편집에 참여할 수 있습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>다른 사용자들의 기여를 존중하고 함께 발전시켜 나가요.</span>
            </li>
          </ul>
        </div>

        <div className="bg-rose-50 rounded-lg p-5 border-l-4 border-rose-500 transform transition-transform duration-200 hover:scale-[1.02]">
          <h3 className="text-lg lg:text-xl font-semibold mb-3 text-rose-700">
            주의사항
          </h3>
          <ul className="text-sm lg:text-base text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>검증되지 않은 정보는 출처와 함께 작성해 주세요.</span>
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>타인을 비방하거나 불쾌감을 주는 내용은 삼가해 주세요.</span>
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>저작권을 침해하는 자료는 업로드하지 말아주세요.</span>
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>편집 전 미리보기를 통해 내용을 확인해 주세요.</span>
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Main;
