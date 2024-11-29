import React, { useEffect, useState } from "react";
import socket from "../../socket";
import "./AgentPage.scss";

const AgentPage = () => {
  const [messages, setMessages] = useState([]); // All messages
  const [selectedMessage, setSelectedMessage] = useState(null); // Current conversation
  const [agentResponse, setAgentResponse] = useState(""); // Agent's response

  useEffect(() => {
    // Fetch all messages
    fetch("http://localhost:5000/api/messages")
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

      // Update the selected message if it matches the updated message
      if (selectedMessage && selectedMessage._id === updatedMessage._id) {
        setSelectedMessage(updatedMessage);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageUpdated");
    };
  }, [selectedMessage]);

  const handleSendMessage = () => {
    if (!selectedMessage || !agentResponse.trim()) return;

    fetch(`http://localhost:5000/api/messages/${selectedMessage._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentResponse }),
    })
      .then((res) => res.json())
      .then((updatedMessage) => {
        // Optimistically update the selected message locally
        setSelectedMessage(updatedMessage);
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === updatedMessage._id ? updatedMessage : msg
          )
        );
        setAgentResponse(""); // Clear the input field
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  return (
    <div className="agent-page">
      <div className="message-list">
        <h2 className="message-list-header">Customer Messages</h2>
        {messages.length === 0 ? (
          <p>No messages available.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message-item ${
                selectedMessage?._id === msg._id ? "selected" : ""
              } ${
                !msg.agentResponse || msg.agentResponse.length === 0
                  ? "unread"
                  : "read"
              }`}
              onClick={() => setSelectedMessage(msg)}
            >
              <p>
                <strong>Customer ID: {msg["User ID"]}</strong>
              </p>
              <p>{msg["Message Body"]}</p>
              {/* Display only the most recent agent response */}
              {msg.agentResponse && msg.agentResponse.length > 0 && (
                <p>
                  <strong>Agent:</strong>{" "}
                  {msg.agentResponse[msg.agentResponse.length - 1]}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {selectedMessage && (
        <div className="chat-box">
          <div className="chat-messages-div">
            {/* Display conversation */}

              {selectedMessage["Message Body"]&& selectedMessage["Message Body"].map((message,idx)=>(
                <div key={idx} className="chat-bubble customer-message"><p>{message}</p></div>
              ))}

            {selectedMessage.agentResponse &&
              selectedMessage.agentResponse.map((response, index) => (
                <div key={index} className="chat-bubble agent-message">
                  <p>{response}</p>
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
