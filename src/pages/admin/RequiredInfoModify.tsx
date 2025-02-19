import { useEffect, useState } from "react";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useNavigate, useParams } from "react-router-dom";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CheckList2 from "../../components/commons/CheckList2";
import Input from "../../components/commons/Input";
import { RegionSelect2 } from "../../components/commons/RegionSelect2";
import { requiredModifyApi } from "../../api/admin/required";

const categories = [
  { title: "근무 종류 (단일 선택)", services: ["방문요양", "입주요양", "방문목욕", "주야간보호", "요양원", "병원", "병원동행"] },
  { title: "식사 보조 (복수 선택 가능)", services: ["스스로 식사 가능", "식사 차려드리기", "죽, 반찬 등 요리 필요", "경관식 보조"] },
  { title: "배변 보조 (복수 선택 가능)", services: ["스스로 배변 가능", "가끔 대소변 실수 시 도움", "기저귀 케어 필요", "유치도뇨/방광루/장루 관리"] },
  { title: "이동 보조 (복수 선택 가능)", services: ["스스로 거동 가능", "이동시 부축 도움", "휠체어 이동 보조", "거동 불가"] },
  { title: "일상 생활 (복수 선택 가능)", services: ["청소,빨래 보조", "목욕 보조", "병원 동행", "산책, 간단한 운동", "말벗 등 정서지원", "인지자극 활동"] },
];

const RequiredInfoModify = () => {
  const navigate = useNavigate();
  const store = useAdminStore();
  const { elderId } = useParams();
  const numericElderId = Number(elderId);
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Record<string, "불필요" | "필요">>({});
  const [wage, setWage] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<number>(0);
  const [address, setAddress] = useState<string>('');


  const handleServiceChange = (updated: Record<string, "불필요" | "필요">) => {
    setSelectedServices((prev) => ({ ...prev, ...updated }));
  };

  const checkTitle = (title: string): boolean => {
    return (
      categories
        .find(category => category.title === title)
        ?.services.some(service => selectedServices[service] === "필요")
      ?? false
    );
  };

  useEffect(() => {
    console.log(selectedServices);
    console.log(checkTitle(categories[1].title));
  },[selectedServices])

  const handleNext = async () => {
    if (step === 1) {
      setStep(2); // ✅ 다음 단계(근무 조건 입력)로 이동
    // } else {
    //   if (selectedServices && wage && selectedLocations && address) {
    //     try {
    //       const response = await requiredModifyApi(
    //         store.centerId,
	// 		      numericElderId,
    //         {
    //           caretypes : categories[0].services.filter(service => selectedServices[service] === "필요"),
    //           careLocation : selectedLocations,
    //           mealAssistance : checkTitle(categories[1].title),
    //           toiletAssistance : checkTitle(categories[2].title),
    //           moveAssistance : checkTitle(categories[3].title),
    //           dailyLivingAssistance : checkTitle(categories[4].title),
    //           flexibleSchedule: true,  // 딱히 설정할 의미를 모르겠어서 일단 true으로 설정
    //           desiredHourlyWage : Number(wage),
    //           selfFeeding: Object.keys(selectedServices).includes(categories[1].services[0]) && selectedServices[categories[1].services[0]] === "필요",
    //           mealPreparation: Object.keys(selectedServices).includes(categories[1].services[1]) && selectedServices[categories[1].services[1]] === "필요",
    //           cookingAssistance: Object.keys(selectedServices).includes(categories[1].services[2]) && selectedServices[categories[1].services[2]] === "필요",
    //           enteralNutritionSupport: Object.keys(selectedServices).includes(categories[1].services[3]) && selectedServices[categories[1].services[3]] === "필요",
    //           selfToileting: Object.keys(selectedServices).includes(categories[2].services[0]) && selectedServices[categories[2].services[0]] === "필요",
    //           occasionalToiletingAssist: Object.keys(selectedServices).includes(categories[2].services[1]) && selectedServices[categories[2].services[1]] === "필요",
    //           diaperCare: Object.keys(selectedServices).includes(categories[2].services[2]) && selectedServices[categories[2].services[2]] === "필요",
    //           catheterOrStomaCare: Object.keys(selectedServices).includes(categories[2].services[3]) && selectedServices[categories[2].services[3]] === "필요",
    //           independentMobility: Object.keys(selectedServices).includes(categories[3].services[0]) && selectedServices[categories[3].services[0]] === "필요",
    //           mobilityAssist: Object.keys(selectedServices).includes(categories[3].services[1]) && selectedServices[categories[3].services[1]] === "필요",
    //           wheelchairAssist: Object.keys(selectedServices).includes(categories[3].services[2]) && selectedServices[categories[3].services[2]] === "필요",
    //           immobile: Object.keys(selectedServices).includes(categories[3].services[3]) && selectedServices[categories[3].services[3]] === "필요",
    //           cleaningLaundryAssist: Object.keys(selectedServices).includes(categories[4].services[0]) && selectedServices[categories[4].services[0]] === "필요",
    //           bathingAssist: Object.keys(selectedServices).includes(categories[4].services[1]) && selectedServices[categories[4].services[1]] === "필요",
    //           hospitalAccompaniment: Object.keys(selectedServices).includes(categories[4].services[2]) && selectedServices[categories[4].services[2]] === "필요",
    //           exerciseSupport: Object.keys(selectedServices).includes(categories[4].services[3]) && selectedServices[categories[4].services[3]] === "필요",
    //           emotionalSupport: Object.keys(selectedServices).includes(categories[4].services[4]) && selectedServices[categories[4].services[4]] === "필요",
    //           cognitiveStimulation: Object.keys(selectedServices).includes(categories[4].services[5]) && selectedServices[categories[4].services[5]] === "필요",
    //           detailRequiredService : address,
    //       });
    //       // 성공적으로 등록되면 다음 단계로 이동하거나 메시지 출력
    //       console.log("어르신 필요 정보 등록 완료!", response);
    //       navigate(`/admin/elder/detail/${elderId}`);
    //     } catch (error) {
    //       console.error("필요 서비스 정보 등록 중 오류 발생:", error);
    //     }
      } else {
        console.warn("모든 정보를 입력해 주세요.");
      }
    // }
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


          <div className="w-full max-w-xs sm:max-w-sm mt-6 space-y-6 px-4">
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

export default RequiredInfoModify;
