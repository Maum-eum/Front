import { useEffect, useState } from "react";
import Alert from "../../components/commons/Alert";
import { useNavigate, useParams } from "react-router-dom";
import type { Response, ResponseData } from "../../types/admin/recruitData";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { getJobConditionTmp, reponseToRecruit } from "../../api/caregiver/caregiverRequest";
import AttributeCard from "../../components/caregiver/AttributeCard";
import { elderInfo } from "../../types/admin/elderType";
import { useSignupStore } from "../../stores/caregiver/useSignupStore";
import { matchInfoApi } from "../../api/admin/match";
import { MatchInfoResponse, RecruitCond } from "../../types/admin/matchData";
// import { sendNotification } from "../../utils/fcm/notificationService";

const RequestDetails = () => {
  const navigate = useNavigate();

  const { status, recruitId, matchId } = useParams<{
    status: string;
    recruitId: string;
    matchId: string;
  }>();

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [flag, setFlag] = useState<string>("");

  /* 어르신 상세정보 공개 범위 변경 기준 (조율 유무) */
  const [matchData, setMatchData] = useState<MatchInfoResponse | null>(null);

  /* 요양보호사 정보 store */
  const caregiverStore = useSignupStore();

  /* 요양보호사 jobcondition 조회 */
  const handleGetJobConditionId = async () => {
    try {
      const response = await getJobConditionTmp();
      if (response) {
        console.log("요양보호사 구직 조건 조회 성공:", response);
        caregiverStore.setJobConditionId(response.jobConditionId);
      }
    } catch (error) {
      console.log("요양보호사 정보 조회 실패:", error);
      setAlertMessage("조회에 실패했어요. 새로고침을 눌러 보세요!");
      setAlertOpen(true);
    }
  };

  /* 매칭 거절 */
  const handleRefuseRequest = async () => {
    try {
      const response = await reponseToRecruit({ matchId: Number(matchId), status: "DECLINED" });
      if (response) {
        console.log("매칭 거절 성공:", response);
        setAlertMessage("매칭을 거절했어요...");
        setAlertOpen(true);
        setFlag("BACK");
        handleSaveFcmToken(`[${caregiverStore.username}] 요양보호사님이 근무 요청을 거절했어요...`);
      }
    } catch (error) {
      console.log("매칭 거절 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
      setFlag("RELOAD");
    }
  };

  /* 매칭 수락 */
  const handleAcceptRequest = async () => {
    try {
      const response = await reponseToRecruit({ matchId: Number(matchId), status: "ACCEPTED" });
      if (response) {
        console.log("매칭 조율 성공:", response);
        setAlertMessage("매칭 조율을 시작합니다. 이제 연락처가 제공돼요!");
        setAlertOpen(true);
        setFlag("BACK");
        handleSaveFcmToken(`[${caregiverStore.username}] 요양보호사님이 근무 요청을 수락했어요!`);
      }
    } catch (error) {
      console.log("매칭 조율 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
      setFlag("RELOAD");
    }
  };

  /* 매칭 끝내기 */
  const handleFinishMatch = async () => {
    try {
      const response = await reponseToRecruit({ matchId: Number(matchId), status: "WITHDRAWN" });
      if (response) {
        console.log("매칭 끝내기 성공:", response);
        setAlertMessage("매칭을 끝냈습니다...");
        setAlertOpen(true);
        handleSaveFcmToken(`[${caregiverStore.username}] 요양보호사님이 근무를 종료했어요...`);
        setFlag("BACK");
      }
    } catch (error) {
      console.log("매칭 끝내기 실패:", error);
      setAlertMessage("오류가 났어요. 다시 한번 눌러 보세요!");
      setAlertOpen(true);
      setFlag("RELOAD");
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
  const handleGetRequestsDetails = async (jobConditionId: number, recruitId: number) => {
    try {
      const response = await matchInfoApi(jobConditionId, recruitId);
      if (response) {
        console.log("근무 요청 상세 보기 성공:", response);
        setMatchData(response);
        console.log("[matchData]" + matchData);
      }
    } catch (error) {
      console.log("근무 요청 상세 보기 실패:", error);
      setFlag("RELOAD");
    }
  };

  /* 알림 팝업 처리 */
  const handleClosePopup = () => {
    setAlertOpen(false);
    if (flag == "BACK") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1);
      setFlag("");
    } else if (flag == "RELOAD") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(0);
      setFlag("");
    }
  };

  const inmateTypesMapping = [
    { value: "LIVING_ALONE", label: "독거" },
    { value: "LIVING_WITH_SPOUSE", label: "배우자와 동거" },
    { value: "AWAY_DURING_CARE", label: "돌봄 시간 중 자리 비움" },
    { value: "AT_HOME_DURING_CARE", label: "돌봄 시간 중 집에 있음" },
    { value: "LIVING_WITH_FAMILY", label: "다른 가족과 동거" },
  ];

  const statusMapping: { value: keyof elderInfo; label: string }[] = [
    { value: "normal", label: "정상" },
    { value: "hasShortTermMemoryLoss", label: "단기 기억 장애" },
    { value: "wandersOutside", label: "집 밖을 배회" },
    { value: "actsLikeChild", label: "아이처럼 행동" },
    { value: "hasDelusions", label: "의심 / 망상" },
    { value: "hasAggressiveBehavior", label: "공격적 행동" },
  ];

  const supportMapping: { value: keyof RecruitCond; label: string }[] = [
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

  /* 근무 유형 */
  const getWorkTypeLabel = (data: RecruitCond | undefined) => {
    if (data == undefined || data.caretypes == undefined) return ["-"];
    else return data?.caretypes;
  };

  /* 치매 증상 */
  const getStatusLabel = (data: elderInfo | undefined) => {
    if (data == undefined) return ["-"];
    else return statusMapping.filter((attr) => data[attr.value]).map((item) => item.label);
  };

  /* 필요 서비스 */
  const getSupportLabel = (data: RecruitCond | undefined) => {
    if (data == undefined) return ["-"];
    return supportMapping.filter((attr) => data[attr.value]).map((item) => item.label);
  };

  /* 동거인 여부 */
  const getInmateTypeLabel = (data: string[]) => {
    if (data == undefined) return ["-"];
    return data.map(
      (item1) => inmateTypesMapping.find((item2) => item2.value === item1)?.label || item1
    );
  };

  /* 날짜 */
  const parseToDate = (data: RecruitCond | undefined) => {
    if (data == undefined) return [];
    return data.recruitTimes.map(
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
    );
  };

  /* 나이 */
  const parseToAge = (data: string | undefined) => {
    if (data === undefined) return ["-"];

    let date = new Date();
    let birth = data.split("-").map(Number);

    return date.getFullYear() - birth[0];
  };

  useEffect(() => {
    handleGetJobConditionId();
    if (caregiverStore.jobConditionId != -1)
      handleGetRequestsDetails(caregiverStore.jobConditionId, Number(recruitId));
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
        <div className="text-content w-full h-auto sm:h-auto shadow bg-white rounded-lg mb-6 p-5">
          {/* 노인 프로필 */}
          <div className="flex flex-wrap gap-3">
            {matchData?.data.elderInfoDto.img ? (
              <img
                src={matchData?.data.elderInfoDto.img}
                className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-48 sm:h-48 border rounded-lg bg-empty-green"></div>
            )}
            <div className="flex-1 flex flex-col justify-between items-center">
              <span className="font-bold text-content sm:text-title">
                [{status == "WAITING" ? "비공개" : matchData?.data.elderInfoDto.name}] 어르신
              </span>
              {/* 연락처 정보 */}
              {status === "MATCHED" || status == "TUNING" ? (
                <BasicBtn
                  label={matchData?.data.adminContact ?? "-"}
                  color="white"
                  attribute="content"
                  onClick={() => {
                    handleCopyClipBoard(matchData?.data.adminContact ?? "-");
                  }}
                />
              ) : (
                <BasicBtn
                  label="[센터 연락처 비공개]"
                  color="white"
                  attribute="content"
                  onClick={() => {}}
                />
              )}
            </div>
          </div>
          <hr className="border my-10" />

          {/* 매칭 상세 정보 */}
          <div className="font-bold text-item my-3">기본 정보</div>
          <AttributeCard
            content={[
              `${parseToAge(matchData?.data.elderInfoDto.birth)}세`,
              `${matchData?.data.elderInfoDto.gender == 1 ? "남" : "여"}`,
              `${matchData?.data.elderInfoDto.rate == "NORATE" ? "등급 없음" : matchData?.data.elderInfoDto.rate.charAt(4)}급`,
            ]}
          />
          <div className="font-bold text-item my-3">근무 유형</div>
          <AttributeCard content={getWorkTypeLabel(matchData?.data.recruitCondRes)} />
          <div className="font-bold text-item my-3">근무 요일 및 시간</div>
          <AttributeCard content={parseToDate(matchData?.data.recruitCondRes)} />
          <div className="font-bold text-item my-3">필요 서비스</div>
          <AttributeCard content={getSupportLabel(matchData?.data.recruitCondRes)} />
          {/* <div className="font-bold text-item my-3">복리후생</div>
          <AttributeCard content={getBenefitLabel(matchData?.data.recruitCondRes)} /> */}
          <div className="font-bold text-item my-3">급여</div>
          <AttributeCard
            content={[`${matchData?.data.recruitCondRes.desiredHourlyWage.toLocaleString()} 원`]}
          />
          {(status === "MATCHED" || status == "TUNING") && (
            <div>
              <hr className="border my-10" />

              <div className="font-bold text-item my-3">근무지 주소</div>
              <AttributeCard content={[`${matchData?.data.recruitCondRes.address ?? "없음"}`]} />

              <div className="font-bold text-item my-3">체중</div>
              <AttributeCard content={[`${matchData?.data.elderInfoDto.weight} kg`]} />

              <div className="font-bold text-item my-3">치매 증상</div>
              <AttributeCard content={getStatusLabel(matchData?.data.elderInfoDto)} />

              <div className="font-bold text-item my-3">동거인 여부</div>
              <AttributeCard
                content={getInmateTypeLabel(matchData?.data.elderInfoDto.inmateTypes ?? [])}
              />

              <div className="font-bold text-item my-3">추가 필요사항</div>
              <div
                className="text-content border bg-white rounded-lg px-2 py-1 transition cursor-pointer hover:bg-base-white"
                style={{ wordWrap: "break-word", whiteSpace: "normal" }}
              >
                {!matchData?.data.recruitCondRes.detailRequiredService ||
                matchData?.data.recruitCondRes.detailRequiredService === ""
                  ? "없음"
                  : matchData?.data.recruitCondRes.detailRequiredService}
              </div>
              <hr className="border my-10" />
            </div>
          )}
        </div>
        {/* 조율/거절 버튼 */}
        {status === "WAITING" && (
          <div className="flex justify-betweens gap-2">
            <BasicBtn label="거절" color="red" attribute="button" onClick={handleRefuseRequest} />
            <BasicBtn label="조율" color="green" attribute="button" onClick={handleAcceptRequest} />
          </div>
        )}
        {(status == "TUNING" || status == "MATCHED") && (
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
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(-1);
              }}
            />
          </div>
        </div>
      )}
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={handleClosePopup}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};

export default RequestDetails;
