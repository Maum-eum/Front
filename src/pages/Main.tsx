import React, { useState } from "react";
import Input from "../components/commons/Input";
import Btn from "../components/commons/Btn";
import { useNavigate } from "react-router-dom";  
import { Login } from "../api/commons/User";
import { useAdminStore } from "../stores/admin/adminStore";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { setAdminInfo } = useAdminStore();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    await Login(
      loginData,
      (res) => {
        console.log(res);
  
        const userId = res.data.data.userId;
        const role = res.data.data.role;
        const token = res.headers.authorization; // ✅ 토큰 받아오기
  
        if (token) {
          localStorage.setItem("token", token); // ✅ 토큰 저장
          console.log("✅ 로그인 성공! 토큰 저장 완료:", token);
        } else {
          console.error("🚨 로그인 성공했지만 토큰이 없습니다.");
          return;
        }
  
        if (role === "ROLE_ADMIN") {
          const centerId = res.data.data.centerId;
          const centerName = res.data.data.centerName;
          const name = res.data.data.name;
  
          setAdminInfo(token, userId, role, name, centerId, centerName);
          navigate("/admin/main"); // ✅ 관리자 로그인 성공 시 이동
        } 
        else if (role === "ROLE_CAREGIVER") {
          navigate("/caregiver/main"); // ✅ 요양보호사 로그인 성공 시 이동
        } 
        else {
          console.log("알 수 없는 역할:", role);
        }
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  };
  
  return (
    <div className="w-full h-full py-2 px-4 flex flex-col gap-9 mb-2">
      <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> 
      <Input
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요."
        value={loginData.username}
        onChange={loginDataChange}
      />
      <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> 
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={loginData.password}
        onChange={loginDataChange}
      />
      <Btn text="로그인" onClick={handleLogin} />
      <Btn text="요양보호사 회원가입" onClick={() => navigate("/caregiver/signup/")} />
      <Btn text="관리자 회원가입" onClick={() => navigate("/admin/SignUp")} />
    </div>
  )
};

export default Main;