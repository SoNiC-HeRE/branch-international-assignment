import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserTicketView from "../UserTicketView";
import "./UserDashboardView.scss";

const UserDashboardView = (props) => {
  const [userTickets, setUserTickets] = useState([]);
  const navigate = useNavigate();

  // Hardcoded createdBy value
  //const createdBy =  'PMHlz'
  const createdBy = props.userId;

  useEffect(() => {
    // Fetch tickets created by the specified user
    const fetchUserTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ticket/user/${createdBy}`
        );
        setUserTickets(response.data);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserTickets();
  }, [createdBy]);

  const handleViewTicket = (ticketId) => {
    // Redirect to the individual ticket view
    navigate(`/user/ticket/${ticketId}`);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <h4>Showing tickets created by: {createdBy}</h4>
      {userTickets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {userTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>
                  <div style={{ textAlign: "left", margin: "1%" }}>
                    {ticket.important ? <span>important</span> : <></>}
                  </div>
                  {ticket.description.substring(0, 100)}
                </td>
                <td>{ticket.status}</td>
                <td>
                  <button onClick={() => handleViewTicket(ticket._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Routes>
        <Route
          path="/user/ticket/:ticketId"
          element={<UserTicketView userId={props.userId} />}
        />
      </Routes>
    </div>
  );
};

export default UserDashboardView;
