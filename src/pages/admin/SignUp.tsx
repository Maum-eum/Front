import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import CenterSearch from "../../components/admin/CenterSearch";

import { signUp } from "../../api/admin/auth";

const AdminSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [signUpData, setSignUpData] = useState({
    name:     "",
    connect:  "",
    username: "",
    password: "",
    centerName: "test",
  });

  const signUpdataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCenterSelect = (selectedCenter: string) => {
    setSignUpData((prev) => ({ ...prev, centerName: selectedCenter }));
  };

  const handleSignUp = async () => {
    console.log(signUpData);
    await signUp(
      signUpData,
      () => {
        console.log(signUpData);
        navigate("/");
      },
      (err) => {
        console.log(err.response?.data);
        alert(`${err.response?.data.message}`);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* ✅ 모바일 환경 (변경 없음) */}
      <div className="block md:hidden w-full">
        <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
          <h1 className="text-title sm:text-3xl font-bold text-black mb-6">회원가입</h1>
          <Steps step={step} />

          {step === 1 && (
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>
              <div className="w-full max-w-xs sm:max-w-sm">
                <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> 
                <Input type="text" name="username" placeholder="아이디 입력" value={signUpData.username} onChange={signUpdataChange} />
                <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> 
                <Input type="password" name="password" placeholder="비밀번호 입력" value={signUpData.password} onChange={signUpdataChange} />
              </div>
              <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
                <Btn text="취소하기" color="white" onClick={() => navigate("/")} /> 
                <Btn text="다음" onClick={() => setStep(2)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full max-w-xs sm:max-w-sm">
                <label className="block text-item sm:text-2xl font-bold text-black mb-2">이름</label> 
                <Input type="text" name="name" placeholder="이름 입력" value={signUpData.name} onChange={signUpdataChange} />
                <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">연락처</label> 
                <Input type="text" name="connect" placeholder="연락처 입력" value={signUpData.connect} onChange={signUpdataChange} />
              </div>
              <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
                <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
                <Btn text="다음" onClick={() => setStep(3)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full max-w-xs sm:max-w-sm">
                <CenterSearch onSelect={handleCenterSelect} />
              </div>
              <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
                <Btn text="이전" color="white" onClick={() => setStep(2)} /> 
                <Btn text="가입 대기" onClick={handleSignUp} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ 데스크탑 환경 */}
      <div className="hidden md:flex w-full h-screen items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center text-black mb-6">관리자 회원가입</h1>

          {/* 입력 폼 */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-bold mb-1">아이디</label> 
              <Input type="text" name="username" placeholder="아이디 입력" value={signUpData.username} onChange={signUpdataChange} />
            </div>

            <div>
              <label className="block font-bold mb-1">비밀번호</label> 
              <Input type="password" name="password" placeholder="비밀번호 입력" value={signUpData.password} onChange={signUpdataChange} />
            </div>

            <div>
              <label className="block font-bold mb-1">이름</label> 
              <Input type="text" name="name" placeholder="이름 입력" value={signUpData.name} onChange={signUpdataChange} />
            </div>

            <div>
              <label className="block font-bold mb-1">연락처</label> 
              <Input type="text" name="connect" placeholder="연락처 입력" value={signUpData.connect} onChange={signUpdataChange} />
            </div>

            <div>
              <label className="block font-bold mb-1">센터 선택</label>
              <div className="flex items-center justify-center">
                <CenterSearch onSelect={handleCenterSelect} />
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between mt-6">
            <Btn text="뒤로 가기" color="white" onClick={() => navigate(-1)} />
            <Btn text="가입 대기" onClick={handleSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
