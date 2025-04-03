import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 w-10 h-10 bg-slate-500 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="맨 위로 스크롤"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
