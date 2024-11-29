import React from "react";
import { nanoid } from "nanoid";
import { Link, Routes, Route } from "react-router-dom";
import UserLandingPageView from "../userPage/userLandingPage";
import AgentDashboardView from "../agentPage/agentDashboard/AgentDashboard";
import "./HomePage.scss";

const HomePage = (props) => {
  const unique_id = nanoid(5);
  return (
    <div className="homepage-background">
      <div class="card">
        <div class="bg"></div>
        <div class="blob"></div>
      </div>
      <div className="homepage-content">
        <h1 className="homepage-header">Bolt</h1>
        <p className="header-subheading">Your one stop solution</p>
        <div className="list-div">
          <div className="list-heading">Login as: </div>
          <ul>
            <li>
              <Link className="link-style" to="/agent/dashboard">
                <h2 className="link-header">Agent </h2>
              </Link>
            </li>
            <li>
              <Link className="link-style" to="/user/*">
                <h2 className="link-header">User </h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/agent/dashboard" element={<AgentDashboardView />} />
        <Route
          path="/user/*"
          element={<UserLandingPageView userId={unique_id} />}
        />
      </Routes>
    </div>
  );
};

export default HomePage;
