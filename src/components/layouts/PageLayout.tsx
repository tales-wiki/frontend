import { ReactNode } from "react";
import RecentEdits from "../RecentEdits";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

const PageLayout = ({
  children,
  title,
  showCreateButton = false,
  onCreateClick,
}: PageLayoutProps) => {
  return (
    <main className="flex-grow">
      <div className="container mx-auto lg:px-2 py-8 max-w-full lg:max-w-[98%]">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* 왼쪽 섹션 */}
          <div className="w-full lg:flex-1 mb-4 lg:mb-0">
            <div className="bg-white p-4 lg:p-6 lg:rounded-lg border border-slate-200">
              {title && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                    {title}
                  </h2>
                  {showCreateButton && (
                    <button
                      onClick={onCreateClick}
                      className="px-3 py-1 text-sm text-white bg-slate-600 hover:bg-slate-700 rounded-md transition-colors duration-200 cursor-pointer"
                    >
                      문서작성
                    </button>
                  )}
                </div>
              )}
              {children}
            </div>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="w-full lg:w-64">
            <RecentEdits />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageLayout;
