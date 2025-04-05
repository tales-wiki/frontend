import { memo } from "react";

const Loading = memo(() => {
  return (
    <div className="h-[calc(100vh-4rem-6rem)] flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-900">로딩 중...</h2>
        <p className="mt-2 text-sm text-slate-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
});

export default Loading;
