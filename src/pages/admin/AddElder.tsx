import React, { useState } from "react";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import RadioInput from "../../components/admin/RadioInput";
import CheckList from "../../components/admin/CheckList";
import CheckBox from "../../components/admin/CheckBox";
import { addElder } from "../../api/admin/elder";
import { elderInfo, elderService, ServiceOption } from "../../types/admin/elderType";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";

const categories = [
  {
    title: "치매 증상",
    options: [
      { label: "정상", name: "isNormal", value: false },
      { label: "단기 기억 장애", name: "hasShortTermMemoryLoss", value: false },
      { label: "집 밖을 배회", name: "wandersOutside", value: false },
      { label: "어린아이 같은 행동", name: "actsLikeChild", value: false },
      { label: "사람을 의심하는 망상", name: "hasDelusions", value: false },
      { label: "때리거나 욕설 등 공격적인 행동", name: "hasAggressiveBehavior", value: false },
    ]
  },
  {
    title: "식사 보조",
    options: [
      { label: "스스로 식사 가능", name: "selfFeeding", value: false },
      { label: "식사 준비", name: "mealPreparation", value: false },
      { label: "식사 보조 (구토물 정리)", name: "mealAssistance", value: false },
      { label: "경관식 보조", name: "enteralNutritionSupport", value: false },
    ],
  },
  {
    title: "배변 보조",
    options: [
      { label: "자기 배변 가능", name: "selfToileting", value: false },
      { label: "화장실 이용 보조", name: "toiletAssistance", value: false },
      { label: "간헐적 배변 보조", name: "occasionalToiletingAssist", value: false },
      { label: "기저귀 케어", name: "diaperCare", value: false },
      { label: "카테터·장루 케어", name: "catheterOrStomaCare", value: false },
    ],
  },
  {
    title: "이동 지원",
    options: [
      { label: "자기 이동 가능", name: "independentMobility", value: false },
      { label: "이동 보조 (침대→휠체어 등)", name: "moveAssistance", value: false },
      { label: "이동 지원 (부축)", name: "mobilityAssist", value: false },
      { label: "휠체어 보조", name: "wheelchairAssist", value: false },
      { label: "거동 불가", name: "immobile", value: false },
    ],
  },
  {
    title: "일상 생활 지원",
    options: [
      { label: "일상생활 보조", name: "dailyLivingAssistance", value: false },
      { label: "요리 보조", name: "cookingAssistance", value: false },
      { label: "청소·세탁 지원", name: "cleaningLaundryAssist", value: false },
      { label: "목욕 보조", name: "bathingAssist", value: false },
      { label: "병원 동행", name: "hospitalAccompaniment", value: false },
    ],
  },
  {
    title: "건강 및 정서 지원",
    options: [
      { label: "운동 지원", name: "exerciseSupport", value: false },
      { label: "정서적 지원", name: "emotionalSupport", value: false },
      { label: "인지 자극 활동", name: "cognitiveStimulation", value: false },
    ],
  },
];



