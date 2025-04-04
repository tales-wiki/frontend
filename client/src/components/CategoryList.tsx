import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  title: string;
  isHiding?: boolean;
}

interface CategoryListProps {
  title: string;
  items: Item[];
  loading: boolean;
}

const CategoryList = memo(({ title, items, loading }: CategoryListProps) => {
  // 한글 자음 추출 함수
  const getInitial = useCallback((char: string) => {
    const code = char.charCodeAt(0);
    const CHOSUNG = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    // 완성형 한글인 경우 (가 ~ 힣)
    if (code >= 0xac00 && code <= 0xd7a3) {
      const initialCode = Math.floor((code - 0xac00) / 28 / 21);
      return CHOSUNG[initialCode];
    }

    // 자음만 있는 경우 (ㄱ ~ ㅎ)
    if (code >= 0x3131 && code <= 0x314e) {
      return char;
    }

    // 영문자인 경우
    if (
      (code >= 0x0041 && code <= 0x005a) ||
      (code >= 0x0061 && code <= 0x007a)
    ) {
      return char.toUpperCase();
    }

    // 숫자인 경우
    if (code >= 0x0030 && code <= 0x0039) {
      return char;
    }

    return char;
  }, []);

  // 한글 자음으로 시작하는 글자들을 그룹화하는 함수
  const groupByInitial = useCallback(
    (items: Item[]) => {
      // 고정된 초성 그룹 생성
      const groups: { [key: string]: Item[] } = {
        ㄱ: [],
        ㄴ: [],
        ㄷ: [],
        ㄹ: [],
        ㅁ: [],
        ㅂ: [],
        ㅅ: [],
        ㅇ: [],
        ㅈ: [],
        ㅊ: [],
        ㅋ: [],
        ㅌ: [],
        ㅍ: [],
        ㅎ: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
      };

      items.forEach((item) => {
        const firstChar = item.title.charAt(0);
        const initial = getInitial(firstChar);
        if (groups[initial] !== undefined) {
          groups[initial].push(item);
        }
      });

      return groups;
    },
    [getInitial]
  );

  const groupedItems = useMemo(
    () => groupByInitial(items),
    [items, groupByInitial]
  );

  const createUrl = useMemo(() => {
    return title === "인물사전" ? "/wiki/create/person" : "/wiki/create/guild";
  }, [title]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-12">
        <div className="flex justify-between items-center mb-5 lg:mb-8">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {/* 한글 자음 그룹 */}
          {[...Array(14)].map((_, index) => (
            <div key={index}>
              <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <ul className="list-none pl-0 space-y-1">
                {[...Array(3)].map((_, itemIndex) => (
                  <li key={itemIndex}>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 구분선 */}
          <div className="col-span-2 lg:col-span-6 w-full h-4"></div>

          {/* 영문 알파벳 그룹 */}
          {[...Array(26)].map((_, index) => (
            <div key={`alpha-${index}`}>
              <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <ul className="list-none pl-0 space-y-1">
                {[...Array(2)].map((_, itemIndex) => (
                  <li key={itemIndex}>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 구분선 */}
          <div className="col-span-2 lg:col-span-6 w-full h-4"></div>

          {/* 숫자 그룹 */}
          {[...Array(10)].map((_, index) => (
            <div key={`num-${index}`}>
              <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <ul className="list-none pl-0 space-y-1">
                <li>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-400 p-5 lg:p-12">
      <div className="flex justify-between items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-slate-800">
          {title}
        </h2>
        <Link
          to={createUrl}
          className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-100 bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer whitespace-nowrap"
        >
          작성하기
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* 한글 자음 그룹 */}
        {Object.entries(groupedItems)
          .filter(([key]) => /[ㄱ-ㅎ]/.test(key))
          .map(([initial, items]) => (
            <div key={initial}>
              <h3 className="text-s lg:text-s mb-2 bg-slate-700 text-slate-100 py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-slate-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className={`hover:text-slate-900 transition-colors ${
                          item.isHiding
                            ? "pointer-events-none line-through"
                            : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">-</li>
                )}
              </ul>
            </div>
          ))}

        {/* 영문 알파벳 그룹 */}
        <div className="col-span-2 lg:col-span-6 w-full h-4"></div>
        {Object.entries(groupedItems)
          .filter(([key]) => /[A-Z]/.test(key))
          .map(([initial, items]) => (
            <div key={initial}>
              <h3 className="text-s lg:text-s mb-2 bg-slate-700 text-slate-100 py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-slate-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className={`hover:text-slate-900 transition-colors ${
                          item.isHiding
                            ? "pointer-events-none line-through"
                            : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">-</li>
                )}
              </ul>
            </div>
          ))}

        {/* 숫자 그룹 */}
        <div className="col-span-2 lg:col-span-6 w-full h-4"></div>
        {Object.entries(groupedItems)
          .filter(([key]) => /[0-9]/.test(key))
          .map(([initial, items]) => (
            <div key={initial}>
              <h3 className="text-s lg:text-s mb-2 bg-slate-700 text-slate-100 py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-slate-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className={`hover:text-slate-900 transition-colors ${
                          item.isHiding
                            ? "pointer-events-none line-through"
                            : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">-</li>
                )}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
});

export default CategoryList;
