import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCaregiverStore } from "../../store/caregiverStore";
import Alert from "../../components/commons/Alert";

const MatchSchedules = () => {
  const navigate = useNavigate();

  const [isAlertOpen, setAlertOpen] = useState(false);

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.name}</span>
          <span className="text-black">] 요양보호사님의 일정</span>
        </h1>
      </div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>요청이 [] 되었습니다!</div>
      </Alert>
    </div>
  );
};

export default MatchSchedules;
