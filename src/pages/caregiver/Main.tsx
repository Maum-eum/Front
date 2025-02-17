import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CaregiverInfoModal from "../../components/caregiver/CaregiverInfoModal"; // ✅ 모달 컴포넌트 추가
import ToggleBtn from "../../components/caregiver/ToggleBtn";
import EmptyImg from "../../assets/image/empty.png";
import { useCaregiverStore } from "../../store/caregiverStore";
import Alert from "../../components/commons/Alert";
import CaregiverRequestCard from "../../components/caregiver/CaregiverRequestCard";
import ImageBtn from "../../components/commons/ImageBtn";
import ScrollListBox from "../../components/commons/ScrollListBox";

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
  const handleChangeEmploymentStatus = () => {
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

  /* 요양보호사 근무 요청 상세 보기 */
  const handleClickRequest = () => {};

  /* 요양보호사 조율 중인 요청 상세 보기 */
  const handleClickAttuneRequest = () => {};

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.name}</span>
          <span className="text-black">] 요양보호사님의 공간</span>
        </h1>
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-42 sm:h-56 flex flex-wrap gap-3 shadow bg-white rounded-lg mb-6 p-5">
          {store.img ? (
            <img
              src={store.img}
              className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg bg-empty-green"></div>
          )}
          <div className="flex-1 flex flex-col justify-between items-center">
            {/* 구직 상태 토글 */}
            <ToggleBtn status={store.employmentStatus} onClick={handleChangeEmploymentStatus} />
            {/* 요양보호사 정보 변경 (팝업) */}
            <button
              className="w-32 sm:w-80 h-12 border rounded-lg active:bg-point-pink"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="font-bold">정보 변경</div>
            </button>
          </div>
        </div>
        {/* 메뉴 (화면 이동) */}
        <div className="w-full flex gap-3 mb-6">
          <ImageBtn
            label="근무 조건"
            icon={EmptyImg}
            onClick={() => navigate("/caregiver/conditions")}
            color="white"
          />
          <ImageBtn
            label="일정 목록"
            icon={EmptyImg}
            onClick={() => navigate("/caregiver/schedules")}
            color="green"
          />
        </div>
        {/* 근무 요청 알림 */}
        {store.requests && store.requests.length > 0 && (
          <>
            <label className="text-item font-bold mb-3">근무 요청이 있어요</label>
            <ScrollListBox>
              <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
                {store.requests.map((request) => (
                  <CaregiverRequestCard request={request} onClick={handleClickRequest} />
                ))}
              </div>
            </ScrollListBox>
          </>
        )}
        {/* 조율 중인 요청 */}
        {store.attuneRequests && store.attuneRequests.length > 0 && (
          <>
            <label className="text-item font-bold mb-3">조율 중인 요청이에요</label>
            <ScrollListBox>
              <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
                {store.attuneRequests.map((attuneRequests) => (
                  <CaregiverRequestCard
                    request={attuneRequests}
                    onClick={handleClickAttuneRequest}
                  />
                ))}
              </div>
            </ScrollListBox>
          </>
        )}
        {/* 아무 요청도 없을 경우 */}
        {!(store.attuneRequests && store.attuneRequests.length > 0) &&
          !(store.requests && store.requests.length > 0) && (
            <div className="w-full h-full flex flex-col items-center justify-center p-10">
              <label className="text-item font-bold mb-6">이런...</label>
              <img className="w-20 h-20 mb-2" src={EmptyImg} />
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span>도착한 요청이 없네요.</span>
                <span>근무 조건으로 요청 확률을 올려 볼까요?</span>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Main;
