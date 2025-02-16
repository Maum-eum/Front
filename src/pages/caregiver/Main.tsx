import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CaregiverInfoModal from "../../components/CaregiverInfoModal"; // ✅ 모달 컴포넌트 추가
import ToggleBtn from "../../components/commons/ToggleBtn";
import EmptyImg from "../../assets/image/empty.png";
import { useCaregiverStore } from "../../store/caregiverStore";
import Alert from "../../components/commons/Alert";

const Main = () => {
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  /* 요양보호사 정보 변경 */
  const handleChangeCaregiverInfo = () => {
    // setCaregiverInfo(newCaregiverInfo);
    // API 연결
    setIsModalOpen(false); // ✅ 모달 닫기
  };

  /* 요양보호사 구직/비구직 상태 변경 */
  const handleChangeJobSearch = () => {
    if (store.employmentStatus != null) {
      store.setEmploymentStatus(!store.employmentStatus);
      // API 연결
      console.log("success");
      return true;
    } else {
      setAlertOpen(true);
      console.log("fail");
      return false;
    }
    // else 의 경우 근무 조건 미등록 상태이므로,
    // 구직 상태 변경 불가능 알림 추가할 것
  };

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white px-4 sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.name}</span>
          <span className="text-black">] 요양보호사님의 공간</span>
        </h1>
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-42 sm:h-56 flex flex-wrap shadow bg-white rounded-lg mb-6 p-5">
          {/* 프로필 이미지 (임시 박스) */}
          <div className="w-24 h-24 sm:w-48 sm:h-full border bg-green rounded-lg"></div>
          <div className="flex-1 flex flex-col justify-between items-center ml-5">
            {/* 구직 상태 토글 */}
            <ToggleBtn status={store.employmentStatus} onClick={handleChangeJobSearch} />
            {/* 요양보호사 정보 변경 (팝업) */}
            <button
              className="w-32 sm:w-80 h-12 border rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              정보 변경
            </button>
          </div>
        </div>
        {/* 메뉴 (화면 이동) */}
        <div className="w-full flex mb-6">
          <button
            onClick={() => navigate("/caregiver/conditions")}
            className="w-full h-36 flex flex-col items-center justify-center text-button border bg-white rounded-lg p-5 mr-3"
          >
            <img className="w-12 h-12 mb-2" src={EmptyImg} />
            <div className="text-button font-bold text-black">근무 조건</div>
          </button>
          <button
            onClick={() => navigate("/caregiver/schedules")}
            className="w-full h-36 flex flex-col items-center justify-center text-button border bg-green rounded-lg p-5"
          >
            <img className="w-12 h-12 mb-2" src={EmptyImg} />
            <div className="text-button font-bold text-white">일정 목록</div>
          </button>
        </div>
        {/* 근무 요청 알림 */}
        <label className="text-item font-bold mb-3">근무 요청이 있어요~</label>
        <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
          {store.requests ? (
            store.requests.map((request) => (
              <div className="flex flex-col h-auto shadow bg-white rounded-lg p-5">
                <div className="flex flex-wrap mb-5">
                  {/* 프로필 이미지 (임시 박스) */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg">
                    {request.img}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-content font-bold px-4">[{request.centerName}]센터</span>
                    <span className="text-content font-bold px-4">[{request.name}] 어르신</span>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {request.inmateTypes &&
                    request.inmateTypes.map((type) => (
                      <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                        {type}
                      </div>
                    ))}
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    장기요양등급{request.rate.charAt(0)}급
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.gender ? "남" : "여"}
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.birth.slice(0, 4)}년생
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.desiredHourlyWage}원
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>요청 리스트가 없습니다! 조금만 기다리시거나, 근무 조건을 수정해 보세요. </div>
          )}
        </div>
        {/* 조율 중인 요청 */}
        <label className="text-item font-bold mb-3">조율 중인 요청이에요</label>
        <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
          {store.attuneRequests ? (
            store.attuneRequests.map((request) => (
              <div className="flex flex-col h-auto shadow bg-white rounded-lg p-5">
                <div className="flex flex-wrap mb-5">
                  {/* 프로필 이미지 (임시 박스) */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg">
                    {request.img}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-content font-bold px-4">[{request.centerName}]센터</span>
                    <span className="text-content font-bold px-4">[{request.name}] 어르신</span>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {request.inmateTypes &&
                    request.inmateTypes.map((type) => (
                      <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                        {type}
                      </div>
                    ))}
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    장기요양등급{request.rate.charAt(0)}급
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.gender ? "남" : "여"}
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.birth.slice(0, 4)}년생
                  </div>
                  <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
                    {request.desiredHourlyWage}원
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>조율 중인 리스트가 없습니다! </div>
          )}
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
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>알림창 컴포넌트 테스트</div>
      </Alert>
      ;
    </div>
  );
};

export default Main;
