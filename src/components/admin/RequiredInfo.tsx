import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";
import Alert from "../../components/commons/Alert";
import BasicBtn from "../../components/caregiver/BasicBtn";
import { RequiredData } from "../../types/admin/requiredData"
import { requiredInfoApi } from "../../api/admin/required";
import AttributeCard from "../../components/caregiver/AttributeCard";

export function RequiredInfo() {
  const navigate = useNavigate();
  const store = useAdminStore();
  const elderId = Number(useParams());
  const [requiredInfo, setRequiredInfo] = useState<RequiredData | null | undefined>(undefined);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isStatus, setStatus] = useState<boolean>(false);


  /* 연락처 복사 */
  const handleCopyClipBoard = (call: string) => {
    navigator.clipboard.writeText(call);
    setAlertOpen(true);
    setAlertMessage("연락처가 복사 되었어요!");
  };

  useEffect(() => {
	  /* 필요 상세정보 받아오는 api */
	  const handleGetRequiresInfo = async () => {
		try{
			const response = await requiredInfoApi(
				store.centerId,
				elderId,
				1,
			);
			setRequiredInfo(response?.data);
		} catch (error) {
			console.error('error get required info', error);
		}
	  };
    handleGetRequiresInfo();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6">
      <div className="w-72 sm:w-[600px]">
        {/* 매칭 요청 정보 조회 */}
        {/* 요양보호사 프로필 */}
        <div className="text-content w-full h-auto sm:h-auto shadow bg-white rounded-lg mb-6 p-5">
          <div className="flex flex-wrap gap-3">
			{/* 제목 */}
			<h1 className="w-full text-center text-[20px] sm:text-3xl font-bold">
          <span className="text-black font-gtr-B">필요 서비스 정보</span>
        	</h1>
          </div>
          <hr className="border my-4" />

          {/* 매칭 상세 정보 */}
          <div className="font-title font-bold font-gtr-B pl-1 pb-1">근무 유형</div>
          <AttributeCard content={["방문 요양"]} />
          <div className="font-title font-bold font-gtr-B pl-1">근무 요일 및 시간</div>
          <AttributeCard content={["월, 10:00 - 13:00"]} />
          <div className="font-title font-bold font-gtr-B pl-1">필요 서비스</div>
          <AttributeCard content={["식사보조(조율)"]} />
          <div className="font-title font-bold font-gtr-B pl-1">희망 급여</div>
          <AttributeCard content={["15,000원"]} />

          <hr className="border my-10" />

          <div className="font-title font-bold">근무지 주소</div>
          <AttributeCard content={["경산시 진량읍", "애옹아파트 11동 301호"]} />
          <div className="font-title font-bold">추가 필요사항</div>
          <AttributeCard content={["고지혈증 있으심."]} />

          {/* <hr className="border my-10" />

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
          </div> */}
        </div>
        {/* 수락/조율/거절 버튼 */}
        {/* {isStatus ? (
          <div className="flex justify-betweens">
            <BasicBtn label="거절" color="red" onClick={handleRefuseRequest} />
            <BasicBtn label="조율" color="green" onClick={handleAttuneRequest} />
          </div>
        ) : (
          <div className="flex justify-between">
            <BasicBtn label="거절" color="red" onClick={handleRefuseRequest} />
            <BasicBtn label="수락" color="green" onClick={handleAcceptRequest} />
          </div>
        )} */}
      </div>
      {/* 알림 추가 */}
      <Alert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)}>
        <div>{alertMessage}</div>
      </Alert>
    </div>
  );
};


