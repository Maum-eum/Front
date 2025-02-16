import React from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
// import { useNavigate } from "react-router-dom";
import ElderList from "../../components/admin/ElderList";
import MatchingList from "../../components/admin/MatchingList";

const Main: React.FC = () => {
//   const navigate = useNavigate();
  const { centerName, name } = useAdminStore();
  const dummy = [{
    name       : "박노인",
    centerName : "행복 요양 센터",
    gender     : 1,
    birth      : "1940-04-02",
    rate       : "3등급",
    imgUrl     : "",
    weight     : 58,
    //빌드 오류 수정용으로 더미에 없는 속성 추가했습니다.
    inmateTypes: ["Type1", "Type2"],
  }]

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
          <h1 className="text-xl font-bold text-black mb-6 font-gtr-B">{centerName} - {name} 관리자</h1>
          <ElderList data= {dummy}/>
          <MatchingList data = {["김 요양 보호사"]} />
        </div>
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default Main;
