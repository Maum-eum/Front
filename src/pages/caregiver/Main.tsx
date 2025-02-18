import { useNavigate } from "react-router-dom";
import EmptyImg from "../../assets/image/empty.png";
import ImageBtn from "../../components/commons/ImageBtn";
import Alert from "../../components/commons/Alert";
import { useEffect, useState } from "react";
import ToggleBtn from "../../components/caregiver/ToggleBtn";
import RequestList from "../../components/caregiver/RequestList";
import { WorkRequest } from "../../types/caregiver/caregiverRequestType";
import { changeStatus, getCaregiverInfo } from "../../api/caregiver/caregiver";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { getRequests } from "../../api/caregiver/caregiverRequest";
import { CaregiverInfoResponse } from "../../types/caregiver/caregiverType";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";

const Main = () => {
  const navigate = useNavigate();

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  const [caregiverInfo, setCaregiverInfo] = useState<CaregiverInfoResponse>();
  const [requests, setRequests] = useState<WorkRequest[]>();
  const [tuneRequests, setTuneRequests] = useState<WorkRequest[]>();

  /* 모달 */
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  /* 요양보호사 정보 조회 */
  const handleGetCaregiverInfo = async () => {
    await getCaregiverInfo(
      (response) => {
        console.log("요양보호사 정보 조회 성공:", response);
        if (response.data.data != null) {
          setCaregiverInfo(response.data.data);
          store.setCaregiverInfo(response.data.data.username, response.data.data.img);
        }
      },
      (error) => {
        console.log("요양보호사 정보 조회 실패:", error);
        setAlertMessage("조회에 실패했어요. 새로고침을 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 요양보호사 구직 상태 변경 */
  const handleChangeStatus = async () => {
    if (caregiverInfo?.employmentStatus == null) {
      console.log("구직 상태 변경 실패: 근무 조건 미등록");
      setAlertMessage("매칭은 근무 조건 등록 후에 이용할 수 있습니다!");
      setAlertOpen(true);
    }
    await changeStatus(
      (response) => {
        console.log("구직 상태 변경 성공:", response);
        setCaregiverInfo((prev) => {
          if (prev == null || prev.employmentStatus == null) return;
          return {
            ...prev,
            employmentStatus: response.data.data,
          };
        });
      },
      (error) => {
        console.log("구직 상태 변경 실패:", error);
        setAlertMessage("구직 상태 변경에 실패했어요. 새로고침 후 다시 시도해 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 근무 요청 리스트 조회 */
  const handleGetRequests = async () => {
    await getRequests(
      (response) => {
        console.log("근무 요청 리스트 조회 성공:", response.status);
        if (response.data.data != null) {
          setRequests(
            (response.data.data.list as WorkRequest[]).filter((e) => e.MatchStatus === "NONE")
          );
          setTuneRequests(
            (response.data.data.list as WorkRequest[]).filter((e) => e.MatchStatus === "TUNING")
          );
        }
      },
      (error) => {
        console.log("근무 요청 리스트 조회 실패:", error);
      }
    );
  };

  /* 요양보호사 근무 요청 NONE/TUNING 상세 보기 */
  const handleClickRequest = (recruitConditionId: number, centerId: number, elderId: number) => {
    navigate(`/caregiver/match/${recruitConditionId}/${centerId}/${elderId}`);
  };

  useEffect(() => {
    handleGetRequests();
    handleGetCaregiverInfo();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{caregiverInfo?.username}</span>
          <span className="text-black">] 요양보호사님의 공간</span>
        </h1>
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-42 sm:h-56 flex flex-wrap gap-3 shadow bg-white rounded-lg mb-10 p-5">
          {caregiverInfo?.img ? (
            <img
              src={caregiverInfo.img}
              className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg bg-empty-green"></div>
          )}
          <div className="flex-1 flex flex-col justify-between items-center">
            {/* 구직 상태 토글 */}
            <ToggleBtn
              status={caregiverInfo?.employmentStatus ? true : false}
              onClick={handleChangeStatus}
            />
            {/* 요양보호사 정보 변경 */}
            <BasicBtn label="정보 변경" color="white" onClick={() => {}} />
          </div>
        </div>
        {/* 메뉴 (화면 이동) */}
        <div className="w-full flex gap-3 mb-10">
          <ImageBtn
            label="근무 조건"
            icon={EmptyImg}
            onClick={() => navigate("/caregiver/conditions")}
            color="white"
          />
          <ImageBtn
            label="일정 목록"
            icon={EmptyImg}
            onClick={() => navigate("/caregiver/match")}
            color="green"
          />
        </div>
        {/* 요청 리스트 조회 */}
        <RequestList
          requests={requests ?? []}
          tuneRequests={tuneRequests ?? []}
          onClick={handleClickRequest}
          onRefresh={handleGetRequests}
        />
      </div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};

export default Main;
