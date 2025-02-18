// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from "./pages/Main";

// 관리자화면
import AdminSignUp from "./pages/admin/SignUp";
import AdminMain from "./pages/admin/Main";
import AddElder from "./pages/admin/AddElder";

//유저회원가입
import SignupStep1 from "./pages/caregiver/SignupStep1";
import SignupStep2Required from "./pages/caregiver/SignupStep2Required";
import SignupStep2Optional from "./pages/caregiver/SignupStep2Optional";
import SignupStep3 from "./pages/caregiver/SignupStep3";

// 요양보호사 화면
import CaregiverMain from "./pages/caregiver/Main";
import RequestDetails from "./pages/caregiver/RequestDetails";
import MatchSchedules from "./pages/caregiver/MatchSchedules";
import MatchDetails from "./pages/caregiver/MatchDetails";

export default function Router() {
  //const navi = useNavigate();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Main />} />

      {/* 관리자 */}
      <Route path="/admin/signUp" element={<AdminSignUp />} />
      <Route path="/admin/main" element={<AdminMain />} />
      <Route path="/admin/addElder" element={<AddElder />} />

      {/* 요양보호사 */}
      <Route path="/signup/step1" element={<SignupStep1 />} />
      <Route path="/signup/step2/required" element={<SignupStep2Required />} />
      <Route path="/signup/step2/optional" element={<SignupStep2Optional />} />
      <Route path="/signup/step3" element={<SignupStep3 />} />

      <Route path="/caregiver/main" element={<CaregiverMain />} />
      <Route path="/caregiver/request/details/:recruitConditionId" element={<RequestDetails />} />
      <Route path="/caregiver/match" element={<MatchSchedules />} />
      <Route path="/caregiver/match/details" element={<MatchDetails />} />
    </Routes>
  );
}
