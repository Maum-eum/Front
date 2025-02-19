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
              <button className="text-xs border px-1 rounded-lg bg-pale-red" onClick={handleLogOut}>
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
      <div className="hidden md:block">데스크탑 화면입니다!</div>

      {/* ✅ 데스크탑 환경 (새롭게 추가) */}
      <div className="hidden md:flex flex-col w-full h-screen p-8 bg-gray-100">
        <div className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
          <div className="text-3xl font-bold">
            <h1>{centerName}</h1>
            <p className="text-2xl text-gray-600">
              <span className="text-green">{name}</span> 관리자
            </p>
          </div>
          <div className="flex gap-2 font-gtr-B text-2xl">
            <button
              className=" border px-3 py-1 rounded-lg bg-pale-yellow hover:bg-yellow transition"
              onClick={() => navigate("/admin/modify")}
            >
              관리자 정보수정
            </button>
            <button
              className=" border px-4 py-2 rounded-lg bg-pale-red hover:bg-red transition"
              onClick={handleLogOut}
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full h-full">
          {/* ✅ 왼쪽 - 차트 또는 기타 정보 영역 */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold mb-4">통계 데이터</h2>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">차트 또는 기타 데이터 추가 예정</p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6 h-full">
            <div className="bg-white rounded-lg shadow p-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <ElderList data={[...elderList]} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <MatchingList data={[...elderList]} />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Main;
