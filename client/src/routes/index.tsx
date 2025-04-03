import { Route, Routes } from "react-router-dom";
import ArticleCreate from "../pages/ArticleCreate";
import ArticleEdit from "../pages/ArticleEdit";
import ArticleHistory from "../pages/ArticleHistory";
import ArticleVersion from "../pages/ArticleVersion";
import ArticleView from "../pages/ArticleView";
import Characters from "../pages/Characters";
import GoogleLoginCallback from "../pages/GoogleLoginCallback";
import Guild from "../pages/Guild";
import Home from "../pages/Home";
import KakaoLoginCallback from "../pages/KakaoLoginCallback";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/guild" element={<Guild />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/kakao" element={<KakaoLoginCallback />} />
      <Route path="/login/google" element={<GoogleLoginCallback />} />
      <Route path="/wiki/create/:category" element={<ArticleCreate />} />
      <Route path="/wiki/:id" element={<ArticleView />} />
      <Route path="/wiki/:id/edit" element={<ArticleEdit />} />
      <Route path="/wiki/:id/history" element={<ArticleHistory />} />
      <Route path="/wiki/:id/version/:version" element={<ArticleVersion />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
