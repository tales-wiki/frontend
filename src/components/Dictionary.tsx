import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article, getArticlesByCategory } from "../services/articleService";
import PageLayout from "./layouts/PageLayout";

interface DictionaryProps {
  category: string;
  title: string;
}

const Dictionary = ({ category, title }: DictionaryProps) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const koreanAlphabet = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const englishAlphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  ); // a~z
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString()); // 0~9

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticlesByCategory(category);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [category]);

  // 각 글자별로 데이터 그룹화
  const getArticlesByLetter = (letter: string) => {
    // 한글 초성 검색을 위한 함수
    const getInitialConsonant = (str: string) => {
      const firstChar = str.charCodeAt(0);
      if (firstChar >= 0xac00 && firstChar <= 0xd7a3) {
        const initial = Math.floor((firstChar - 0xac00) / 28 / 21);
        const initialConsonants = [
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
        return initialConsonants[initial];
      }
      return str.charAt(0);
    };

    const filteredArticles = articles.filter((article) => {
      const firstChar = article.title.charAt(0);
      if (koreanAlphabet.includes(letter)) {
        // 한글 초성 검색
        return getInitialConsonant(firstChar) === letter;
      } else {
        // 영문/숫자 검색
        return firstChar.toLowerCase() === letter.toLowerCase();
      }
    });

    // 제목 기준으로 정렬
    return filteredArticles.sort((a, b) =>
      a.title.localeCompare(b.title, "ko-KR")
    );
  };

  return (
    <PageLayout
      title={title}
      showCreateButton
      onCreateClick={() =>
        navigate(`/${category === "runner" ? "runners" : "guilds"}/new`)
      }
    >
      {/* 한글 자모 치트시트 */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {koreanAlphabet.map((letter, index) => (
          <div key={index}>
            <div className="text-center font-semibold mb-1 bg-slate-700 text-white rounded px-2 py-1">
              {letter}
            </div>
            <div className="grid gap-0.5">
              {getArticlesByLetter(letter).map((article) => (
                <div
                  key={article.articleVersionId}
                  className="text-sm border border-slate-200 rounded px-2 py-0.5 cursor-pointer hover:bg-slate-50"
                  onClick={() =>
                    navigate(`/articles/${article.articleVersionId}`)
                  }
                >
                  {article.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 영문 알파벳 치트시트 */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {englishAlphabet.map((letter, index) => (
          <div key={index}>
            <div className="text-center font-semibold mb-1 bg-slate-700 text-white rounded px-2 py-1">
              {letter}
            </div>
            <div className="grid gap-0.5">
              {getArticlesByLetter(letter).map((article) => (
                <div
                  key={article.articleVersionId}
                  className="text-sm border border-slate-200 rounded px-2 py-0.5 cursor-pointer hover:bg-slate-50"
                  onClick={() =>
                    navigate(`/articles/${article.articleVersionId}`)
                  }
                >
                  {article.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 숫자 치트시트 */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {numbers.map((number, index) => (
          <div key={index}>
            <div className="text-center font-semibold mb-1 bg-slate-700 text-white rounded px-2 py-1">
              {number}
            </div>
            <div className="grid gap-0.5">
              {getArticlesByLetter(number).map((article) => (
                <div
                  key={article.articleVersionId}
                  className="text-sm border border-slate-200 rounded px-2 py-0.5 cursor-pointer hover:bg-slate-50"
                  onClick={() =>
                    navigate(`/articles/${article.articleVersionId}`)
                  }
                >
                  {article.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Dictionary;
