import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticleEdit from "./pages/ArticleEdit";
import ArticleView from "./pages/ArticleView";
import Characters from "./pages/Characters";
import CreateArticle from "./pages/CreateArticle";
import GoogleLoginCallback from "./pages/GoogleLoginCallback";
import Guild from "./pages/Guild";
import Home from "./pages/Home";
import KakaoLoginCallback from "./pages/KakaoLoginCallback";
import Login from "./pages/Login";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="pt-16 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/guild" element={<Guild />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/kakao" element={<KakaoLoginCallback />} />
              <Route path="/login/google" element={<GoogleLoginCallback />} />
              <Route
                path="/wiki/create/:category"
                element={<CreateArticle />}
              />
              <Route path="/wiki/:id" element={<ArticleView />} />
              <Route path="/wiki/:id/edit" element={<ArticleEdit />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
