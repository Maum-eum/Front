import React, { useState } from "react";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import RadioInput from "../../components/admin/RadioInput";
import CheckList from "../../components/admin/CheckList";
import { addElder, addTempElder } from "../../api/admin/elder";
import { elderInfo, ServiceOption } from "../../types/admin/elderType";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";

const categories = {
    title: "치매 증상",
  }

const AddElder: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { centerId } = useAdminStore();
  const [elderData, setElderData] = useState<elderInfo>({
    elderId                : 0,
    inmateTypes            : [],
    name                   : "",
    birth                  : "",
    gender                 : 0,
    rate                   : "",
    weight                 : "",
    temporarySave          : false,
    normal                 : false,
    hasShortTermMemoryLoss : false,
    wandersOutside         : false,
    actsLikeChild          : false,
    hasDelusions           : false,
    hasAggressiveBehavior  : false,
  });
  const [profileFile, setProfileFile] = useState<File | null>(null);

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
  const elderRadioDataChange = (selected: string | number | string[]) => {
    if (typeof selected === "number") {
      setElderData((prev) => ({ ...prev, gender: selected }));
    }
    else if (typeof selected === "string") {
      setElderData((prev) => ({ ...prev, rate: selected }));
    }
    else {
      setElderData((prev) => ({ ...prev, inmateTypes: selected}))
    }
  }

  // 치매/서비스 항목 처리
  const handleElderCheckList = (selected: ServiceOption) => {
    const name = selected.name;
    const value = selected.value;
    const newData = {...elderData, [name]: value}
    setElderData(newData)
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
    }
  };

  const setIsTemp = (type: boolean) => {
    const form = new FormData()

    if (profileFile) {
      form.append("profileImg", profileFile, profileFile.name);
    } else {
      form.append("profileImg", "");
    }
    
    form.append("inmateTypes", elderData.inmateTypes.join(','))
    form.append("data", JSON.stringify({...elderData, temporarySave:type, inmateTypes: undefined}))

    return form
  }

  const sendAddTempElder = async () => {
    const form = setIsTemp(true)
    await addTempElder(
      {
        centerId: centerId,
        data: form
      },
      () => {
        alert('임시 저장 되었습니다.')
        navigate("/admin/main")
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  }

  const sendAddElder = async () => {
    const form = setIsTemp(false)
    console.log(elderData)
    await addElder(
      {
        centerId: centerId,
        data: form
      },
      (res) => {
        alert('등록 되었습니다.')
        navigate(`/admin/elder/required/${res.data.data.elderId}`)
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  }

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
                {profileFile ? (
                  <img src={URL.createObjectURL(profileFile)} alt="프로필" className="w-full h-full object-cover rounded-full" />
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
              <RadioInput name="gender" options={[{ value: 1, label: "남성" }, { value: 2, label: "여성" }]} onChange={elderRadioDataChange}/>

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate(-1)} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {/* 몸무게, 장애등급, 동거인여부 */}
        {step === 2 && (
          <div className="w-full p-4 flex flex-col items-center h-screen bg-base-white px-4 sm:px-6 py-8">
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
              <RadioInput
                name="rate"
                options={[
                  { value: "NORATE", label: "없음" },
                  { value: "RATE1", label: "1등급" },
                  { value: "RATE2", label: "2등급" },
                  { value: "RATE3", label: "3등급" },
                  { value: "RATE4", label: "4등급" },
                  { value: "RATE5", label: "5등급" }]}
                onChange={elderRadioDataChange}
                selectedValues={[elderData.rate]}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">동거인 여부</label> 
              <RadioInput
                name="inmate" 
                options={[
                  { value: ["LIVING_ALONE"], label: "독거" },
                  { value: ["LIVING_WITH_SPOUSE","AT_HOME_DURING_CARE"], label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_SPOUSE","AWAY_DURING_CARE"],    label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                  { value: ["LIVING_WITH_FAMILY","AT_HOME_DURING_CARE"], label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_FAMILY","AWAY_DURING_CARE"],    label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" },
                ]} onChange={elderRadioDataChange}
                selectedValues={[elderData.inmateTypes]}
              />
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
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 치매 증상</h1> 

            <Steps step={step}/>
            <h2 className="mt-4 w-44 text-center sm:text-xl text-black mb-6 font-gtr-B">증상을<span className="text-red"> 모두 선택 </span>해 주세요.</h2> 
            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2">
              <CheckList
                type="치매"
                name={categories.title}
                options={[
                  { label: "정상",          name: "normal", value: elderData.normal },
                  { label: "단기 기억 장애", name: "hasShortTermMemoryLoss", value: elderData.hasShortTermMemoryLoss },
                  { label: "집 밖을 배회",   name: "wandersOutside", value: elderData.wandersOutside },
                  { label: "어린아이 같은 행동",  name: "actsLikeChild", value: elderData.actsLikeChild },
                  { label: "사람을 의심하는 망상",    name: "hasDelusions", value: elderData.hasDelusions },
                  { label: "때리거나 욕설 등 공격적인 행동",    name: "hasAggressiveBehavior", value: elderData.hasAggressiveBehavior },
                ]}
                onChange={handleElderCheckList}
              /> 
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <div className="w-full flex gap-1">
                <Btn text="이전" color="white" onClick={() => setStep(2)} />
                <Btn text="임시저장" color="pale-green" onClick={sendAddTempElder} />
              </div>
            
              <Btn text="등록" onClick={sendAddElder} />
            </div>
          </div>
        )}
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:flex w-full h-screen items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center text-black mb-6">어르신 정보 등록</h1>

          {/* 📌 데스크탑 레이아웃 - 좌측 기본정보 & 우측 추가 정보 */}
          <div className="grid grid-cols-2 gap-6">
            {/* ✅ 왼쪽 - 기본 정보 (사진 + 주요 정보) */}
            <div className="flex flex-col gap-6">
              {/* 📸 프로필 이미지 업로드 */}
              <div className="flex flex-col items-center mb-2">
                <label htmlFor="profile-upload" className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 cursor-pointer">
                  {profileFile ? (
                    <img src={URL.createObjectURL(profileFile)} alt="프로필" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-gray-500 text-sm">사진 추가</span>
                  )}
                </label>
                <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <p className="text-sm text-gray-500 mt-2">프로필 사진 추가</p>
              </div>

              {/* 기본 정보 입력 */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">어르신 성함</label>
                  <Input type="text" name="name" placeholder="성함을 입력해주세요." value={elderData.name} onChange={elderDataChange} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">생년월일</label>
                  <Input type="text" name="birth" placeholder="생년월일을 입력해주세요." value={elderData.birth} onChange={elderDataChange} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">성별</label>
                  <RadioInput name="gender" options={[{ value: 1, label: "남성" }, { value: 2, label: "여성" }]} onChange={elderRadioDataChange} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">몸무게 (Kg)</label>
                  {/*몸무게입렵은 별도로..*/}
                  <input
                    className="w-full p-2 border-2 bg-white border-gray-300 focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                    type="text"
                    name="weight"
                    placeholder="몸무게를 입력해주세요."
                    value={elderData.weight}
                    onChange={elderDataChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">장기 요양 등급</label>
                  <RadioInput
                    name="rate"
                      options={[
                        { value: "NORATE", label: "없음" },
                        { value: "RATE1", label: "1등급" },
                        { value: "RATE2", label: "2등급" },
                        { value: "RATE3", label: "3등급" },
                        { value: "RATE4", label: "4등급" },
                        { value: "RATE5", label: "5등급" }
                      ]}
                      onChange={elderRadioDataChange}
                    selectedValues={[elderData.rate]}
                  />
                </div>
              </div>
            </div>

            {/* ✅ 오른쪽 - 장기 요양등급, 동거 여부, 치매 증상 */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">동거인 여부</label>
                <RadioInput
                  name="inmate"
                  options={[
                    { value: ["LIVING_ALONE"], label: "독거" },
                    { value: ["LIVING_WITH_SPOUSE", "AT_HOME_DURING_CARE"], label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                    { value: ["LIVING_WITH_SPOUSE", "AWAY_DURING_CARE"], label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                    { value: ["LIVING_WITH_FAMILY", "AT_HOME_DURING_CARE"], label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                    { value: ["LIVING_WITH_FAMILY", "AWAY_DURING_CARE"], label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" }
                  ]}
                  onChange={elderRadioDataChange}
                  selectedValues={[elderData.inmateTypes]}
                />
              </div>

              {/* 🧠 치매 증상 체크리스트 */}
              <div className="w-full">
                <h2 className="text-sm font-bold mb-2">어르신 치매 증상</h2>
                <CheckList
                  type="치매"
                  name={categories.title}
                  options={[
                    { label: "정상", name: "normal", value: elderData.normal },
                    { label: "단기 기억 장애", name: "hasShortTermMemoryLoss", value: elderData.hasShortTermMemoryLoss },
                    { label: "집 밖을 배회", name: "wandersOutside", value: elderData.wandersOutside },
                    { label: "어린아이 같은 행동", name: "actsLikeChild", value: elderData.actsLikeChild },
                    { label: "사람을 의심하는 망상", name: "hasDelusions", value: elderData.hasDelusions },
                    { label: "때리거나 욕설 등 공격적인 행동", name: "hasAggressiveBehavior", value: elderData.hasAggressiveBehavior }
                  ]}
                  onChange={handleElderCheckList}
                />
              </div>
            </div>
          </div>


          {/* 📌 버튼 영역 */}
          <div className="flex justify-between mt-8 gap-2 w-full">
            <Btn text="뒤로 가기" color="white" onClick={() => navigate(-1)} />
            <Btn text="임시저장" color="pale-green" onClick={sendAddTempElder}/> 
            <Btn text="등록" onClick={sendAddElder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddElder;
