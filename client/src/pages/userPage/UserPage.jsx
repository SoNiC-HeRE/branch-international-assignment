import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import socket from "../../socket";
import "./UserPage.scss";

const UserPage = () => {
  const { userId } = useParams(); // Get userId from the URL parameter
  const [messages, setMessages] = useState([]); // All messages
  const [userResponse, setUserResponse] = useState(""); // Agent's response

  useEffect(() => {
    // Fetch messages for the connected user based on userId
    fetch(`http://localhost:5000/api/messages/${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for real-time updates
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("messageUpdated", (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageUpdated");
    };
  }, [userId]);

  const handleSendMessage = () => {
    if (!userResponse.trim()) return; // Check if the user's response is not empty

    // Find the message object that corresponds to the logged-in user
    const messageToUpdate = messages.find(
      (msg) => msg["User ID"] === Number(userId)
    );

    if (messageToUpdate) {
      // Update the message in the backend by sending the new user message
      fetch(
        `http://localhost:5000/api/messages/updateMessage/${messageToUpdate._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: userResponse }), // Send only the new user message
        }
      )
        .then((res) => res.json())
        .then((updatedMessage) => {
          // Update the state to reflect the changes
          setMessages((prev) =>
            prev.map((msg) =>
              msg._id === updatedMessage._id ? updatedMessage : msg
            )
          );
          setUserResponse(""); // Clear the input field after sending the message
        })
        .catch((err) => console.error("Error sending message:", err));
    } else {
      console.error("Message not found for the given User ID.");
    }
  };

  return (
    <div className="user-page">
      <div className="chat-box">
        <div className="chat-messages-div">
          {messages.map((msg, index) => (
            <div key={index} className="container">
              {msg["Message Body"] &&
                msg["Message Body"].map((message, idx) => (
                  <div key={idx} className="chat-bubble customer-message">
                    <p>{message}</p>
                  </div>
                ))}

              {msg.agentResponse &&
                msg.agentResponse.map((response, idx) => (
                  <div key={idx} className="chat-bubble agent-message">
                    <p>{response}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="response-box">
          <div className="group">
            <textarea
              className="input"
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
            />
          </div>
          <button onClick={handleSendMessage}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
