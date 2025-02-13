import React, { useState } from "react";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import RadioInput from "../../components/admin/RadioInput";

import { useNavigate } from "react-router-dom";

const AddElder: React.FC = () => {
//   const navigate = useNavigate();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [addElderdata, setAddElderdata] = useState({
    center_id:  "",
    name:       "",
    birth:      "",
    gender:     "",
    rate:       "",
    img:        "",
    weight:     "",
    inmate:     false,
  });

  const elderDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddElderdata((prev) => ({ ...prev, [name]: value }))
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

            {/* 프로필 이미지 (임시 박스) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">어르신 성함</label> 
              <Input
                type="text"
                name="username"
                placeholder="아이디를 입력해주세요."
                value={addElderdata.name}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">생년월일</label> 
              <Input
                type="text"
                name="text"
                placeholder="생년월일를 입력해주세요."
                value={addElderdata.birth}
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
              <Input
                type="text"
                name="text"
                placeholder="몸무게를 입력해주세요."
                value={addElderdata.weight}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">장기 요양 등급</label> 
              <Input
                type="text"
                name="username"
                placeholder="장기 요양 등급을 입력해주세요."
                value={addElderdata.rate}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">동거인 여부</label> 
              <RadioInput
                name="inmate" 
                options={[
                  { value: 1, label: "독거" },
                  { value: 2, label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                  { value: 3, label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                  { value: 4, label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                  { value: 5, label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" },
              ]}/>
                  
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
              <Btn text="다음" onClick={() => setStep(3)} />
            </div>
          </div>
        )}

        {/* 3단계 */}
        {step === 3 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">어르신 필요 서비스 항목</h1> 

            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} /> 
              <Btn text="가입 대기" onClick={() => {console.log(addElderdata)}} />
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
