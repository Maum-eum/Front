import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  


import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";



const ManagerSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [signUpData, setSignUpData] = useState({
    name: "",
    contact: "",
    username: "",
    password: "",
  });

  const singUpdataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }))
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        {/* 1단계 */}
        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">회원가입</h1> 

            {/* 현재 입력 아이디, 비밀번호 */}
            <Steps step={step}/>

            {/* 프로필 이미지 (임시 박스) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> 
              <Input
                type="text"
                name="username"
                placeholder="아이디를 입력해주세요."
                value={signUpData.username}
                onChange={singUpdataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> 
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={signUpData.password}
                onChange={singUpdataChange}
              />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate("/")} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {/* 2단계 */}
        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">회원가입</h1> 

            {/* 현재 입력 이름, 연락처 */}
            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">이름</label> 
              <Input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요."
                value={signUpData.name}
                onChange={singUpdataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">연락처</label> 
              <Input
                type="text"
                name="contact"
                placeholder="연락처를 입력해주세요. (000-0000-0000)"
                value={signUpData.contact}
                onChange={singUpdataChange}
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
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">회원가입</h1> 

            {/* 센터 선택 */}
            <Steps step={step}/>

            {/* 센터 선택 */}
            <div className="w-full max-w-xs sm:max-w-sm">

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} /> 
              <Btn text="가입 대기" onClick={() => {console.log(signUpData)}} />
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

export default ManagerSignUp;
