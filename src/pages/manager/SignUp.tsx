import React from "react";

const ManagerSignUp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden p-6 bg-blue-500 text-white text-center rounded-lg">
        모바일 화면입니다!
      </div>

      {/* 데스크탑 환경에서만 보이는 UI */}
      <div className="hidden md:block p-10 bg-green-500 text-white text-center rounded-lg">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default ManagerSignUp;
