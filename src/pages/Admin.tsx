import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ArticleVersionReportsResponse,
  ArticleVersionsResponse,
  BlockedIpsResponse,
  MembersResponse,
} from "../types/admin";
import { handleApiError } from "../utils/errorHandler";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [members, setMembers] = useState<MembersResponse | null>(null);
  const [articleVersions, setArticleVersions] =
    useState<ArticleVersionsResponse | null>(null);
  const [articleVersionReports, setArticleVersionReports] =
    useState<ArticleVersionReportsResponse | null>(null);
  const [blockedIps, setBlockedIps] = useState<BlockedIpsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [selectedReport, setSelectedReport] = useState<{
    title: string;
    reportReason: string;
  } | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [newIp, setNewIp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        if (activeTab === "users") {
          const { data } = await axios.get<MembersResponse>(
            `${import.meta.env.VITE_API_URL}/admin/members`,
            {
              params: {
                page,
                size,
              },
              withCredentials: true,
            }
          );

          if (data.payload.length === 0) {
            setHasMore(false);
            return;
          }

          setMembers((prev) => ({
            payload:
              page === 0 || !prev
                ? data.payload
                : [...prev.payload, ...data.payload],
          }));
        } else if (activeTab === "articles") {
          const { data } = await axios.get<ArticleVersionsResponse>(
            `${import.meta.env.VITE_API_URL}/admin/articles/versions`,
            {
              params: {
                page,
                size,
              },
              withCredentials: true,
            }
          );

          if (data.payload.length === 0) {
            setHasMore(false);
            return;
          }

          setArticleVersions((prev) => ({
            payload:
              page === 0 || !prev
                ? data.payload
                : [...prev.payload, ...data.payload],
          }));
        } else if (activeTab === "reports") {
          const { data } = await axios.get<ArticleVersionReportsResponse>(
            `${import.meta.env.VITE_API_URL}/admin/articles/versions/reports`,
            {
              params: {
                page,
                size,
              },
              withCredentials: true,
            }
          );

          if (data.payload.length === 0) {
            setHasMore(false);
            return;
          }

          setArticleVersionReports((prev) => ({
            payload:
              page === 0 || !prev
                ? data.payload
                : [...prev.payload, ...data.payload],
          }));
        } else if (activeTab === "blocked-ips") {
          const { data } = await axios.get<BlockedIpsResponse>(
            `${import.meta.env.VITE_API_URL}/admin/ip-block`,
            {
              params: {
                page,
                size,
              },
              withCredentials: true,
            }
          );

          if (data.payload.length === 0) {
            setHasMore(false);
            return;
          }

          setBlockedIps((prev) => ({
            payload:
              page === 0 || !prev
                ? data.payload
                : [...prev.payload, ...data.payload],
          }));
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, page, size, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loading, hasMore]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      weekday: "short",
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(0);
    setMembers(null);
    setArticleVersions(null);
    setArticleVersionReports(null);
    setBlockedIps(null);
    setHasMore(true);
  };

  const toggleHideMode = async (
    articleVersionId: number,
    currentIsHiding: boolean
  ) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/articles/versions/${articleVersionId}/hide-mode`,
        {
          isHiding: !currentIsHiding,
        },
        {
          withCredentials: true,
        }
      );

      // 성공적으로 숨김 설정이 변경되면 로컬 상태 업데이트
      setArticleVersions((prev) => {
        if (!prev) return null;
        return {
          payload: prev.payload.map((version) =>
            version.articleVersionId === articleVersionId
              ? { ...version, isHiding: !currentIsHiding }
              : version
          ),
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const toggleNoEditingMode = async (
    articleId: number,
    currentIsNoEditing: boolean
  ) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/articles/${articleId}/edit-mode`,
        {
          isNoEditing: !currentIsNoEditing,
        },
        {
          withCredentials: true,
        }
      );

      setArticleVersions((prev) => {
        if (!prev) return null;
        return {
          payload: prev.payload.map((version) =>
            version.articleId === articleId
              ? { ...version, isNoEditing: !currentIsNoEditing }
              : version
          ),
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (selectedArticle && viewerContainerRef.current && !viewerRef.current) {
      viewerRef.current = new Viewer({
        el: viewerContainerRef.current,
        initialValue: selectedArticle.content,
      });
    }
  }, [selectedArticle]);

  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current = null;
      }
    };
  }, []);

  const handleAddBlockedIp = async () => {
    if (!newIp.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/ip-block`,
        { ip: newIp },
        { withCredentials: true }
      );
      setNewIp("");
      setPage(0);
      setBlockedIps(null);
      setHasMore(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleRemoveBlockedIp = async (ip: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/ip-block`, {
        data: { ip },
        withCredentials: true,
      });
      setPage(0);
      setBlockedIps(null);
      setHasMore(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteArticle = async (articleId: number) => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/articles/${articleId}`,
        {
          withCredentials: true,
        }
      );

      setArticleVersions((prev) => {
        if (!prev) return null;
        return {
          payload: prev.payload.filter(
            (version) => version.articleId !== articleId
          ),
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">관리자 페이지</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange("users")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "users"
              ? "bg-slate-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          사용자 관리
        </button>
        <button
          onClick={() => handleTabChange("articles")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "articles"
              ? "bg-slate-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          게시글 관리
        </button>
        <button
          onClick={() => handleTabChange("reports")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "reports"
              ? "bg-slate-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          신고 관리
        </button>
        <button
          onClick={() => handleTabChange("blocked-ips")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "blocked-ips"
              ? "bg-slate-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          IP 차단 목록
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">사용자 목록</h2>
            {members && (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="w-1/3 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이메일
                      </th>
                      <th className="w-32 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        소셜 로그인
                      </th>
                      <th className="w-1/3 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        가입일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.payload.map((member) => (
                      <tr key={member.memberId}>
                        <td className="w-20 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.memberId}
                        </td>
                        <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {member.email}
                        </td>
                        <td className="w-32 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {member.social}
                        </td>
                        <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatDate(member.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "articles" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">게시글 버전 목록</h2>
            {articleVersions && (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        제목
                      </th>
                      <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        카테고리
                      </th>
                      <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성자
                      </th>
                      <th className="w-20 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        크기
                      </th>
                      <th className="w-32 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성일
                      </th>
                      <th className="w-32 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articleVersions.payload.map((version) => (
                      <tr key={version.articleVersionId}>
                        <td className="w-20 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                          {version.articleVersionId}
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <button
                            onClick={() =>
                              setSelectedArticle({
                                title: version.title,
                                content: version.content,
                              })
                            }
                            className="cursor-pointer hover:underline"
                          >
                            {version.title}
                          </button>
                        </td>
                        <td className="w-40 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {version.category}
                        </td>
                        <td className="w-24 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {version.nickname}
                        </td>
                        <td className="w-20 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {version.size}
                        </td>
                        <td className="w-32 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {version.ip}
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatDate(version.createdAt)}
                        </td>
                        <td className="w-32 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() =>
                                toggleHideMode(
                                  version.articleVersionId,
                                  version.isHiding
                                )
                              }
                              className={`px-1.5 py-0.5 rounded text-xs cursor-pointer transition-colors ${
                                version.isHiding
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {version.isHiding ? "숨김 해제" : "숨김"}
                            </button>
                            <button
                              onClick={() =>
                                toggleNoEditingMode(
                                  version.articleId,
                                  version.isNoEditing
                                )
                              }
                              className={`px-1.5 py-0.5 rounded text-xs cursor-pointer transition-colors ${
                                version.isNoEditing
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {version.isNoEditing ? "편집 허용" : "편집 금지"}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteArticle(version.articleId)
                              }
                              className="px-1.5 py-0.5 rounded text-xs cursor-pointer transition-colors bg-red-100 text-red-700 hover:bg-red-200"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">신고 목록</h2>
            {articleVersionReports && (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        제목
                      </th>
                      <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        카테고리
                      </th>
                      <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성자
                      </th>
                      <th className="w-32 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        사유
                      </th>
                      <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        신고일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articleVersionReports.payload.map((report) => (
                      <tr key={report.articleVersionReportId}>
                        <td className="w-20 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                          {report.articleVersionReportId}
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <button
                            onClick={() =>
                              setSelectedArticle({
                                title: report.title,
                                content: report.content,
                              })
                            }
                            className="cursor-pointer hover:underline"
                          >
                            {report.title}
                          </button>
                        </td>
                        <td className="w-40 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {report.category}
                        </td>
                        <td className="w-24 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {report.nickname}
                        </td>
                        <td className="w-32 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {report.ip}
                        </td>
                        <td className="w-24 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <button
                            onClick={() =>
                              setSelectedReport({
                                title: report.title,
                                reportReason: report.reportReason,
                              })
                            }
                            className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                          >
                            보기
                          </button>
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatDate(report.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "blocked-ips" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">IP 차단 목록</h2>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="차단할 IP 주소 입력"
                className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-transparent placeholder-gray-400"
              />
              <button
                onClick={handleAddBlockedIp}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                차단 추가
              </button>
            </div>

            {blockedIps && (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="w-1/3 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="w-1/3 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        차단일
                      </th>
                      <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blockedIps.payload.map((blockedIp) => (
                      <tr key={blockedIp.blockedIpId}>
                        <td className="w-20 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                          {blockedIp.blockedIpId}
                        </td>
                        <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {blockedIp.ip}
                        </td>
                        <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatDate(blockedIp.createdAt)}
                        </td>
                        <td className="w-24 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <button
                            onClick={() => handleRemoveBlockedIp(blockedIp.ip)}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs cursor-pointer transition-colors hover:bg-red-200"
                          >
                            차단 해제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {selectedReport && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedReport.title}
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedReport.reportReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedArticle && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedArticle.title}
                </h3>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    if (viewerRef.current) {
                      viewerRef.current = null;
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div ref={viewerContainerRef} className="flex-1 overflow-auto" />
            </div>
          </div>
        )}

        <div ref={observerTarget} className="h-10">
          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
