import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Navigation = memo(
  ({
    isAuthenticated,
    onLogout,
    isMobile = false,
    onItemClick,
  }: NavigationProps) => {
    const location = useLocation();

    const isActive = (path: string) => {
      return location.pathname === path;
    };

    const handleItemClick = () => {
      onItemClick?.();
    };

    const navItems = [
      {
        path: "/characters",
        label: "인물사전",
      },
      {
        path: "/guild",
        label: "길드사전",
      },
    ];

    return (
      <nav
        className={isMobile ? "px-2 pt-2 pb-3 space-y-1" : "hidden md:block"}
      >
        <div className={isMobile ? "" : "flex items-center space-x-8"}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleItemClick}
              className={`${
                isMobile
                  ? `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? "text-slate-100 bg-slate-900"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                    }`
                  : `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      isActive(item.path)
                        ? "text-slate-100"
                        : "text-slate-300 hover:text-slate-100"
                    }`
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => {
                onLogout();
                handleItemClick();
              }}
              className={`${
                isMobile
                  ? "block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700 cursor-pointer"
                  : "px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors duration-200 cursor-pointer flex items-center"
              }`}
            >
              로그아웃
            </button>
          ) : (
            <Link
              to="/login"
              onClick={handleItemClick}
              className={`${
                isMobile
                  ? `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/login")
                        ? "text-slate-100 bg-slate-900"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                    }`
                  : `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      isActive("/login")
                        ? "text-slate-100"
                        : "text-slate-300 hover:text-slate-100"
                    }`
              }`}
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    );
  }
);

export default Navigation;
