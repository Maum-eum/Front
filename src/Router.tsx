// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';

// 관리자화면
import AdminSignUp from './pages/admin/SignUp';
import AdminMain from './pages/admin/Main';
import AddElder from './pages/admin/AddElder';

import RecruitRegistration from './pages/admin/RecruitRegistration';
import RecruitModify from './pages/admin/RecruitModify';
import RecommendedCaregiverList from './pages/admin/RecommendedCaregiverList';
import RecommendedCaregiverInfo from './pages/admin/RecommendedCaregiverInfo';
import NegotiationInfo from './pages/admin/NegotiationInfo';
import OngoingServiceInfo from './pages/admin/OngoingServiceInfo';

import ApiTest from './pages/admin/ApiTest';

//유저회원가입
import SignupStep1 from './pages/caregiver/SignupStep1';
import SignupStep3 from './pages/caregiver/SignupStep3';


export default function Router() {

    //const navi = useNavigate();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />} />

            {/* 관리자 */}
            <Route path="/admin/signUp"        element={<AdminSignUp />} />
            <Route path="/admin/main"          element={<AdminMain />} />
            <Route path="/admin/addElder"      element={<AddElder />} />

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
            <Route path="/signup/step1" element={<SignupStep1 />} />
            <Route path="/signup/step3" element={<SignupStep3 />} />
        </Routes>
    );
}
