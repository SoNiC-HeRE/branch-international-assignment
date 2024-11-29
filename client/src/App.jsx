import { BrowserRouter, Route, Routes } from "react-router-dom";
import { nanoid } from "nanoid";
import AgentDashboard from "./pages/agentPage/agentDashboard/AgentDashboard";
import AgentTicketView from "./pages/agentPage/agentTicketView/AgentTicketView";
import UserLandingPage from "./pages/userPage/userLandingPage";
import UserCreateTicket from "./pages/userPage/userCreateTicket/UserCreateTicket";
import UserDashboardView from "./pages/userPage/userDashboardView/UserDashboardView";
import UserTicketView from "./pages/userPage/UserTicketView";
import UserChat from "./components/userChat/UserChat";
import AgentChat from "./components/agentChat/AgentChat";
import HomePage from "./pages/homePage/HomePage";

const App = () => {
  const unique_id = nanoid(5);
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/*" element={<HomePage />} />

        {/* Admin routes */}
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/ticket/:id" element={<AgentTicketView />} />
        <Route path="/agent/chat/:id" element={<AgentChat />} />

        {/* User routes */}
        <Route
          path="/user/*"
          element={<UserLandingPage userId={unique_id} />}
        />
        <Route
          path="/user/create"
          element={<UserCreateTicket userId={unique_id} />}
        />
        <Route
          path="/user/dashboard/*"
          element={<UserDashboardView userId={unique_id} />}
        />
        <Route
          path="/user/ticket/:id"
          element={<UserTicketView userId={unique_id} />}
        />
        <Route path="/user/chat/:id" element={<UserChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
