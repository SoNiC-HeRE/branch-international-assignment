// components/Admin/TicketView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './AgentTicketView.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AgentTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("Open");
  const { id } = useParams(); // Use useParams hook to get parameters from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ticket/${id}`,
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]); // Include id in the dependency array

  const handleStatusChange = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/ticket/${id}`,
        {
          status: newStatus,
          description:ticket.description
        },
      );
      setTicket(response.data);
      toast.success("Ticket Status updated!");
    } catch (error) {
      toast.error("Ticket did not change.");
      console.error("Error updating status:", error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 style={{ color: '#42d7f5', marginTop: '4%' }}>Ticket</h2>
      <div className="view-ticket">
      <div style={{textAlign:'left', margin:'1%'}}>
                  {ticket.important? <span>important</span>:<></>}
      </div>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Created By: {ticket.createdBy}</p>
      <p>Date Created: {new Date(ticket.dateCreated).toLocaleString()}</p>
      {/* Update Status */}
      <label>
        Update Status:
        <select style={{margin:'2%'}}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button onClick={handleStatusChange}>Update Status</button>
      </label>
      <button onClick={()=>navigate(`/admin/chat/${id}`)}>Solve Issue</button>
      <button onClick={()=>navigate('/admin/dashboard')}>Dashboard</button>

      </div>
    </div>
  );
};

export default AgentTicketView;