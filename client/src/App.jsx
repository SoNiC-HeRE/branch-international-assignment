import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import UserPage from "./pages/userPage/UserPage.jsx";
import AgentPage from "./pages/agentPage/AgentPage.jsx";
import VerifyUserPage from "./pages/verifyUserPage/VerifyUserPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/verify/user" element={<VerifyUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
