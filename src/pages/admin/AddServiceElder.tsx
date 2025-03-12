import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CheckList from "../../components/admin/CheckList";
import CheckBox from "../../components/admin/CheckBox";

import { elderService, ServiceOption, ServiceTime } from "../../types/admin/service";

import { useAdminStore } from "../../stores/admin/adminStore";

import RegionSelect from "../../components/admin/RegionSelect";
import TimeSelect from "../../components/admin/TimeSelect";

import { addElderService } from "../../api/admin/service";

const AddServiceElder: React.FC = () => {

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { centerId } = useAdminStore();
  const { elderId} = useParams();

  const [serviceData, setServiceData] = useState<elderService>({
    address: "",
    recruitConditionId: 0,
    elderId:  0,
    careTypes: [],
    recruitLocation : 0,
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
    recruitTimes: [],
    detailRequiredService:     ""
  });

	


  // Input 데이터 처리
  const elderDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "desiredHourlyWage"){

      setServiceData((prev) => ({ ...prev, [name]: parseInt(value) }));
    }
    else {
      setServiceData((prev) => ({ ...prev, [name]: value }));
    }
  }
  // Input 데이터 처리
  const elderTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setServiceData((prev) => ({ ...prev, [name]: value }));
  }


  // 서비스 항목 처리
  const handleElderCheckList = (selected: ServiceOption) => {
    const name = selected.name;
    const value = selected.value;
    const newServiceData = {...serviceData, [name]: value}
    setServiceData(newServiceData)
  }

  const handleElderCheckBox = (selected: string[]) => {
    const newData = {...serviceData, careTypes: selected}
    setServiceData(newData)
  }

  const handleAddElderService = async () => {
    if (!elderId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }
    console.log(serviceData)
    await addElderService(
      {
        centerId: centerId,
        elderId: parseInt(elderId),
        data: serviceData
      },
      (res) => {
        console.log(res)
        navigate(`/admin/elder/detail/${elderId}`)
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  }

  const setServiceTime = (newTimeData: ServiceTime[]) => {
    setServiceData((prev) => ({
      ...prev,
      recruitTimes: newTimeData, 
    }));
  };

  const setLocation = (location: number[]) => {
    setServiceData((prev) => ({
      ...prev,
      recruitLocation: location[0],
    }));

  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">

        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8 overflow-y-auto">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 서비스 등록</h1> 
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
                type="서비스"
                name={"식사보조"}
                options={[
                  { label: "스스로 식사 가능", name: "selfFeeding", value: serviceData.selfFeeding },
                  { label: "식사 준비", name: "mealPreparation", value: serviceData.mealPreparation },
                  { label: "식사 보조 (구토물 정리)", name: "mealAssistance", value: serviceData.mealAssistance },
                  { label: "경관식 보조", name: "enteralNutritionSupport", value: serviceData.enteralNutritionSupport },
                ]}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={"배변보조"}
                options={[
                  { label: "자기 배변 가능", name: "selfToileting", value: serviceData.selfToileting },
                  { label: "화장실 이용 보조", name: "toiletAssistance", value: serviceData.toiletAssistance },
                  { label: "간헐적 배변 보조", name: "occasionalToiletingAssist", value: serviceData.occasionalToiletingAssist },
                  { label: "기저귀 케어", name: "diaperCare", value: serviceData.diaperCare },
                  { label: "카테터·장루 케어", name: "catheterOrStomaCare", value: serviceData.catheterOrStomaCare },
                ]}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={"이동보조"}
                options={[
                          { label: "자기 이동 가능", name: "independentMobility", value: serviceData.independentMobility },
                          { label: "이동 보조 (침대→휠체어 등)", name: "moveAssistance", value: serviceData.moveAssistance },
                          { label: "이동 지원 (부축)", name: "mobilityAssist", value: serviceData.mobilityAssist },
                          { label: "휠체어 보조", name: "wheelchairAssist", value: serviceData.wheelchairAssist },
                          { label: "거동 불가", name: "immobile", value: serviceData.immobile },
                        ]}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={"일상 생활 지원"}
                options={[
                          { label: "일상생활 보조", name: "dailyLivingAssistance", value: serviceData.dailyLivingAssistance },
                          { label: "요리 보조", name: "cookingAssistance", value: serviceData.cookingAssistance },
                          { label: "청소·세탁 지원", name: "cleaningLaundryAssist", value: serviceData.cleaningLaundryAssist },
                          { label: "목욕 보조", name: "bathingAssist", value: serviceData.bathingAssist },
                          { label: "병원 동행", name: "hospitalAccompaniment", value: serviceData.hospitalAccompaniment },
                        ]}
                onChange={handleElderCheckList}
              />
              <CheckList
                type="서비스"              
                name={"건강 및 정서 지원"}
                options={[
                          { label: "운동 지원", name: "exerciseSupport", value: serviceData.exerciseSupport },
                          { label: "정서적 지원", name: "emotionalSupport", value: serviceData.emotionalSupport },
                          { label: "인지 자극 활동", name: "cognitiveStimulation", value: serviceData.cognitiveStimulation },
                        ]}
                onChange={handleElderCheckList}
              />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate(-1)} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 지역 설정</h1> 

            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm overflow-auto flex flex-col items-center">
              <RegionSelect 
                selectedLocations={[serviceData.recruitLocation]}
                setSelectedLocations={setLocation}
              />
              <div className="w-11/12">
                <label className="text-lg font-gtr-B mb-3 text-center">상세 주소</label>
                <input
                  className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                  type="text"
                  name="address"
                  value={serviceData.address}
                  onChange={elderDataChange}
                  placeholder="상세 주소를 입력하세요..."
                />
              </div>
              <TimeSelect setTimeData={setServiceTime}/>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
              <Btn text="다음" onClick={() => setStep(3)} />
              
            </div>
          </div>
        )}

        {/* 3단계 */}
        {step === 3 && (
          <div className="w-full p-4 flex flex-col items-center justify-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 필요 서비스 항목</h1> 

            <Steps step={step}/>
            
            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2 overflow-y-auto">
              <label className="text-content">시급</label>
              <input
                className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                type="number"
                name="desiredHourlyWage"
                value={serviceData.desiredHourlyWage}
                onChange={elderDataChange}
                min="0" // 음수 방지
                step="1" // 소수점 방지
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                }}
                onKeyDown={(e) => {
                  if (["e", "E", ".", "-"].includes(e.key)) {
                    e.preventDefault(); // e, E, ., - 입력 차단
                  }
                }}
              />
              <label className="text-content">추가 요청사항</label>
              <textarea
                className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                name="detailRequiredService"
                value={serviceData.detailRequiredService}
                onChange={elderTextAreaChange}
                rows={5} // 텍스트 입력 공간 확보
                placeholder="추가 요청사항을 입력하세요..."
              />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} />
              <Btn text="등록" onClick={handleAddElderService} />
            </div>
          </div>
        )}
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block w-full h-screen">
        <div className="w-full bg-base-white grid grid-cols-3 gap-6 p-8 h-full">
          <div className="col-span-2 h-full bg-white shadow rounded-lg p-4 flex flex-col">
            {/* 타이틀 */}
            <h1 className="text-title font-bold text-black mb-6 font-gtr-B">어르신 서비스 등록</h1>
            
            <div className="w-full grid grid-cols-3 justify-center gap-2">
              <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
                <div className="col-span-2">
                  <h2 className="text-lg mb-2 font-gtr-B">어르신이 필요한 서비스를 <span className="text-red">모두 선택</span>해 주세요.</h2> 
                </div>
                <CheckBox
                  name="서비스 타입"
                  options={["방문요양", "요양원", "입주요양", "방문목욕", "병원", "병원동행", "주야간보호"]}
                  selectedopt={serviceData.careTypes}
                  onChange={handleElderCheckBox}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"
                  name={"식사보조"}
                  options={[
                    { label: "스스로 식사 가능", name: "selfFeeding", value: serviceData.selfFeeding },
                    { label: "식사 준비", name: "mealPreparation", value: serviceData.mealPreparation },
                    { label: "식사 보조 (구토물 정리)", name: "mealAssistance", value: serviceData.mealAssistance },
                    { label: "경관식 보조", name: "enteralNutritionSupport", value: serviceData.enteralNutritionSupport },
                  ]}
                  onChange={handleElderCheckList}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"배변보조"}
                  options={[
                    { label: "자기 배변 가능", name: "selfToileting", value: serviceData.selfToileting },
                    { label: "화장실 이용 보조", name: "toiletAssistance", value: serviceData.toiletAssistance },
                    { label: "간헐적 배변 보조", name: "occasionalToiletingAssist", value: serviceData.occasionalToiletingAssist },
                    { label: "기저귀 케어", name: "diaperCare", value: serviceData.diaperCare },
                    { label: "카테터·장루 케어", name: "catheterOrStomaCare", value: serviceData.catheterOrStomaCare },
                  ]}
                  onChange={handleElderCheckList}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"이동보조"}
                  options={[
                            { label: "자기 이동 가능", name: "independentMobility", value: serviceData.independentMobility },
                            { label: "이동 보조 (침대→휠체어 등)", name: "moveAssistance", value: serviceData.moveAssistance },
                            { label: "이동 지원 (부축)", name: "mobilityAssist", value: serviceData.mobilityAssist },
                            { label: "휠체어 보조", name: "wheelchairAssist", value: serviceData.wheelchairAssist },
                            { label: "거동 불가", name: "immobile", value: serviceData.immobile },
                          ]}
                  onChange={handleElderCheckList}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"일상 생활 지원"}
                  options={[
                            { label: "일상생활 보조", name: "dailyLivingAssistance", value: serviceData.dailyLivingAssistance },
                            { label: "요리 보조", name: "cookingAssistance", value: serviceData.cookingAssistance },
                            { label: "청소·세탁 지원", name: "cleaningLaundryAssist", value: serviceData.cleaningLaundryAssist },
                            { label: "목욕 보조", name: "bathingAssist", value: serviceData.bathingAssist },
                            { label: "병원 동행", name: "hospitalAccompaniment", value: serviceData.hospitalAccompaniment },
                          ]}
                  onChange={handleElderCheckList}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"건강 및 정서 지원"}
                  options={[
                            { label: "운동 지원", name: "exerciseSupport", value: serviceData.exerciseSupport },
                            { label: "정서적 지원", name: "emotionalSupport", value: serviceData.emotionalSupport },
                            { label: "인지 자극 활동", name: "cognitiveStimulation", value: serviceData.cognitiveStimulation },
                          ]}
                  onChange={handleElderCheckList}
                  isPreOpen={true}
                />
              </div>
              <div className="col-span-1 flex flex-col h-full">
                <RegionSelect 
                  selectedLocations={[serviceData.recruitLocation]}
                  setSelectedLocations={setLocation}
                />
                <div className="px-6">
                  <label className="text-lg font-gtr-B mb-3 text-center">상세 주소</label>
                  <input
                    className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                    type="text"
                    name="address"
                    value={serviceData.address}
                    onChange={elderDataChange}
                    placeholder="상세 주소를 입력하세요..."
                  />
                  <label className="text-lg font-gtr-B mb-3 text-center">시급</label>
                  <input
                    className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                    type="number"
                    name="desiredHourlyWage"
                    value={serviceData.desiredHourlyWage}
                    onChange={elderDataChange}
                    min="0" // 음수 방지
                    step="1" // 소수점 방지
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", ".", "-"].includes(e.key)) {
                        e.preventDefault(); // e, E, ., - 입력 차단
                      }
                    }}
                  />
                </div>
              </div>
            </div>          
          </div>
          <div className="col-span-1 h-full bg-white shadow rounded-lg p-4 flex flex-col">
            {/* ✅ 시간 선택 컴포넌트 */}
            <TimeSelect setTimeData={setServiceTime} />
            <label className="text-lg font-gtr-B mb-1 m-4">추가 요청사항</label>
            <textarea
              className="resize-none m-2 p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
              name="detailRequiredService"
              value={serviceData.detailRequiredService}
              onChange={elderTextAreaChange}
              rows={5} // 텍스트 입력 공간 확보
              placeholder="추가 요청사항을 입력하세요..."
            />
            {/* ✅ 하단 고정 버튼 (자동 밀림) */}
            <div className="mt-auto flex gap-2">
              <Btn text="이전" color="white" onClick={() => navigate(-1)} />
              <Btn text="등록" onClick={handleAddElderService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceElder;
