import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCaregiverStore } from "../../store/caregiverStore";
import Alert from "../../components/commons/Alert";

const MatchDetails = () => {
  const navigate = useNavigate();

  const [isAlertOpen, setAlertOpen] = useState(false);

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  /* 매칭 끝내기 */
  const handleFinishMatch = () => {};

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.name}</span>
          <span className="text-black">] 어르신의 근무 상세 정보</span>
        </h1>
        {/* 매칭 정보 조회 */}
        <div className="text-content w-full h-42 sm:h-56 flex flex-wrap gap-3 shadow bg-white rounded-lg mb-6 p-5">
          {/* 센터 및 어르신 프로필 */}
          <div className="">
            {store.img ? (
              <img
                src={store.img}
                className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg bg-empty-green"></div>
            )}
            <div className="flex-1 flex justify-center items-center">{store.name}</div>
          </div>
        </div>

        <button
          className="w-32 sm:w-80 h-12 border rounded-lg active:bg-point-pink"
          onClick={handleFinishMatch}
        >
          <div className="font-bold">매칭 끝내기</div>
        </button>
      </div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>요청이 [] 되었습니다!</div>
      </Alert>
    </div>
  );
};

export default MatchDetails;
