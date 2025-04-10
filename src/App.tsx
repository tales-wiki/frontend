import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ArticleEditor from "./components/ArticleEditor";
import ArticleViewer from "./components/ArticleViewer";
import ArticleWriter from "./components/ArticleWriter";
import Footer from "./components/Footer";
import GuildDictionary from "./components/GuildDictionary";
import Header from "./components/Header";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import RunnerDictionary from "./components/RunnerDictionary";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./pages/Admin";
import ArticleVersionHistory from "./pages/ArticleVersionHistory";
import Login from "./pages/Login";
import LoginCallback from "./pages/LoginCallback";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/runners" element={<RunnerDictionary />} />
            <Route path="/guilds" element={<GuildDictionary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/kakao" element={<LoginCallback />} />
            <Route path="/login/google" element={<LoginCallback />} />
            <Route
              path="/runners/new"
              element={<ArticleWriter category="runner" />}
            />
            <Route
              path="/guilds/new"
              element={<ArticleWriter category="guild" />}
            />
            <Route path="/articles/:id" element={<ArticleViewer />} />
            <Route path="/articles/:id/edit" element={<ArticleEditor />} />
            <Route
              path="/articles/:id/versions"
              element={<ArticleVersionHistory />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
