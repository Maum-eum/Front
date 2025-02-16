// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from './pages/Main';

// 관리자화면
import AdminSignUp from './pages/admin/SignUp';
import AdminMain from './pages/admin/Main';
import AddElder from './pages/admin/AddElder';

//유저회원가입
import SignupStep1 from './pages/caregiver/SignupStep1'; 
import SignupStep3 from './pages/caregiver/SignupStep3'; 

//유저
import EditProfile from './pages/caregiver/EditProfile';

export default function Router() {

    //const navi = useNavigate();
    
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />} />

            {/* 관리자 */}
            <Route path="/admin/signUp"        element={<AdminSignUp />} />
            <Route path="/admin/main"          element={<AdminMain />} />
            <Route path="/admin/addElder"      element={<AddElder />} />

             {/* 요양보호사 */}
            <Route path="/signup/step1" element={<SignupStep1 />} /> 
            <Route path="/signup/step3" element={<SignupStep3 />} /> 
            <Route path="/caregiver/edit/profile" element={<EditProfile />} /> 
        </Routes>
    );
}