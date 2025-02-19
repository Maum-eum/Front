import React, { useCallback, useEffect, useState } from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useNavigate } from "react-router-dom";
import ElderList from "../../components/admin/ElderList";
import MatchingList from "../../components/admin/MatchingList"; // 나중에 추가할 리스트
import { elderInfo } from "../../types/admin/elderType";
import { getElderList } from "../../api/admin/elder";
import { getCenterMatchingList } from "../../api/admin/center";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { centerName, name, centerId, logout } = useAdminStore();
  const [elderList, setElderList] = useState<elderInfo[]>([]);

  const getElderInfoList = useCallback(async () => {
    if (centerId === 0) return;
    await getElderList(
      centerId,
      (res) => {
        setElderList(res.data.data);
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [centerId]);

  const getMatchingList = useCallback(async () => {
    if (centerId === 0) return;
    await getCenterMatchingList(
      centerId,
      (res) => {
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [centerId]);

  const handleLogOut = async () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    getElderInfoList();
    getMatchingList();
  }, [getElderInfoList]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        <div className="h-dvh p-4 flex flex-col min-h-screen overflow-auto bg-base-white">
          <div className="w-full flex flex-col gap-2 text-xl font-bold text-black mb-4 font-gtr-B">
            <h1>{centerName}</h1>
            <div className="w-full flex gap-1">
              <p className="text-content flex-grow">
                <span className="text-green">{name}</span> 관리자
              </p>
              <button
                className="text-xs border px-1 rounded-lg bg-pale-yellow"
                onClick={() => navigate("/admin/modify")}
              >
                관리자 정보수정
              </button>
              <button
                className="text-xs border px-1 rounded-lg bg-pale-red"
                onClick={handleLogOut}
              >
                로그아웃
              </button>
            </div>
          </div>


          <div className="flex flex-col gap-2 h-full">
            <div className="flex-1 overflow-hidden">
              <ElderList data={[...elderList]} />
            </div>
            <div className="flex-1 overflow-hidden border-t pt-2">
              <MatchingList data={[...elderList]} />
            </div>
          </div>
        </div>
      </div>

      {/* 데스크탑 환경에서만 보이는 UI (추후 개발) */}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default Main;
