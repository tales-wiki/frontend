import React from "react";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  title: string;
}

interface CategoryListProps {
  title: string;
  items: Item[];
  loading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  items,
  loading,
}) => {
  // 한글 자음으로 시작하는 글자들을 그룹화하는 함수
  const groupByInitial = (items: Item[]) => {
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
  };

  // 한글 자음 추출 함수
  const getInitial = (char: string) => {
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
  };

  const groupedItems = groupByInitial(items);

  if (loading) return <div className="text-center py-4">로딩 중...</div>;

  return (
    <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
      <div className="flex justify-between items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
          {title}
        </h2>
        <Link
          to="/wiki/create"
          className="bg-gray-700 text-white text-sm lg:text-base font-medium py-1.5 lg:py-2 px-3 lg:px-4 transition-colors"
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
              <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">-</li>
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
              <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">-</li>
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
              <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                {initial}
              </h3>
              <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/wiki/${item.id}`}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">-</li>
                )}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
