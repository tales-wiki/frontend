import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout";
import { getArticleVersions } from "../services/articleService";

interface ArticleVersion {
  articleVersionId: number;
  nickname: string;
  versionNumber: number;
  size: number;
  isHiding: boolean;
  createdAt: string;
}

interface ArticleVersionResponse {
  title: string;
  payload: ArticleVersion[];
}

const ArticleVersionHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [versions, setVersions] = useState<ArticleVersionResponse | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await getArticleVersions(id!);
        setVersions(response);
      } catch (error) {
        console.error("편집 로그를 불러오는데 실패했습니다:", error);
      }
    };

    fetchVersions();
  }, [id]);

  if (!versions) {
    return (
      <PageLayout title="로딩 중..." showCreateButton={false}>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="편집 로그" showCreateButton={false}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{versions.title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer border border-gray-200"
            >
              뒤로가기
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200" />

        <div className="overflow-x-auto">
          <div className="block md:hidden">
            {versions.payload.map((version) => (
              <div
                key={version.articleVersionId}
                className="mb-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer"
                onClick={() =>
                  navigate(`/articles/${version.articleVersionId}`)
                }
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      버전 {version.versionNumber}
                    </span>
                    <span className="text-sm text-gray-600">
                      {version.nickname}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {version.size.toLocaleString()} bytes
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(version.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
                >
                  버전
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40"
                >
                  생성일시
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                >
                  문서크기
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                >
                  편집자
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {versions.payload.map((version) => (
                <tr
                  key={version.articleVersionId}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`/articles/${version.articleVersionId}`)
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                    {version.versionNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {new Date(version.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {version.size.toLocaleString()} bytes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {version.nickname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default ArticleVersionHistory;
