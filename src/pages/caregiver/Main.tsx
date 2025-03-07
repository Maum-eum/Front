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
    try {
      const response = await getCaregiverInfo();
      if (response) {
        console.log("요양보호사 정보 조회 성공:", response);
        setCaregiverInfo(response);
        store.setUserInfo(response.username, response.img);
      }
    } catch (error) {
      console.log("요양보호사 정보 조회 실패:", error);
      setAlertMessage("조회에 실패했어요. 새로고침을 눌러 보세요!");
      setAlertOpen(true);
    }
  };

  /* 요양보호사 구직 상태 변경 */
  const handleChangeStatus = async () => {
    if (caregiverInfo?.employmentStatus == null) {
      console.log("구직 상태 변경 실패: 근무 조건 미등록");
      setAlertMessage("매칭은 근무 조건 등록 후에 이용할 수 있습니다!");
      setAlertOpen(true);
    }
    try {
      const response = await changeStatus();
      if (response != null) {
        console.log("구직 상태 변경 성공:", response);
        setCaregiverInfo((prev) => {
          if (prev == null || prev.employmentStatus == null) return;
          return {
            ...prev,
            employmentStatus: response,
          };
        });
      }
    } catch (error) {
      console.log("구직 상태 변경 실패:", error);
      setAlertMessage("구직 상태 변경에 실패했어요. 새로고침 후 다시 시도해 보세요!");
      setAlertOpen(true);
    }
  };

  /* 근무 요청 리스트 조회 */
  const handleGetRequests = async () => {
    try {
      const response = await getRequests();
      if (response) {
        console.log("근무 요청 리스트 조회 성공:", response);
        if (response.list != null) {
          setRequests((response.list as WorkRequest[]).filter((e) => e.matchStatus === "NONE"));
          setTuneRequests(
            (response.list as WorkRequest[]).filter((e) => e.matchStatus === "TUNING")
          );
        }
      }
    } catch (error) {
      console.log("근무 요청 리스트 조회 실패:", error);
      setAlertMessage("구직 상태 변경에 실패했어요. 새로고침 후 다시 시도해 보세요!");
      setAlertOpen(true);
    }
  };

  /* 요양보호사 근무 요청 NONE/TUNING 상세 보기 */
  const handleClickRequest = (recruitConditionId: number, centerId: number, elderId: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/caregiver/match/${recruitConditionId}/${centerId}/${elderId}`);
  };

  const handleLogOut = async () => {
    store.logout();
    navigate("/");
  };

  useEffect(() => {
    handleGetRequests();
    handleGetCaregiverInfo();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8 font-gtr-B">
      <div className="w-72 sm:w-[600px]">
        {/* 제목 */}
        <div className="flex justify-betweens">
          <h1 className="w-full text-start text-[20px] sm:text-3xl font-bold mb-6">
            <span className="text-black">[</span>
            <span className="text-red">{caregiverInfo?.username}</span>
            <span className="text-black">] 요양보호사님</span>
          </h1>
          <div className="w-[120px]">
            <BasicBtn label="로그아웃" color="green" attribute="content" onClick={handleLogOut} />
          </div>
        </div>
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
            <BasicBtn label="정보 변경" color="white" attribute="button" onClick={() => navigate("/caregiver/edit/profile")} />

          </div>
        </div>
        {/* 메뉴 (화면 이동) */}
        <div className="w-full flex gap-3 mb-10">
          <ImageBtn
            label="근무 조건"
            icon={EmptyImg}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/caregiver/jobcondition");
            }}
            color="white"
          />
          <ImageBtn
            label="일정 목록"
            icon={EmptyImg}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/caregiver/match");
            }}
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
