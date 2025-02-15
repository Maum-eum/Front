import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CaregiverInfoModal from "../../components/CaregiverInfoModal"; // ✅ 모달 컴포넌트 추가
import ToggleBtn from "../../components/commons/ToggleBtn";

type CaregiverProps = {
  id: string;
  name: string;
  image: string;
  status: boolean;
  requestedList: [{ id: string; name: string; title: string; times: string; works: string }];
};

const Main = () => {
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 요양보호사 정보
  const [caregiverInfo, setCaregiverInfo] = useState<CaregiverProps>({
    id: "care1",
    name: "정화빈",
    image: "",
    status: true,
    requestedList: [
      {
        id: "person1",
        name: "햄부기",
        title: "[메인 구합니다]",
        times: "월, 16:00 - 18:00",
        works: "이동보조",
      },
    ],
  });

  /* 요양보호사 정보 변경 */
  const handleChangeCaregiverInfo = () => {
    // setCaregiverInfo(newCaregiverInfo);
    setIsModalOpen(false); // ✅ 모달 닫기
  };

  /* 요양보호사 구직/비구직 상태 변경 */
  const handleChangeJobSearch = () => {
    setCaregiverInfo((prevCaregiverInfo) => ({
      ...prevCaregiverInfo,
      status: !prevCaregiverInfo.status,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title sm:text-3xl font-bold text-black mb-6">
        [{caregiverInfo.name}] 요양보호사님의 공간
      </h1>
      <div className="text-content shadow bg-white rounded-lg">
        <div className="flex">
          {/* 프로필 이미지 (임시 박스) */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg"></div>
          <div>
            {/* 구직 상태 토글 */}
            <ToggleBtn status={caregiverInfo.status} onClick={handleChangeJobSearch} />
            {/* 요양보호사 정보 변경 (팝업)*/}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-button border bg-white rounded-lg"
            >
              정보 변경
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* 메뉴 (화면 이동) */}
        <button
          onClick={() => navigate("/caregiver/conditions")}
          className="text-button border bg-white rounded-lg"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg"></div>
          <div>근무 조건 변경</div>
        </button>
        <button
          onClick={() => navigate("/caregiver/schedules")}
          className="text-button border bg-white rounded-lg"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg"></div>
          <div>일정 목록</div>
        </button>
      </div>
      <label className="text-item font-bold">구인 요청이 있어요~</label>
      <div className="text-content shadow bg-white rounded-lg">
        <div className="flex">
          {/* 프로필 이미지 (임시 박스) */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg mb-6"></div>
          <div className="flex flex-col">
            {/* 구인 요청한 어르신 성함 */}
            <div>{caregiverInfo.requestedList[0].name}</div>
          </div>
        </div>
        <div className="flex">
          <div className="border bg-white rounded-lg">{caregiverInfo.requestedList[0].times}</div>
          <div className="border bg-white rounded-lg">{caregiverInfo.requestedList[0].works}</div>
        </div>
      </div>

      {/* 모달 추가 */}
      {isModalOpen && (
        <CaregiverInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleChangeCaregiverInfo} // ✅ 모달에서 받은 데이터 추가
        />
      )}
    </div>
  );
};

export default Main;
