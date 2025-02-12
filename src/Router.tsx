// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from './pages/Main';

//
import ManagerSignUp from './pages/manager/SignUp';

//유저회원가입
import SignupStep1 from './pages/caregiver/SignupStep1'; 
import SignupStep2Required from './pages/caregiver/SignupStep2Required';
import SignupStep2Optional from './pages/caregiver/SignupStep2Optional'; 
import SignupStep3 from './pages/caregiver/SignupStep3'; 

export default function Router() {

    //const navi = useNavigate();
    
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />} />
            <Route path="/MSignUp" element={<ManagerSignUp />} />

             {/* 요양보호사 */}
            <Route path="/signup/step1" element={<SignupStep1 />} /> 
            <Route path="/signup/step2/required" element={<SignupStep2Required />} />
            <Route path="/signup/step2/optional" element={<SignupStep2Optional />} /> 
            <Route path="/signup/step3" element={<SignupStep3 />} /> 
        </Routes>
    );
}