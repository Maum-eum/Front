import React from "react";
import Input from "../components/commons/Input";
import Btn from "../components/commons/Btn";
import { useNavigate } from "react-router-dom";  

const Main: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full py-2 px-4 flex flex-col gap-9 mb-2">
      <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> 
      <Input
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요."
      />
      <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> 
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <Btn text="요양보호사 회원가입" onClick={() => navigate("/signup/step1")} />
      <Btn text="관리자 회원가입" onClick={() => navigate("/admin/SignUp")} />
    </div>
  )
};

export default Main;