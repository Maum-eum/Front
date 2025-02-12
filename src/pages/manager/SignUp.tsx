import React from "react";

import Steps from "../../components/commons/steps";
import Btn from "../../components/commons/Btn";

const ManagerSignUp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden">
        <div className="w-full h-dvh p-4">
          <Steps step={1}/>
          <Btn color="green" text="다음"/>
        </div>
      </div>

      {/* 데스크탑 환경에서만 보이는 UI */}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default ManagerSignUp;
