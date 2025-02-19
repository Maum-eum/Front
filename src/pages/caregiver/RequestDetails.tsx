import { useEffect, useState } from "react";
import { useCaregiverStore } from "../../stores/caregiver/caregiverStore";
import Alert from "../../components/commons/Alert";
import { useNavigate } from "react-router-dom";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { getRequestDetails, reponseToRecruit } from "../../api/caregiver/caregiverRequest";
import AttributeCard from "../../components/caregiver/AttributeCard";
import Btn from "../../components/commons/Btn";

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
        console.log("근무 요청 상세 보기 성공:", response);
        // if (response.data != null) setRequest(response.data.data);
      },
      (error) => {
        console.log("근무 요청 상세 보기 실패:", error);
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

  useEffect(() => {
    handleGetRequestsDetails();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8 ">
      <div className="w-72 sm:w-[600px] mb-10">
        {/* 제목 */}
        <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
          <span className="text-black">[</span>
          <span className="text-red">{"센터으에에이름이에요"}</span>
          <span className="text-black">]</span>
          <br className="sm:hidden"></br>
          <span className="text-black">센터의 근무 요청</span>
        </h1>
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
              <span className="font-bold">[비공개] 어르신</span>
              {/* 연락처 정보 */}
              {isStatus && (
                <BasicBtn
                  label="010-1234-1234"
                  color="white"
                  onClick={() => {
                    handleCopyClipBoard("010-1234-1234");
                  }}
                />
              )}
            </div>
          </div>

          <hr className="border my-10" />

          {/* 매칭 상세 정보 */}
          <div className="font-title font-bold">기본 정보</div>
          <AttributeCard content={["78세"]} />
          {isStatus && <AttributeCard content={["78세"]} />}
          <div className="font-title font-bold">근무 유형</div>
          <AttributeCard content={["방문 요양"]} />
          <div className="font-title font-bold">근무 요일 및 시간</div>
          <AttributeCard content={["월, 10:00 - 13:00"]} />
          <div className="font-title font-bold">필요 서비스</div>
          <AttributeCard content={["식사보조(조율)"]} />
          <div className="font-title font-bold">복리후생</div>
          <AttributeCard content={["4대보험"]} />
          <div className="font-title font-bold">급여</div>
          <AttributeCard content={["15,000원"]} />

          {isStatus && (
            <>
              <hr className="border my-10" />

              <div className="font-title font-bold">근무지 주소</div>
              <AttributeCard content={["경산시 진량읍", "애옹아파트 11동 301호"]} />
              <div className="font-title font-bold">동거인 여부</div>
              <AttributeCard content={["배우자와 동거"]} />
              <div className="font-title font-bold">추가 필요사항</div>
              <AttributeCard content={["고지혈증 있으심."]} />

              <hr className="border my-10" />

              <div className="flex justify-between">
                <div className="font-title font-bold">센터</div>
                <AttributeCard content={["나라 사랑 복지관"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-title font-bold">사회복지사</div>
                <AttributeCard content={["안지히"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-title font-bold">연락처</div>
                <AttributeCard content={["010-1234-1234"]} />
              </div>
              <div className="flex justify-between">
                <div className="font-title font-bold">이메일</div>
                <AttributeCard content={["wert@naver.com"]} />
              </div>
            </>
          )}
        </div>
        {/* 수락/조율/거절 버튼 */}
        {isStatus && (
          <div className="flex justify-betweens gap-2">
            <BasicBtn label="거절" color="red" onClick={handleRefuseRequest} />
            <BasicBtn label="조율" color="green" onClick={handleAttuneRequest} />
          </div>
        )}
        {isStatus && (
          <div className="flex justify-between gap-2">
            <BasicBtn label="거절" color="red" onClick={handleRefuseRequest} />
            <BasicBtn label="수락" color="green" onClick={handleAcceptRequest} />
          </div>
        )}
        {isStatus && (
          <div className="flex justify-between gap-2">
            <BasicBtn label="매칭 끝내기" color="green" onClick={handleFinishMatch} />
          </div>
        )}
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

export default RequestDetails;
