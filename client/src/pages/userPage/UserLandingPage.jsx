import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";
import UserDashboard from "./UserDashboard";
import "./CreateTicketForm.css";

const UserLandingPage = (props) => {
  return (
    <div>
      <h1 style={{marginTop:'4%'}}>Welcome To Our Customer Support</h1>
      <ul>
        <li>
          <Link className="link-style" to="/user/create"><h2>Create Ticket</h2></Link>
        </li>
        <li>
          <Link className="link-style" to="/user/dashboard"><h2>My Tickets</h2></Link>
        </li>
      </ul>
      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/user/create" element={<CreateTicketForm userId={props.userId}/>} />
        <Route path="/user/dashboard" element={<UserDashboard userId={props.userId}/>} />
      </Routes>
    </div>
  );
};

export default UserLandingPage;