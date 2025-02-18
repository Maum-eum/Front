import React, { useCallback, useEffect, useState } from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useNavigate } from "react-router-dom";
import ElderList from "../../components/admin/ElderList";
// import MatchingList from "../../components/admin/MatchingList";
import { elderInfo } from "../../types/admin/elderType";
import { getElderList } from "../../api/admin/elder";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { centerName, name, centerId, logout } = useAdminStore();
  const [ elderList, setElderList ] = useState<elderInfo[]>([]);

  const handleGetElderList = useCallback(async () => {
    if(centerId === 0) return;
    await getElderList(
      centerId,
      (res) => {
        setElderList(res.data.data)
        console.log(res.data.data)
      },
      (err) => {
        console.log(err)
      }
    );
  }, [centerId]);

  const handleLogOut = async() => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    handleGetElderList();
  }, [handleGetElderList]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
          <div className="w-full flex flex-col gap-2 text-xl font-bold text-black mb-6 font-gtr-B">
            <h1 >{centerName}</h1>
            <div className="w-full flex gap-1">
              <p className="text-content flex-grow"><span className="text-green">{name}</span> 관리자</p>
              <button className="text-xs border px-1 rounded-lg bg-pale-yellow" onClick={() => navigate('/admin/modify')} >관리자 정보수정</button>
              <button className="text-xs border px-1 rounded-lg bg-pale-red" onClick={handleLogOut}>로그아웃</button>
            </div>
          </div>
          <ElderList data= {elderList}/>
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
