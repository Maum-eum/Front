import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import Alert from "../../components/commons/Alert";
import { MatchedStatus } from "../../types/caregiver/caregiverRequestType";
import { getMatches } from "../../api/caregiver/caregiverRequest";
import MatchList from "../../components/caregiver/MatchList";
import ScheduleList from "../../components/caregiver/ScheduleList";

const MatchSchedules = () => {
  const navigate = useNavigate();

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  const [matches, setMatches] = useState<MatchedStatus[]>();

  /* 모달 */
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  /* 요양보호사 일정 조회 */
  const handleGetMatches = async () => {
    await getMatches(
      (response) => {
        console.log("요양보호사 일정 조회 성공:", response);
        if (response.data.data != null) {
          setMatches(response.data.data.list);
        }
      },
      (error) => {
        console.log("요양보호사 일정 조회 실패:", error);
        setAlertMessage("조회에 실패했어요. 새로고침을 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 요양보호사 근무 일정 상세 보기 */
  const handleClickMatch = (recruitConditionId: number, centerId: number, elderId: number) => {
    navigate(`/caregiver/match/${recruitConditionId}/${centerId}/${elderId}`);
  };

  useEffect(() => {
    handleGetMatches();
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
      {/* 일정 리스트 조회 */}
      <ScheduleList matches={matches ?? []} />
      {/* 서비스 진행 중인 리스트 조회 */}
      <MatchList matches={matches ?? []} onClick={handleClickMatch} onRefresh={handleGetMatches} />
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};

export default MatchSchedules;
