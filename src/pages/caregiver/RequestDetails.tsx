import { useEffect, useState } from "react";
import Alert from "../../components/commons/Alert";
import { useNavigate, useParams } from "react-router-dom";
import type { Response, ResponseData } from "../../types/admin/recruitData";
import BasicBtn from "../../components/caregiver/BasicBtn";
import {
  getElderDetails,
  getRequestDetails,
  reponseToRecruit,
} from "../../api/caregiver/caregiverRequest";
import AttributeCard from "../../components/caregiver/AttributeCard";
import { elderInfo } from "../../types/admin/elderType";
import { useSignupStore } from "../../stores/caregiver/useSignupStore";
// import { sendNotification } from "../../utils/fcm/notificationService";

const RequestDetails = () => {
  const navigate = useNavigate();

  const { status, recruitId, centerId, elderId } = useParams<{
    status: string;
    recruitId: string;
    centerId: string;
    elderId: string;
  }>();

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  {
    /* 어르신 상세정보 공개 범위 변경 기준 (조율 유무) */
  }
  const [requestData, setRequestData] = useState<Response | null>(null);
  const [elderData, setElderData] = useState<elderInfo | null>(null);

  /* 요양보호사 정보 store */
  const store = useSignupStore();

  /* 매칭 거절 */
  const handleRefuseRequest = async () => {
    try {
      const response = await reponseToRecruit({ matchId: 0, status: "DECLINED" });
      if (response) {
        console.log("매칭 거절 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 요청을 거절했어요...`);
        moveToBack();
      }
    } catch (error) {
      console.log("매칭 거절 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
    }
  };

  /* 매칭 조율 */
  const handleAttuneRequest = async () => {
    try {
      const response = await reponseToRecruit({ matchId: 0, status: "TUNING" });
      if (response) {
        console.log("매칭 조율 성공공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 조건 조율을 원해요!`);
      }
    } catch (error) {
      console.log("매칭 조율 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
    }
  };

  /* 매칭 수락 */
  const handleAcceptRequest = async () => {
    try {
      const response = await reponseToRecruit({ matchId: 0, status: "ACCEPTED" });
      if (response) {
        console.log("매칭 수락 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무 요청을 수락했어요!`);
        moveToBack();
      }
    } catch (error) {
      console.log("매칭 수락 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
    }
  };

  /* 매칭 끝내기 */
  const handleFinishMatch = async () => {
    try {
      const response = await reponseToRecruit({ matchId: 0, status: "WITHDRAWN" });
      if (response) {
        console.log("매칭 끝내기 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
        handleSaveFcmToken(`[${store.username}] 요양보호사님이 근무를 종료했어요...`);
        moveToBack();
      }
    } catch (error) {
      console.log("매칭 끝내기 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
    }
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
  const handleGetRequestsDetails = async (centerId: number, elderId: number, recruitId: number) => {
    try {
      const response = await getRequestDetails(centerId, elderId, recruitId);
      if (response) {
        console.log("근무 요청 상세 보기 성공:", response);
        setRequestData(response);
        // if (response.data != null) setRequest(response.data.data);
      }
    } catch (error) {
      console.log("근무 요청 상세 보기 실패:", error);
      // navigate(-1);
    }
  };

  /* 요양보호사 근무 요청 어르신 정보 보기 */
  const handleGetElderDetails = async (centerId: number, elderId: number) => {
    if (status === "MATCHED" || status == "TUNING")
      try {
        const response = await getElderDetails(centerId, elderId);
        if (response) {
          console.log("근무 요청 상세 보기 성공:", response);
          setElderData(response);
          // if (response.data != null) setRequest(response.data.data);
        }
      } catch (error) {
        console.log("근무 요청 상세 보기 실패:", error);
        // navigate(-1);
      }
  };

  /* 뒤로 가기 */
  const moveToBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(-1);
  };

  const inmateTypesMapping = [
    { value: "LIVING_ALONE", label: "독거" },
    { value: "LIVING_WITH_SPOUSE", label: "배우자와 동거" },
    { value: "AWAY_DURING_CARE", label: "돌봄 시간 중 자리 비움" },
    { value: "AT_HOME_DURING_CARE", label: "돌봄 시간 중 집에 있음" },
    { value: "LIVING_WITH_FAMILY", label: "다른 가족과 동거" },
  ];

  const attributes: { value: keyof elderInfo; label: string }[] = [
    { value: "normal", label: "정상" },
    { value: "hasShortTermMemoryLoss", label: "단기 기억 장애" },
    { value: "wandersOutside", label: "집 밖을 배회" },
    { value: "actsLikeChild", label: "아이처럼 행동" },
    { value: "hasDelusions", label: "의심 / 망상" },
    { value: "hasAggressiveBehavior", label: "공격적 행동" },
  ];

  const attributes2: { value: keyof ResponseData; label: string }[] = [
    { value: "mealAssistance", label: "식사보조" },
    { value: "toiletAssistance", label: "배변보조" },
    { value: "moveAssistance", label: "이동보조" },
    { value: "flexibleSchedule", label: "일정 유연성 가능" },
    { value: "bathingAssist", label: "목욕 지원" },
    { value: "hospitalAccompaniment", label: "병원 동행" },
    { value: "exerciseSupport", label: "운동 지원" },
    { value: "emotionalSupport", label: "정서적 지원" },
    { value: "cognitiveStimulation", label: "인지 자극" },
  ];

  const getDementiaLabel = (data: elderInfo) => {
    return attributes.filter((attr) => data[attr.value]).map((item) => item.label);
  };

  const getDementiaLabel2 = (data: ResponseData) => {
    return attributes2.filter((attr) => data[attr.value]).map((item) => item.label);
  };

  const getInmateTypeLabel = (data: string[]) => {
    return data.map(
      (item1) => inmateTypesMapping.find((item2) => item2.value === item1)?.label || item1
    );
  };

  useEffect(() => {
    handleGetRequestsDetails(Number(centerId), Number(elderId), Number(recruitId));
    handleGetElderDetails(Number(centerId), Number(elderId));
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8 font-gtr-B">
      <div className="w-72 sm:w-[600px] mb-10">
        {/* 제목 */}
        <div className="flex justify-betweens">
          <h1 className="w-full text-start text-[20px] sm:text-3xl font-bold mb-6">
            <span className="text-black">[</span>
            <span className="text-red">매칭</span>
            {status == "MATCHED" ? (
              <>
                <span className="text-black">] 요청</span>
              </>
            ) : (
              <>
                <span className="text-black">] 정보</span>
              </>
            )}
          </h1>
        </div>
        {/* 매칭 요청 정보 조회 */}
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-auto sm:h-auto shadow bg-white rounded-lg mb-6 p-5">
          <div className="flex flex-wrap gap-3">
            {elderData?.img ? (
              <img src={""} className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg object-cover" />
            ) : (
              <div className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg bg-empty-green"></div>
            )}
            <div className="flex-1 flex flex-col justify-between items-center">
              <span className="font-bold text-content sm:text-title">
                [{status == "NONE" ? "비공개" : elderData?.name}] 어르신 연락처
              </span>
              {/* 연락처 정보 */}
              {status === "MATCHED" || status == "TUNING" ? (
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

          {elderData && requestData && (
            <>
              <hr className="border my-10" />

              {/* 매칭 상세 정보 */}
              <div className="font-bold text-item my-3">기본 정보</div>
              <AttributeCard
                content={[
                  `${elderData?.birth.slice(0, 4)}세`,
                  `${elderData?.gender == 1 ? "남" : "여"}`,
                  `${elderData?.rate == "NORATE" ? "등급 없음" : elderData?.rate.charAt(4)}급`,
                ]}
              />
              <div className="font-bold text-item my-3">근무 유형</div>
              <AttributeCard
                content={requestData?.data.caretypes.map((c) => c.caretype) as string[]}
              />
              <div className="font-bold text-item my-3">근무 요일 및 시간</div>
              <AttributeCard
                content={
                  requestData?.data.recruitTimes.map(
                    (e) =>
                      `${new Map<string, string>([
                        ["SUN", "일"],
                        ["MON", "월"],
                        ["TUE", "화"],
                        ["WED", "수"],
                        ["THU", "목"],
                        ["FRI", "금"],
                        ["SAT", "토"],
                      ]).get(e.dayofweek)}, ${e.starttime}-${e.endtime}`
                  ) as string[]
                }
              />

              <div className="font-bold text-item my-3">필요 서비스</div>
              <AttributeCard content={getDementiaLabel2(requestData?.data)} />
              {/* <div className="font-bold text-item my-3">복리후생</div>
              <AttributeCard
                content={
                  requestData?.data.recruitTimes.map(
                    (e) =>
                      `${new Map<string, string>([
                        ["SUN", "일"],
                        ["MON", "월"],
                        ["TUE", "화"],
                        ["WED", "수"],
                        ["THU", "목"],
                        ["FRI", "금"],
                        ["SAT", "토"],
                      ]).get(e.dayofweek)}, ${e.starttime}-${e.endtime}`
                  ) as string[]
                }
              /> */}
              <div className="font-bold text-item my-3">급여</div>
              <AttributeCard content={[`${requestData?.data.desiredHourlyWage}원`]} />

              {(status === "MATCHED" || status == "TUNING") && elderData && (
                <>
                  <hr className="border my-10" />

                  <div className="font-bold text-item my-3">근무지 주소</div>
                  <AttributeCard content={["경산시 진량읍", "애옹아파트 11동 301호"]} />

                  <div className="font-title font-bold">체중</div>
                  <AttributeCard content={[`${elderData?.weight}kg`]} />

                  <div className="font-title font-bold">치매 증상</div>
                  <AttributeCard content={getDementiaLabel(elderData)} />

                  <div className="font-title font-bold">동거인 여부</div>
                  <AttributeCard content={getInmateTypeLabel(elderData.inmateTypes)} />

                  <div className="font-bold text-item my-3">추가 필요사항</div>
                  <AttributeCard content={[requestData?.data.detailRequiredService ?? "없음"]} />

                  <hr className="border my-10" />

                  {/* <div className="flex justify-between">
                <div className="font-bold text-item my-3">센터</div>
                <AttributeCard content={["나라 사랑 복지관"]} />
              </div> */}
                  {/* <div className="flex justify-between">
                <div className="font-bold text-item my-3">사회복지사</div>
                <AttributeCard content={["안지히"]} />
              </div> */}
                  {/* <div className="flex justify-between">
                <div className="font-bold text-item my-3">연락처</div>
                <AttributeCard content={["010-1234-1234"]} />
              </div> */}
                </>
              )}
            </>
          )}
        </div>
        {/* 수락/조율/거절 버튼 */}
        {status === "NONE" && (
          <div className="flex justify-betweens gap-2">
            <BasicBtn label="거절" color="red" attribute="button" onClick={handleRefuseRequest} />
            <BasicBtn label="조율" color="green" attribute="button" onClick={handleAttuneRequest} />
          </div>
        )}
        {status == "TUNING" && (
          <div className="flex justify-between gap-2">
            <BasicBtn label="거절" color="red" attribute="button" onClick={handleRefuseRequest} />
            <BasicBtn label="수락" color="green" attribute="button" onClick={handleAcceptRequest} />
          </div>
        )}
        {status == "MATCHED" && (
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
            <BasicBtn label="뒤로 가기" color="green" attribute="button" onClick={moveToBack} />
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
