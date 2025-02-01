import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserLogout from "./pages/userLogout";

import { UserProtectWrapper } from "./pages/userProtectWrapper";
import { UserContextProvider } from './context/UserContext';
import { CaptainContextProvider } from './context/CaptainContext';

const App = () => {
  return (
    <UserContextProvider>
      <CaptainContextProvider>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/home" element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
          <Route path="/users/logout" element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>} />
        </Routes>
      </CaptainContextProvider>
    </UserContextProvider>
  )
}

export default App