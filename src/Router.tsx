// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// 화면정리 필수...! 추후 정리 할 예정이지만 다같이 화이팅 부탁드립니다 -박병조...25/02/12
import Main from './pages/Main';

//
import ManagerSignUp from './pages/manager/SignUp';

export default function Router() {

    //const navi = useNavigate();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />} />
            <Route path="/MSignUp" element={<ManagerSignUp />} />
        </Routes>
    );
}