// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from "./pages/Main";


// 관리자화면
import AdminSignUp from "./pages/admin/SignUp";
import AdminMain from "./pages/admin/Main";
import AddElder from "./pages/admin/AddElder";
import ModifyAdmin from "./pages/admin/ModifyAdmin";
import DetailElder from "./pages/admin/DetailElder";
import ModifyElder from "./pages/admin/ModifyElder";

import RequiredInfoRegister from "./pages/admin/RequiredInfoRegister";
import RecruitRegistration from './pages/admin/RecruitRegistration';
import RecruitModify from './pages/admin/RecruitModify';
import RecommendedCaregiverList from './pages/admin/RecommendedCaregiverList';
import RecommendedCaregiverInfo from './pages/admin/RecommendedCaregiverInfo';
import NegotiationInfo from './pages/admin/NegotiationInfo';
import OngoingServiceInfo from './pages/admin/OngoingServiceInfo';

import ApiTest from './pages/admin/ApiTest';

//유저회원가입
import SignupTest from "./pages/caregiver/SignupTest";
import SignupStep3 from "./pages/caregiver/SignupStep3";

// 요양보호사 화면
import CaregiverMain from "./pages/caregiver/Main";
import RequestDetails from "./pages/caregiver/RequestDetails";
import MatchSchedules from "./pages/caregiver/MatchSchedules";

//유저
import EditProfile from "./pages/caregiver/EditProfile";



export default function Router() {
  //const navi = useNavigate();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Main />} />


      {/* 관리자 */}
      <Route path="/admin/signUp" element={<AdminSignUp />} />
      <Route path="/admin/main" element={<AdminMain />} />
      <Route path="/admin/modify" element={<ModifyAdmin />} />
      <Route path="/admin/elder/add" element={<AddElder />} />
      <Route path="/admin/elder/detail/:elderId" element={<DetailElder />} />
      <Route path="/admin/elder/modify/:elderId" element={<ModifyElder />} />

      <Route path="/admin/elder/required/:elderId" element={<RequiredInfoRegister />} />

      <Route path="/admin/recruit"                   element={<RecruitRegistration />} />
      {/* <Route path="/admin/:elderId/recruit"                   element={<RecruitRegistration />} /> */}
      <Route path="/admin/:elderId/recruit-modify"            element={<RecruitModify />} />
      <Route path="/admin/:elderId/recommended"               element={<RecommendedCaregiverList />} />
      <Route path="/admin/:elderId/recommended/:caregiverId"  element={<RecommendedCaregiverInfo />} />
      <Route path="/admin/negotiation/:matchId"               element={<NegotiationInfo />} />
      <Route path="/admin/ongoing/:matchId"                   element={<OngoingServiceInfo />} />
      {/* */}
      <Route path="/test"                   element={<ApiTest />} />

      {/* 요양보호사 */}

      <Route path="/caregiver/signup/step3" element={<SignupStep3 />} />
      <Route path="/caregiver/signup" element={<SignupTest />} />
      <Route path="/caregiver/edit/profile" element={<EditProfile />} />

      <Route path="/caregiver/main" element={<CaregiverMain />} />
      <Route path="/caregiver/request/details/:recruitConditionId" element={<RequestDetails />} />
      <Route path="/caregiver/match" element={<MatchSchedules />} />
    </Routes>
  );
}
