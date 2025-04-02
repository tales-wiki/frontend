import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import GoogleLoginCallback from "./pages/GoogleLoginCallback";
import Guild from "./pages/Guild";
import Home from "./pages/Home";
import KakaoLoginCallback from "./pages/KakaoLoginCallback";
import Login from "./pages/Login";

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
