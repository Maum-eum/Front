import { useState } from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useNavigate, useParams } from "react-router-dom";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CheckList2 from "../../components/commons/CheckList2";
import Input from "../../components/commons/Input";
import { RegionSelect2 } from "../../components/commons/RegionSelect2";
import { requiredRegisterApi } from "../../api/admin/required";

const categories = [
  { title: "식사 보조", services: ["스스로 식사 가능", "식사 차려드리기", "죽, 반찬 등 요리 필요", "경관식 보조"] },
  { title: "배변 보조", services: ["스스로 배변 가능", "가끔 대소변 실수 시 도움", "기저귀 케어 필요", "유치도뇨/방광루/장루 관리"] },
  { title: "이동 보조", services: ["스스로 거동 가능", "이동시 부축 도움", "휠체어 이동 보조", "거동 불가"] },
  { title: "일상 생활", services: ["청소,빨래 보조", "목욕 보조", "병원 동행", "산책, 간단한 운동", "말벗 등 정서지원", "인지자극 활동"] },
];

const RequiredInfoRegister = () => {
  const navigate = useNavigate();
  const store = useAdminStore();
  const { elderId } = useParams();
  const [step, setStep] = useState(1); // ✅ step 1: 서비스 선택, step 2: 근무 조건 입력
  const [selectedServices, setSelectedServices] = useState<Record<string, "불필요" | "필요">>({});
  const [wage, setWage] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<number>(0);
  const [address, setAddress] = useState<string>('');


  const handleServiceChange = (updated: Record<string, "불필요" | "필요">) => {
    setSelectedServices((prev) => ({ ...prev, ...updated }));
  };

  const handleNext = async () => {
    if (step === 1) {
      setStep(2); // ✅ 다음 단계(근무 조건 입력)로 이동
    } else {
      if (selectedServices && wage && selectedLocations && address) {
        try {
			//////////////////////////////////////////////////
			//////////////////////////////////////////////////
			// 서비스 종류별로 여부 확인
			// 근무조건 추가로 받기
			//////////////////////////////////////////////////
			//////////////////////////////////////////////////
          const response = await requiredRegisterApi({
            centerId : store.centerId,
			elderId : Number(elderId),
            requiredData : {
				caretypes : ,
				locationId : selectedLocations,
				mealAssistance : boolean;
				toiletAssistance : boolean;
				moveAssistance : boolean;
				dailyLivingAssistance : boolean;

				desiredHourlyWage : wage,

				detailRequiredService : address,
			}
          });

          // 성공적으로 등록되면 다음 단계로 이동하거나 메시지 출력
          console.log("어르신 필요 정보 등록 완료!", response);
          navigate(`/admin/elder/detail/${elderId}`);
        } catch (error) {
          console.error("필요 서비스 정보 등록 중 오류 발생:", error);
        }
      } else {
        console.warn("모든 정보를 입력해 주세요.");
      }
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1); // ✅ 서비스 선택으로 돌아가기
    } else {
      navigate(-1); // ✅ 이전 페이지로 이동
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white py-8">
      <h1 className="text-title font-bold text-black mb-6">필요 서비스 정보 등록</h1>
      <Steps step={3} />

      {/* 🔥 Step 1: 서비스 선택 */}
      {step === 1 && (
        <>
          <p className="text-center text-[18px] font-bold text-black mt-6">
            어르신이 필요하신 서비스를
          </p>
          <p className="text-center text-[18px] font-bold text-black">
		  <span className="text-red">모두</span> 선택해 주세요
          </p>


          <div className="w-full max-w-xs sm:max-w-sm mt-6 space-y-6">
            {categories.map((category) => (
              <CheckList2
                key={category.title}
                name={category.title}
                options={category.services}
                selectedValues={selectedServices}
                onChange={handleServiceChange}
              />
            ))}
          </div>
        </>
      )}

      {/* 🔥 Step 2: 근무 조건 입력 */}
      {step === 2 && (
        <>
          <div className="w-full mt-8">
            {/* 근무 지역 */}
            <RegionSelect2
				selectedLocations={selectedLocations}
				setSelectedLocations={setSelectedLocations}
				address={address}
				setAddress={setAddress}
			/>

            {/* 급여 입력 */}
            <div className="w-full px-5">
              <h3 className="text-item font-bold text-black mb-2">급여(시급)</h3>
              <Input
                type="number"
                placeholder="희망시급을 입력해주세요"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 mt-auto px-5">
        <Btn text="이전" color="white" onClick={handlePrev} />
        <Btn text={step === 1 ? "다음" : "필요 정보 등록 완료"} color="green" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RequiredInfoRegister;
