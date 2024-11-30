import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import UserCreateTicket from "../userPage/userCreateTicket/UserCreateTicket";
import UserDashboard from "../userPage/userDashboardView/UserDashboardView";
import "../userPage/userCreateTicket/UserCreateTicket.scss";

const UserLandingPage = (props) => {
  return (
    <div className="user-background">
      <div className="card">
        <div className="bg"></div>
        <div className="blob"></div>
      </div>
      <div className="userpage-content">
        <h1 className="userpage-header">Welcome To Our Customer Support</h1>
        <div className="list-div">
          <div className="list-heading">What would you like to do ?</div>
          <ul>
            <li>
              <Link className="link-style" to="/user/create">
                <h2 className="link-header">Create Ticket</h2>
              </Link>
            </li>
            <li>
              <Link className="link-style" to="/user/dashboard">
                <h2 className="link-header">My Tickets</h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Use Routes to handle navigation */}
      <Routes>
        <Route
          path="/user/create"
          element={<UserCreateTicket userId={props.userId} />}
        />
        <Route
          path="/user/dashboard"
          element={<UserDashboard userId={props.userId} />}
        />
      </Routes>
    </div>
  );
};

export default UserLandingPage;
