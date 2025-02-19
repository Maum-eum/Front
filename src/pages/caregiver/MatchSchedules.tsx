import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import Alert from "../../components/commons/Alert";
import { MatchedStatus, WorkTimes } from "../../types/caregiver/caregiverRequestType";
import { getMatches } from "../../api/caregiver/caregiverRequest";
import MatchList from "../../components/caregiver/MatchList";
import ScheduleList from "../../components/caregiver/ScheduleList";
import BasicBtn from "../../components/caregiver/BasicBtn";

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

  /***** dummy *****/

  useEffect(() => {
    handleGetMatches();
    setMatches([
      {
        elderId: 0,
        elderName: "김성모",
        recruitConditionId: 0,
        centerId: 0,
        mealAssistance: true,
        toiletAssistance: true,
        moveAssistance: true,
        dailyLivingAssistance: true,
        selfFeeding: true,
        mealPreparation: false,
        cookingAssistance: false,
        enteralNutritionSupport: true,
        selfToileting: false,
        occasionalToiletingAssist: false,
        diaperCare: false,
        catheterOrStomaCare: false,
        independentMobility: false,
        mobilityAssist: false,
        wheelchairAssist: false,
        immobile: false,
        cleaningLaundryAssist: false,
        bathingAssist: false,
        hospitalAccompaniment: false,
        exerciseSupport: false,
        emotionalSupport: false,
        cognitiveStimulation: false,
        times: [
          { dayOfWeek: "MON", startTime: 1, endTime: 4 } as WorkTimes,
          { dayOfWeek: "SUN", startTime: 5, endTime: 6 } as WorkTimes,
          { dayOfWeek: "MON", startTime: 4, endTime: 8 } as WorkTimes,
          { dayOfWeek: "SAT", startTime: 0, endTime: 1 } as WorkTimes,
          { dayOfWeek: "FRI", startTime: 2, endTime: 3 } as WorkTimes,
          { dayOfWeek: "WED", startTime: 2, endTime: 3 } as WorkTimes,
          { dayOfWeek: "MON", startTime: 2, endTime: 3 } as WorkTimes,
          { dayOfWeek: "THU", startTime: 2, endTime: 3 } as WorkTimes,
          { dayOfWeek: "SAT", startTime: 13, endTime: 22 } as WorkTimes,
        ],
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px] mb-10">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{store.username}</span>
          <span className="text-black">] 요양보호사님의 일정</span>
        </h1>
        {/* 일정 리스트 조회 */}
        <ScheduleList matches={matches ?? []} />
        {/* 서비스 진행 중인 리스트 조회 */}
        <MatchList
          matches={matches ?? []}
          onClick={handleClickMatch}
          onRefresh={handleGetMatches}
        />
      </div>
      {!isAlertOpen && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full h-20 bg-gradient-to-t from-base-white to-white/0 flex justify-center items-center">
          <div className="w-72 sm:w-[600px]">
            <BasicBtn label="뒤로 가기" color="green" onClick={() => navigate(-1)} />
          </div>
        </div>
      )}
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};

export default MatchSchedules;
