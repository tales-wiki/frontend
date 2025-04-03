import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentEdits from "../components/RecentEdits";

interface Character {
  id: number;
  title: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_API_URL
          }/api/articles/categories/PERSON`
        );
        console.log("받아온 데이터:", response.data.responses);
        setCharacters(response.data.responses);
      } catch (error) {
        console.error("게시글 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // 한글 자음으로 시작하는 글자들을 그룹화하는 함수
  const groupByInitial = (items: Character[]) => {
    // 고정된 초성 그룹 생성
    const groups: { [key: string]: Character[] } = {
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

    console.log("그룹화된 결과:", groups);
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

  const groupedCharacters = groupByInitial(characters);

  if (loading) return <div className="text-center py-4">로딩 중...</div>;

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 인물 사전 시트 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
            <div className="flex justify-between items-center mb-5 lg:mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
                인물사전
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
              {Object.entries(groupedCharacters)
                .filter(([key]) => /[ㄱ-ㅎ]/.test(key))
                .map(([initial, items]) => (
                  <div key={initial}>
                    <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                      {initial}
                    </h3>
                    <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                      {items.length > 0 ? (
                        items.map((character) => (
                          <li key={character.id}>
                            <Link
                              to={`/wiki/${character.id}`}
                              className="hover:text-gray-900 transition-colors"
                            >
                              {character.title}
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
              {Object.entries(groupedCharacters)
                .filter(([key]) => /[A-Z]/.test(key))
                .map(([initial, items]) => (
                  <div key={initial}>
                    <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                      {initial}
                    </h3>
                    <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                      {items.length > 0 ? (
                        items.map((character) => (
                          <li key={character.id}>
                            <Link
                              to={`/wiki/${character.id}`}
                              className="hover:text-gray-900 transition-colors"
                            >
                              {character.title}
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
              {Object.entries(groupedCharacters)
                .filter(([key]) => /[0-9]/.test(key))
                .map(([initial, items]) => (
                  <div key={initial}>
                    <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                      {initial}
                    </h3>
                    <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                      {items.length > 0 ? (
                        items.map((character) => (
                          <li key={character.id}>
                            <Link
                              to={`/wiki/${character.id}`}
                              className="hover:text-gray-900 transition-colors"
                            >
                              {character.title}
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
        </div>

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default Characters;
