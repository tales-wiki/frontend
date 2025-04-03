import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import RecentEdits from "../components/RecentEdits";
import { CategoryItem, categoryService } from "../services/categoryService";

const Guild = () => {
  const [guilds, setGuilds] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const data = await categoryService.getArticlesByCategory("GUILD");
        setGuilds(data.responses);
      } catch (error) {
        console.error("게시글 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 길드 사전 시트 */}
        <div className="w-full lg:flex-[5]">
          <CategoryList title="길드사전" items={guilds} loading={loading} />
        </div>

        {/* 오른쪽 섹션: 최근 수정 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default Guild;