const AddElder: React.FC = () => {
//   const navigate = useNavigate();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { centerId } = useAdminStore();
  const [elderData, setElderData] = useState<elderInfo>({
    name                   : "",
    centerName             : "",
    birth                  : "",
    gender                 : 0,
    rate                   : "RATE1",
    weight                 : "",
    inmateTypes            : [""],
    address                : "",
    isNormal               : false,
    hasShortTermMemoryLoss : false,
    wandersOutside         : false,
    actsLikeChild          : false,
    hasDelusions           : false,
    hasAggressiveBehavior  : false,
  });
  const [profileImage, setProfileImage] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [serviceData, setServiceData] = useState<elderService>({
    careTypes: [],
    location_id: 0,
    selfFeeding:               false, //스스로식사가능
    mealPreparation:           false, //식사준비
    mealAssistance :           false, //식사보조(구토물정리)
    enteralNutritionSupport:   false, //경관식보조
    
    selfToileting:             false, //자기 배변 가능
    toiletAssistance :         false, //화장실 이용 보조
    occasionalToiletingAssist: false, //간헐적 배변 보조
    diaperCare:                false, //기저귀 케어
    catheterOrStomaCare:       false, //카테터·장루 케어
  
    independentMobility:       false, //자기 이동 가능
    moveAssistance :           false, //이동 보조(침대->휠체어 등 )
    mobilityAssist:            false, //이동 지원(부축)
    wheelchairAssist:          false, //휠체어 보조
    immobile:                  false, //거동불가
  
    dailyLivingAssistance :    false, //일상생활 보조
    cookingAssistance:         false, //요리 보조
    cleaningLaundryAssist:     false, //청소·세탁 지원
    bathingAssist:             false, //목욕 보조
    hospitalAccompaniment:     false, //병원 동행
    exerciseSupport:           false, //운동 지원
    emotionalSupport:          false, //정서적 지원
    cognitiveStimulation:      false, //인지 자극 활동
  
    desiredHourlyWage:         0,  //희망 시급
  
    flexibleSchedule:          false, //유연한 일정 가능
  });


  // Input 데이터 처리
  const elderDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    let newValue: string | number = value;
  
    // ✅ 몸무게(`weight`) 필드일 경우 숫자로 변환
    if (name === "weight") {
      newValue = value.replace(/[^0-9.]/g, ""); // 숫자와 소수점만 허용
      if ((newValue.match(/\./g) || []).length > 1) return; // 소수점 1개만 허용
    }
  
    setElderData((prev) => ({ ...prev, [name]: newValue }));
  }

  // Radio 버튼 처리
  const elderRadioDataChange = (selected: number | string[]) => {
    if (typeof selected === "number") {
      setElderData((prev) => ({ ...prev, gender: selected }));
    }
    else {
      setElderData((prev) => ({ ...prev, inmateTypes: selected }));
    }
  }

  // 치매/서비스 항목 처리
  const handleElderCheckList = (type: string, selected: ServiceOption) => {
    const name = selected.name;
    const value = selected.value
    if (type === "치매") {
      const newData = {...elderData, [name]: value}
      setElderData(newData)
    }
    else if(type === "서비스") {
      const newServiceData = {...serviceData, [name]: value}
      setServiceData(newServiceData)
    }
  }

  const handleElderCheckBox = (selected: string[]) => {

    const newData = {...serviceData, careTypes: selected}
    setServiceData(newData)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddElder = async () => {
    const form = new FormData();
    form.append("data", JSON.stringify(elderData));
    if (profileFile) {
      form.append("profileImg", profileFile, profileFile.name);
    } else {
      form.append("profileImg", "");
    }
    await addElder(
      {
        centerId: centerId,
        data: form
      },
      (res) => {
        console.log(res)
        // const elderId = res.data.data.elderId;
        // const data = {
        //   centerId: centerId,
        //   elderId: elderId,
        //   data: serviceData
        // }
        // handleAddElderService(data)
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  }

  // const handleAddElderService = async (data:AddElderServiceParams) => {
  //   await addElderService(
  //     data,
  //     (res) => {
  //       console.log(res)
  //     },
  //     (err) => {
  //       console.log(err.response?.data)
  //     }
  //   )
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        {/* 성함, 생년월일, 성별 */}
        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 기본 정보 등록</h1> 
            
            <Steps step={step}/>

            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center m-2">
              <label htmlFor="profile-upload" className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 cursor-pointer">
                {profileImage ? (
                  <img src={profileImage} alt="프로필" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-gray-500 text-sm">사진 추가</span>
                )}
              </label>
              <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <p className="text-sm text-gray-500 mt-2">프로필 사진 추가</p>
            </div>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">어르신 성함</label> 
              <Input
                type="text"
                name="name"
                placeholder="성함을 입력해주세요."
                value={elderData.name}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">생년월일</label> 
              <Input
                type="text"
                name="birth"
                placeholder="생년월일를 입력해주세요."
                value={elderData.birth}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">성별</label>
              <RadioInput name="gender" options={[{ value: 1, label: "남성" }, { value: 2, label: "여성" }]}/>

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate("/")} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {/* 몸무게, 장애등급, 동거인여부 */}
        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 세부 정보 등록</h1> 

            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-xl font-bold text-black mt-3 mb-2">몸무게(Kg)</label> 
              {/*몸무게입렵은 별도로..*/}
              <input
                className="w-full p-2 border-2 bg-white border-gray-300 focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                type="text"
                name="weight"
                placeholder="몸무게를 입력해주세요."
                value={elderData.weight}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">장기 요양 등급</label> 
              <Input
                type="text"
                name="rate"
                placeholder="장기 요양 등급을 입력해주세요."
                value={elderData.rate}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">동거인 여부</label> 
              <RadioInput
                name="inmate" 
                options={[
                  { value: ["LIVING_ALONE "], label: "독거" },
                  { value: ["LIVING_WITH_SPOUSE","AT_HOME_DURING_CARE"], label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_SPOUSE","AWAY_DURING_CARE"],    label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                  { value: ["LIVING_WITH_FAMILY","AT_HOME_DURING_CARE"], label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_FAMILY","AWAY_DURING_CARE"],    label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" },
              ]} onChange={elderRadioDataChange}/>
                  
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
              <Btn text="다음" onClick={() => setStep(3)} />
            </div>
          </div>
        )}

        {/* 3단계 */}
        {step === 3 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center justify-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 필요 서비스 항목</h1> 

            <Steps step={step}/>
            <h2 className="mt-4 w-44 text-center sm:text-xl text-black mb-6 font-gtr-B">어르신이 필요한 서비스를 <span className="text-red">모두 선택</span>해 주세요.</h2> 
            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2">
              <CheckBox
                name="서비스 타입"
                options={["방문요양", "요양원", "입주요양", "방문목욕", "병원", "병원동행", "주야간보호"]}
                selectedopt={serviceData.careTypes}
                onChange={handleElderCheckBox}
              />
              <CheckList
                type="치매"
                name={categories[0].title}
                options={categories[0].options}
                onChange={handleElderCheckList}
              /> 
              <CheckList
                type="서비스"
                name={categories[1].title}
                options={categories[1].options}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={categories[2].title}
                options={categories[2].options}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={categories[3].title}
                options={categories[3].options}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={categories[4].title}
                options={categories[4].options}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={categories[5].title}
                options={categories[5].options}
                onChange={handleElderCheckList}
              />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} /> 
              <Btn text="등록" onClick={handleAddElder} />
            </div>
          </div>
        )}
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default AddElder;
