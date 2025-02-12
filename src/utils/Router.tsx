// import { Routes, Route, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';

export default function Router() {

    //const navi = useNavigate();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />} />
        </Routes>
    );
}