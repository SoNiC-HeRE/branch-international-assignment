import React from "react";
import { nanoid } from 'nanoid';
import { Link, Routes, Route } from "react-router-dom";
import UserLandingPageView from "../userPage/UserLandingPage";
import AgentDashboardView from "../agentPage/agentDashboard/AgentDashboard";
import "./HomePage.scss";

const HomePage = (props) => {
  const unique_id = nanoid(5);
  return (
    <div>
      <h1 style={{marginTop:'4%'}}>Company Customer Support</h1>
      <ul>
        <li>
          <Link className="link-style" to="/agent/dashboard"><h2>Admin Dashboard</h2></Link>
        </li>
        <li>
          <Link className="link-style" to="/user/*"><h2>User Login</h2></Link>
        </li>
      </ul>
      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/agent/dashboard" element={<AgentDashboardView />} />
        <Route path="/user/*" element={<UserLandingPageView userId={unique_id}/>} />
      </Routes>
    </div>
  );
};

export default HomePage;