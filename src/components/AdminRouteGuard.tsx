import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { handleApiError } from "../utils/errorHandler";

const AdminRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/members/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthorized(data.authority === "ADMIN");
      } catch (error) {
        handleApiError(error);
        setIsAuthorized(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">
            권한을 확인하는 중입니다...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
