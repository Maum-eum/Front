import React, { useState, useRef } from "react";
import Input from "../components/commons/Input";
import Btn from "../components/commons/Btn";
import { useNavigate } from "react-router-dom";
import { Login } from "../api/commons/User";
import { useUserStore } from "../stores/userStore";
import { useAdminStore } from "../stores/admin/adminStore";
import { useCaregiverStore } from "../stores/caregiver/caregiverStore";
import PoongImage from "../assets/image/logo.png";


const Main: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useUserStore();
  const { setAdminInfo } = useAdminStore();
  const { setCaregiverInfo } = useCaregiverStore();
  const registerSectionRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    await Login(
      loginData,
      (res) => {
        console.log(res);
        const userId = res.data.data.userId;
        const role = res.data.data.role;
        const token = res.headers.authorization;

        //  2025-02-25 박병조 수정 공용스토어에 저장으로 변경
        setAccessToken(token)
        setUserInfo(userId, role);

        if (role === "ROLE_ADMIN") {
          const { centerId, centerName, name } = res.data.data;
          setAdminInfo(name, centerId, centerName);
          navigate("/admin/main");
        } else if (role === "ROLE_CAREGIVER") {
          setCaregiverInfo(userId, token);
          navigate("/caregiver/main");
        } else {
          console.log("알 수 없는 역할:", role);
        }
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  };

  const scrollToRegister = () => {
    registerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    topSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-white to-[#E3F7D0] py-10 px-4 font-gtr-B">
      <div ref={topSectionRef} className="flex flex-col items-center w-full max-w-sm">
        <img src={PoongImage} alt="logo" className="w-50 mx-auto mb-4" />

        <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col gap-6 ">
          <label className="text-gray-700 font-bold">아이디</label>
          <Input
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            value={loginData.username}
            onChange={loginDataChange}
          />
          <label className="text-gray-700 font-bold">비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={loginData.password}
            onChange={loginDataChange}
          />
          <Btn text="로그인" onClick={handleLogin} />
        </div>
      </div>

      <button className="mt-6 text-gray-700 font-bold" onClick={scrollToRegister}>
        회원가입 하러 가기
      </button>

      <div
        ref={registerSectionRef}
        className="flex flex-col items-center mt-20 w-full max-w-sm relative pb-80"
      >
        <h2 className="text-gray-700 font-bold mb-6">회원가입</h2>
        <div className="relative w-full flex flex-col items-center gap-40">
          <div className="w-64 h-64 bg-[#FFB4B4] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md absolute top-[50px] left-[-40px]">
            요양보호사이신가요?
            <button
              onClick={() => navigate("/caregiver/signup/")}
              className="absolute w-full h-full opacity-0"
            />
          </div>
          <div className="w-64 h-64 bg-[#34D000] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md absolute top-[350px] right-[-40px]">
            사회복지사이신가요?
            <button
              onClick={() => navigate("/admin/SignUp")}
              className="absolute w-full h-full opacity-0"
            />
          </div>
        </div>

        <div className="mt-96"></div>
      </div>

      <div className="w-full flex flex-col items-center">
        <button className="text-gray-700 text-sm font-bold" onClick={scrollToTop}>
          로그인 하러 가기
        </button>
      </div>
    </div>
  );
};

export default Main;
