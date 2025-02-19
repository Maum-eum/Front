import { useEffect, useState } from "react";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import Alert from "../../components/commons/Alert";
import { useNavigate } from "react-router-dom";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { getRequestDetails, reponseToRecruit } from "../../api/caregiver/caregiverRequest";
import AttributeCard from "../../components/caregiver/AttributeCard";
// import { sendNotification } from "../../utils/fcm/notificationService";

const RequestDetails = () => {
  const navigate = useNavigate();

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  {
    /* 어르신 상세정보 공개 범위 변경 기준 (조율 유무) */
  }
  const [isStatus, setStatus] = useState<boolean>(true);
  const [request, setRequest] = useState<String>();

  /* 요양보호사 정보 store */
  const store = useCaregiverStore();

  /* 매칭 거절 */
  const handleRefuseRequest = async () => {
    await reponseToRecruit(
      { matchId: 0, status: "DECLINED" },
      (response) => {
        console.log("매칭 거절 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 요청을 거절했어요...`);
      },
      (error) => {
        console.log("매칭 거절 실패:", error);
        setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };
  /* 매칭 조율 */
  const handleAttuneRequest = async () => {
    await reponseToRecruit(
      { matchId: 0, status: "TUNING" },
      (response) => {
        console.log("매칭 조율 성공공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 조건 조율을 원해요!`);
      },
      (error) => {
        console.log("매칭 조율 실패:", error);
        setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 매칭 수락 */
  const handleAcceptRequest = async () => {
    await reponseToRecruit(
      { matchId: 0, status: "ACCEPTED" },
      (response) => {
        console.log("매칭 수락 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 요청을 수락했어요!`);
      },
      (error) => {
        console.log("매칭 수락 실패:", error);
        setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 매칭 끝내기 */
  const handleFinishMatch = async () => {
    await reponseToRecruit(
      { matchId: 0, status: "WITHDRAWN" },
      (response) => {
        console.log("매칭 끝내기 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무를 종료했어요...`);
      },
      (error) => {
        console.log("매칭 끝내기 실패:", error);
        setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
        setAlertOpen(true);
      }
    );
  };

  /* 연락처 복사 */
  const handleCopyClipBoard = (call: string) => {
    navigator.clipboard.writeText(call);
    setAlertOpen(true);
    setAlertMessage("연락처가 복사 되었어요!");
  };

  /* 알림 보내기 */
  const handleSaveFcmToken = async (content: string) => {};
  // const handleSaveFcmToken = async (content: string) => {
  //   /* 백엔드로 FCM 토큰 저장 */
  //   await sendNotification(
  //     store.userId,
  //     content,
  //     (response: any) => {
  //       console.log("알림 보내기 성공:", response);
  //       // if (response.data != null) setRequest(response.data.data);
  //     },
  //     (error: any) => {
  //       console.log("알림 보내기 실패:", error);
  //       // navigate(-1);
  //     }
  //   );
  // };

  /* 요양보호사 근무 요청 상세 보기 */
  const handleGetRequestsDetails = async () => {
    await getRequestDetails(
      (response) => {
        console.log("근무 요청 상세 보기 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
      },
      (error) => {
        console.log("근무 요청 상세 보기 실패:", error);
        // navigate(-1);
      }
    );
  };

  const handleLogOut = async () => {
    store.logout();
    navigate("/");
  };

  useEffect(() => {
    handleGetRequestsDetails();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8 font-gtr-B">
      <div className="w-72 sm:w-[600px] mb-10">
        {/* 제목 */}
        <div className="flex justify-betweens">
          <h1 className="w-full text-start text-[20px] sm:text-3xl font-bold mb-6">
            <span className="text-black">[</span>
            <span className="text-red">{"희망 요양 센터"}</span>
            <span className="text-black">] 요청</span>
          </h1>
          <div className="w-[120px]">
            <BasicBtn label="로그아웃" color="green" attribute="content" onClick={handleLogOut} />
          </div>
        </div>
        {/* 매칭 요청 정보 조회 */}
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-auto sm:h-auto shadow bg-white rounded-lg mb-6 p-5">
          <div className="flex flex-wrap gap-3">
            {[].length > 0 ? (
              <img src={""} className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg object-cover" />
            ) : (
              <div className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg bg-empty-green"></div>
            )}
            <div className="flex-1 flex flex-col justify-between items-center">
              <span className="font-bold text-content sm:text-title">[비공개] 어르신 연락처</span>
              {/* 연락처 정보 */}
              {isStatus ? (
                <BasicBtn
                  label="010-1234-1234"
                  color="white"
                  attribute="content"
                  onClick={() => {
                    handleCopyClipBoard("010-1234-1234");
                  }}
                />
              ) : (
                <BasicBtn label="[비공개]" color="white" attribute="content" onClick={() => {}} />
              )}
            </div>
          </div>

          <hr className="border my-10" />

          {/* 매칭 상세 정보 */}
          <div className="font-bold text-item my-3">기본 정보</div>
          <AttributeCard content={["78세"]} />
          {isStatus && <AttributeCard content={["78세"]} />}
          <div className="font-bold text-item my-3">근무 유형</div>
          <AttributeCard content={["방문 요양"]} />
          <div className="font-bold text-item my-3">근무 요일 및 시간</div>
          <AttributeCard content={["월, 10:00 - 13:00"]} />
          <div className="font-bold text-item my-3">필요 서비스</div>
          <AttributeCard content={["식사보조(조율)"]} />
          <div className="font-bold text-item my-3">복리후생</div>
          <AttributeCard content={["4대보험"]} />
          <div className="font-bold text-item my-3">급여</div>
          <AttributeCard content={["15,000원"]} />

          {isStatus && (
            <>
              <hr className="border my-10" />

              <div className="font-bold text-item my-3">근무지 주소</div>
              <AttributeCard content={["경산시 진량읍", "애옹아파트 11동 301호"]} />
              <div className="font-bold text-item my-3">동거인 여부</div>
              <AttributeCard content={["배우자와 동거"]} />
              <div className="font-bold text-item my-3">추가 필요사항</div>
              <AttributeCard content={["고지혈증 있으심."]} />

              <hr className="border my-10" />

              <div className="flex justify-between">
                <div className="font-bold text-item my-3">센터</div>
                <AttributeCard content={["나라 사랑 복지관"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-item my-3">사회복지사</div>
                <AttributeCard content={["안지히"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-item my-3">연락처</div>
                <AttributeCard content={["010-1234-1234"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-item my-3">이메일</div>
                <AttributeCard content={["wert@naver.com"]} />
              </div>
            </>
          )}
        </div>
        {/* 수락/조율/거절 버튼 */}
        {isStatus && (
          <div className="flex justify-betweens gap-2">
            <BasicBtn label="거절" color="red" attribute="button" onClick={handleRefuseRequest} />
            <BasicBtn label="조율" color="green" attribute="button" onClick={handleAttuneRequest} />
          </div>
        )}
        {isStatus && (
          <div className="flex justify-between gap-2">
            <BasicBtn label="거절" color="red" attribute="button" onClick={handleRefuseRequest} />
            <BasicBtn label="수락" color="green" attribute="button" onClick={handleAcceptRequest} />
          </div>
        )}
        {isStatus && (
          <div className="flex justify-between gap-2">
            <BasicBtn
              label="매칭 끝내기"
              color="green"
              attribute="button"
              onClick={handleFinishMatch}
            />
          </div>
        )}
      </div>
      {!isAlertOpen && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full h-20 bg-gradient-to-t from-base-white to-white/0 flex justify-center items-center">
          <div className="w-72 sm:w-[600px]">
            <BasicBtn
              label="뒤로 가기"
              color="green"
              attribute="button"
              onClick={() => navigate(-1)}
            />
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

export default RequestDetails;
