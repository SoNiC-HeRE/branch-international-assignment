import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AgentDashboard.scss"; // Import the CSS file

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All"); // Default: show all tickets
  const [searchExp, setSearchExp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tickets when the component mounts
    fetchTickets();
  }, [selectedStatus]); // Fetch tickets whenever the selectedStatus changes

  useEffect(() => {
    fetchSearch();
  }, [searchExp]);

  const fetchSearch = async () => {
    try {
      const url = `http://localhost:5000/ticket/search?exp=${searchExp}`;

      const response = await axios.get(url);
      console.log("Response:", response.data); // Log the entire response
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchTickets = async () => {
    try {
      // Define the URL based on the selected status
      const url =
        selectedStatus === "All"
          ? "http://localhost:5000/ticket/"
          : `http://localhost:5000/ticket?status=${selectedStatus}`;

      const response = await axios.get(url);
      console.log("Response:", response.data); // Log the entire response
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleViewTicket = (ticketId) => {
    // Redirect to the TicketView component with the specific ticket's ID
    navigate(`/agent/ticket/${ticketId}`);
  };

  const handleStatusChange = (e) => {
    // Update the selected status when the dropdown value changes
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="agent-dashboard-main">
      <h2>Agent Dashboard</h2>
      <div className="function-div">
        <div className="search-div">
          <label htmlFor="search">Search:</label>
          <input
            style={{ margin: "1%", width: "30%", padding: "0.5%" }}
            id="search"
            value={searchExp}
            onChange={(e) => setSearchExp(e.target.value)}
          ></input>
        </div>
        <div className="filter-div">
          <label htmlFor="status">Filter by Status:</label>
          <select
            id="status"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>
                <div className="important-ticket">
                  {ticket.important ? (
                    <span className="important-ticket">Important</span>
                  ) : null}
                </div>
                {ticket.description
                  ? ticket.description.substring(0, 100)
                  : "No description available"}
              </td>
              <td>{ticket.status}</td>
              <td>{ticket.createdBy}</td>
              <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleViewTicket(ticket._id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDashboard;
