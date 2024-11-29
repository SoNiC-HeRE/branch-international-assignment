import React, { useEffect, useState } from "react";
import socket from "../../socket"; // Import Socket.IO client
import "./AgentPage.scss";

const AgentPage = () => {
  const [messages, setMessages] = useState([]); // All messages
  const [selectedMessage, setSelectedMessage] = useState(null); // Current message being replied to
  const [agentResponse, setAgentResponse] = useState(""); // Agent's response

  // Fetch messages on load and set up socket listeners
  useEffect(() => {
    // Fetch all messages
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for message updates
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
  }, []);

  // Send agent's response
  const handleSendMessage = () => {
    if (!selectedMessage || !agentResponse.trim()) return;

    // Update message in the database
    fetch(`http://localhost:5000/api/messages/${selectedMessage._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentResponse }),
    })
      .then((res) => res.json())
      .then((updatedMessage) => {
        socket.emit("updateMessage", updatedMessage); // Notify other agents
        setAgentResponse(""); // Clear input
        setSelectedMessage(null); // Clear selected message
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  return (
    <div className="agent-page">
      <div className="message-list">
        <h2>Customer Messages</h2>
        {messages.length === 0 ? (
          <p>No messages available.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message-item ${
                selectedMessage?._id === msg._id ? "selected" : ""
              }`}
              onClick={() => setSelectedMessage(msg)}
            >
              <p>
                <strong>Customer:</strong> {msg["Message Body"]}
              </p>
              {msg.agentResponse && (
                <p>
                  <strong>Agent:</strong> {msg.agentResponse}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {selectedMessage && (
        <div className="chat-box">
          <div className="chat-messages-div">
            {messages
              .filter((msg) => msg["User ID"] === selectedMessage["User ID"])
              .map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    msg.agentResponse
                      ? "agent-message"
                      : "customer-message"
                  }`}
                >
                  <p>{msg.agentResponse || msg["Message Body"]}</p>
                </div>
              ))}
          </div>
          <div className="response-box">
            <div className="group">
              <textarea
                className="input"
                type="text"
                value={agentResponse}
                onChange={(e) => setAgentResponse(e.target.value)}
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
      )}
    </div>
  );
};

export default AgentPage;
