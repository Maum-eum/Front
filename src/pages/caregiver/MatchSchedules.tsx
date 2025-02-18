import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import Alert from "../../components/commons/Alert";
import { MatchedListResponse } from "../../types/caregiver/caregiverRequestType";
import { getMatchedResquests } from "../../api/caregiver/caregiverRequest";

const MatchSchedules = () => {
  const navigate = useNavigate();

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  const [matchedRequests, setMatchedRequests] = useState<MatchedListResponse>();

  /* 모달 */
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  /* 요양보호사 일정 조회 */
  const handleGetMatchedRequests = async () => {
    await getMatchedResquests(
      (response) => {
        console.log("요양보호사 일정 조회 성공:", response);
        if (response.data.data != null) {
          setMatchedRequests(response.data.data);
        }
      },
      (error) => {
        console.log("요양보호사 일정 조회 실패:", error);
        setAlertMessage("조회에 실패했어요. 새로고침을 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  useEffect(() => {
    handleGetMatchedRequests();
    // setMatchedRequests();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.username}</span>
          <span className="text-black">] 요양보호사님의 일정</span>
        </h1>
      </div>
      <div>matchedRequests</div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};

export default MatchSchedules;
