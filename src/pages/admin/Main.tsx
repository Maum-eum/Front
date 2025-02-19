import React, { useCallback, useEffect, useState } from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useNavigate } from "react-router-dom";
import ElderList from "../../components/admin/ElderList";
import MatchingList from "../../components/admin/MatchingList"; // 나중에 추가할 리스트
import { elderInfo } from "../../types/admin/elderType";
import { getElderList } from "../../api/admin/elder";
import { getMatchingList } from "../../api/admin/service";
import { MatchInfo } from "../../types/admin/elderType";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, ChartOptions  } from "chart.js";
Chart.register(ArcElement,Tooltip, Legend);

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { centerName, name, centerId, logout } = useAdminStore();
  const [ elderList, setElderList ] = useState<elderInfo[]>([]);
  const [ matchList, setMatchList ] = useState<MatchInfo[]>([]);


  const data = {
    labels: [
      '수락',
      '조율',
      '거절',
      '대기',
    ],
    datasets: [{
      data: [40, 300, 50, 100],
      backgroundColor: [
        "#90FF86",
        "#FFE695",
        "#FFBDBD",
        "#5C5C5C",
      ],
      hoverOffset: 4
    }]
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const labels = [ "수락", "조율", "거절", "대기",]; 
            const value = context.raw;
            return `${labels[context.dataIndex]}: ${value}`;
          },
        },
      },
    },
  };
  

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

  const getCenterMatchingList = useCallback(async () => {
    if (centerId === 0) return;
    await getMatchingList(
      centerId,
      (res) => {
        setMatchList(res.data.data)
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
    getCenterMatchingList();
  }, [getElderInfoList]);

  return (
    <div className="hidden md:flex flex-col w-full h-screen p-4 bg-gray-100 overflow-hidden">
      {/* ✅ 헤더 (고정 높이: 80px) */}
      <div className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4 h-20">
        <div className="text-2xl font-bold">
          <h1>{centerName}</h1>
          <p className="text-xl text-gray-600">
            <span className="text-green">{name}</span> 관리자
          </p>
        </div>
        <div className="flex gap-2 font-gtr-B text-xl">
          <button
            className="border px-3 py-1 rounded-lg bg-pale-yellow hover:bg-yellow transition"
            onClick={() => navigate("/admin/modify")}
          >
            관리자 정보수정
          </button>
          <button
            className="border px-4 py-2 rounded-lg bg-pale-red hover:bg-red transition"
            onClick={handleLogOut}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* ✅ 전체 컨텐츠 (헤더 제외한 나머지 공간 차지) */}
      <div className="grid grid-cols-2 gap-4 w-full flex-1 overflow-hidden">

        <div className="grid grid-rows-2 gap-4 h-[calc(100vh-130px)] overflow-hidden">

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">
              <h2 className="text-lg font-bold">영역 1</h2>
              <p className="text-gray-500">내용 추가 가능</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">
              <h2 className="text-content font-bold m-2">통계 데이터</h2>
              <div className="w-full h-full flex items-center justify-center">
                <Doughnut options={options} data={data} />
              </div>
            </div>
          </div>

          {/* ✅ 하단 - 차트 공간 (절반 높이) */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">

          </div>
        </div>

        {/* 🔹 오른쪽 - 리스트 두 개 (균등한 높이) */}
        <div className="grid grid-rows-2 gap-4 h-[calc(100vh-130px)] overflow-hidden">
          <div className="bg-white rounded-lg shadow p-2 flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-auto">
              <ElderList data={[...elderList]} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-2 flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-auto">
              <MatchingList data={[...matchList]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
