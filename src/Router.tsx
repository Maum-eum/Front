import { Routes, Route, Navigate } from "react-router-dom";
import { useAdminStore } from "./stores/admin/adminStore";


// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from "./pages/Main";


// 관리자화면
import AdminSignUp from "./pages/admin/SignUp";
import AdminMain from "./pages/admin/Main";
import AddElder from "./pages/admin/AddElder";
import ModifyAdmin from "./pages/admin/ModifyAdmin";
import DetailElder from "./pages/admin/DetailElder";
import ModifyElder from "./pages/admin/ModifyElder";
import AddServiceElder from "./pages/admin/AddServiceElder";


//유저회원가입
import SignupTest from "./pages/caregiver/SignupTest";
import SignupStep3 from "./pages/caregiver/SignupStep3";

// 요양보호사 화면
import CaregiverMain from "./pages/caregiver/Main";
import RequestDetails from "./pages/caregiver/RequestDetails";
import MatchSchedules from "./pages/caregiver/MatchSchedules";
import JobConditionEdit from "./pages/caregiver/JobConditionEdit";
import JobConditionView from "./pages/caregiver/JobConditionView";
import EditProfile from "./pages/caregiver/EditProfile";

const ProtectedRoute: React.FC<{ element: React.ReactElement; allowedRoles: string[] }> = ({ element, allowedRoles }) => {
  const { role } = useAdminStore(); 

  if (!role) {
    return <Navigate to="/" replace />;
  }

  const currentRole = role === "ROLE_ADMIN" ? "admin" : "caregiver";

  if (!currentRole) {
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(currentRole) ? element : <Navigate to={`/${currentRole}/main`} replace />;
};


export default function Router() {
  //const navi = useNavigate();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Main />} />

      {/*관리자 전용*/}
      <Route path="/admin/signUp" element={<AdminSignUp />} />
      <Route path="/admin/main" element={<ProtectedRoute element={<AdminMain />} allowedRoles={["admin"]} />} />
      <Route path="/admin/modify" element={<ProtectedRoute element={<ModifyAdmin />} allowedRoles={["admin"]} />} />
      <Route path="/admin/elder/add" element={<ProtectedRoute element={<AddElder />} allowedRoles={["admin"]} />} />
      <Route path="/admin/elder/detail/:elderId" element={<ProtectedRoute element={<DetailElder />} allowedRoles={["admin"]} />} />
      <Route path="/admin/elder/modify/:elderId/:temp" element={<ProtectedRoute element={<ModifyElder />} allowedRoles={["admin"]} />} />
      <Route path="/admin/elder/required/:elderId/" element={<ProtectedRoute element={<AddServiceElder />} allowedRoles={["admin"]} />} />

      {/*요양보호사 전용*/}
      <Route path="/caregiver/signup/step3" element={<SignupStep3 />} />
      <Route path="/caregiver/signup" element={<SignupTest />} />
      <Route path="/caregiver/jobcondition/edit" element={<JobConditionEdit />} />
      <Route path="/caregiver/jobcondition" element={<JobConditionView />} />
      <Route path="/caregiver/edit/profile" element={<ProtectedRoute element={<EditProfile />} allowedRoles={["caregiver"]} />} />
  
      <Route path="/caregiver/main" element={<CaregiverMain />} />
      <Route path="/caregiver/match" element={<MatchSchedules />} />
      <Route path="/caregiver/match/:recruitId/:centerId/:elderId" element={<RequestDetails />} />
      

      <Route path="/caregiver/main" element={<ProtectedRoute element={<CaregiverMain />} allowedRoles={["caregiver"]} />} />
      <Route path="/caregiver/request/details/:recruitConditionId" element={<ProtectedRoute element={<RequestDetails />} allowedRoles={["caregiver"]} />} />
      <Route path="/caregiver/match" element={<ProtectedRoute element={<MatchSchedules />} allowedRoles={["caregiver"]} />} />
    </Routes>
  );
}
