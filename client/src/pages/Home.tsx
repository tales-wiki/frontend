import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        테일즈위키에 오신 것을 환영합니다.
      </h1>
      <p className="text-gray-600">
        악의적인 내용은 무통보 삭제될 수 있습니다.
      </p>
    </div>
  );
};

export default Home;
