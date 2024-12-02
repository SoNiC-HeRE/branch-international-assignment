import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../userPage/userCreateTicket/UserCreateTicket.scss";

import { useNavigate } from "react-router-dom";

const UserTicketView = (props) => {
  const [ticket, setTicket] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ticket/${id}`);
        setTicket(response.data);
        setEditedDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/ticket/${id}`, {
        description: editedDescription,
        status: ticket.status,
      });
      setTicket(response.data);
      setIsEditing(false);
      toast.success("Ticket Updated!");
    } catch (error) {
      toast.error("Ticket did not update.");
      console.error("Error updating ticket:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/ticket/${id}`);
      toast.success("Ticket Deleted!");
      setTimeout(() => {
        // Navigate after waiting
        navigate("/user");
      }, 2000);
      // Optionally, you can handle other actions after deletion.
    } catch (error) {
      toast.error("Ticket did not get deleted.");
      console.error("Error deleting ticket:", error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ticket-view-div">
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
      <h2 style={{ color: "#42d7f5", marginTop: "4%" }}>My Ticket</h2>
      {isEditing ? (
        <div className="update-ticket">
          <h2>Description:</h2>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <br></br>
          <button onClick={handleUpdate}>Update Ticket</button>
        </div>
      ) : (
        <>
          <div className="view-ticket">
            <div className="important-message">
              {ticket.important ? <span>important</span> : <></>}
            </div>
            <div className="combined-box">
              <div className="header-text">Description:</div>
              <p> {ticket.description}</p>
            </div>
            <div className="combined-box">
              <div className="header-text">Date Created:</div>
              <p> {new Date(ticket.dateCreated).toLocaleString()}</p>
            </div>
            <div className="combined-box">
              <div className="header-text">Status:</div>
              <p> {ticket.status}</p>
            </div>
            <div className="combined-box">
              <div className="header-text">Created By:</div>
              <p> {ticket.createdBy}</p>
            </div>

            <div className="button-div">
              <button onClick={() => setIsEditing(true)}>Edit Details</button>
              {isDeleteConfirmed ? (
                <div className="delete-div">
                  <p>Are you sure you want to delete this ticket?</p>
                  <div className="inside-div">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={() => setIsDeleteConfirmed(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setIsDeleteConfirmed(true)}>
                  Delete Ticket
                </button>
              )}
            </div>
            <div className="button-div">
              <button onClick={() => navigate("/user/dashboard/*")}>
                Dashboard
              </button>
              <br></br>
              <button onClick={() => navigate(`/user/chat/${id}`)}>
                Chat Online
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTicketView;
