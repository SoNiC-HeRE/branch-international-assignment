import React from "react";
import { nanoid } from 'nanoid';
import { Link, Routes, Route } from "react-router-dom";
import UserLandingPage from "../User/UserLandingPage";
import AdminDashboard from "../Admin/AdminDashboard";
import "./HomePage.scss";

const HomePage = (props) => {
  const unique_id = nanoid(5);
  return (
    <div>
      <h1 style={{marginTop:'4%'}}>Company Customer Support</h1>
      <ul>
        <li>
          <Link className="link-style" to="/admin/dashboard"><h2>Admin Dashboard</h2></Link>
        </li>
        <li>
          <Link className="link-style" to="/user/*"><h2>User Login</h2></Link>
        </li>
      </ul>
      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/*" element={<UserLandingPage userId={unique_id}/>} />
      </Routes>
    </div>
  );
};

export default HomePage;