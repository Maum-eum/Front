import { useNavigate } from "react-router-dom";
import EmptyImg from "../../assets/image/empty.png";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import ImageBtn from "../../components/commons/ImageBtn";
import Alert from "../../components/commons/Alert";
import { useEffect, useState } from "react";
import ToggleBtn from "../../components/caregiver/ToggleBtn";
import RequestList from "../../components/caregiver/RequestList";
import { WorkRequest } from "../../types/caregiver/caregiverRequestType";
import { changeStatus } from "../../api/caregiver/caregiver";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { getRequests } from "../../api/caregiver/caregiverRequest";

const Main = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<WorkRequest[]>();
  const [attuneRequests, setAttuneRequests] = useState<WorkRequest[]>();

  /* 모달 */
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  /* 요양보호사 구직 상태 변경 */
  const handleChangeStatus = async () => {
    await changeStatus(
      (response) => {
        console.log("구직 상태 변경 성공:", response);
        return response;
      },
      (error) => {
        console.log("구직 상태 변경 실패:", error);
        return null;
      }
    );
  };

  const handleChangeEmploymentStatus = async () => {
    if (store.employmentStatus != null) {
      if ((await handleChangeStatus()) != null) {
        store.setEmploymentStatus(!store.employmentStatus);
        return true;
      }
      return false;
    } else {
      setAlertOpen(true);
      return false;
    }
  };

  /* 근무 요청 리스트 조회 */
  const handleGetRequests = async () => {
    await getRequests(
      (response) => {
        console.log("근무 요청 리스트 조회 성공:", response);
        return response;
      },
      (error) => {
        console.log("근무 요청 리스트 조회 실패:", error);
        return null;
      }
    );
  };

  /* 요양보호사 근무 요청 상세 보기 */
  const handleClickRequest = (recruitConditionId: number) => {
    navigate(`/caregiver/request/details/${recruitConditionId}`);
  };

  /* 요양보호사 조율 중인 요청 상세 보기 */
  const handleClickAttuneRequest = (recruitConditionId: number) => {
    navigate(`/caregiver/request/details/${recruitConditionId}`);
  };

  /* 새로고침 */
  const fetchRequests = async () => {
    const response = await handleGetRequests();
    if (response != null) {
      setRequests([
        /********* Dummy *********/
        {
          recruitConditionId: 1,
          elderId: 1,
          centerId: 1,
          centerName: "한마음",
          imgUrl: null,
          desiredHourlyWage: 40000,
          rate: "RATE1",
          age: 11,
          sexual: "FEMALE",
          careTypes: ["방문요양", "방문목욕", "입주요양"],
        },
      ]);
      
      setAttuneRequests([
        /********* Dummy *********/
        {
          recruitConditionId: 1,
          elderId: 1,
          centerId: 1,
          centerName: "한마음",
          imgUrl: null,
          desiredHourlyWage: 40000,
          rate: "RATE1",
          age: 11,
          sexual: "FEMALE",
          careTypes: ["방문요양", "방문목욕", "입주요양"],
        },
      ]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
        <div className="text-content w-full h-42 sm:h-56 flex flex-wrap gap-3 shadow bg-white rounded-lg mb-10 p-5">
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
            {/* 요양보호사 정보 변경 */}
            <BasicBtn label="정보 변경" color="white" onClick={() => navigate("/caregiver/edit/profile")} />
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
          requests={
            requests ?? [
              /********* Dummy *********/
              {
                recruitConditionId: 1,
                elderId: 1,
                centerId: 1,
                centerName: "한마음",
                imgUrl: null,
                desiredHourlyWage: 40000,
                rate: "RATE1",
                age: 11,
                sexual: "FEMALE",
                careTypes: ["방문요양", "방문목욕", "입주요양"],
              },
              {
                recruitConditionId: 1,
                elderId: 1,
                centerId: 1,
                centerName: "한마음",
                imgUrl: null,
                desiredHourlyWage: 40000,
                rate: "RATE1",
                age: 11,
                sexual: "FEMALE",
                careTypes: ["방문요양", "방문목욕", "입주요양"],
              },
            ]
          }
          attuneRequests={
            attuneRequests ?? [
              /********* Dummy *********/
              {
                recruitConditionId: 1,
                elderId: 1,
                centerId: 1,
                centerName: "한마음",
                imgUrl: null,
                desiredHourlyWage: 40000,
                rate: "RATE1",
                age: 11,
                sexual: "FEMALE",
                careTypes: ["방문요양", "방문목욕", "입주요양"],
              },
            ]
          }
          onClickRequest={handleClickRequest}
          onClickAttuneRequest={handleClickAttuneRequest}
          onRefresh={fetchRequests}
        />
      </div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>매칭은 근무 조건 등록 후에 이용할 수 있습니다!</div>
      </Alert>
    </div>
  );
};

export default Main;
