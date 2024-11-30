import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import "./UserChat.scss";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000"); // Replace with your server URL

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Join the chat room as a staff
    socket.emit("joinRoom", { ticket: id, userType: "User" });

    // Listen for incoming messages
    socket.on("message", handleMessage);

    // Listen for previous chat messages
    socket.on("previousChat", handlePreviousChat);

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off("message", handleMessage);
      socket.off("previousChat", handlePreviousChat);
    };
  }, [id, messages]);

  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handlePreviousChat = (previousMessages) => {
    setMessages(previousMessages);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      // Send the message to the server
      socket.emit("chatMessage", { content: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <div className="chat-outer">
      <h1 className="chat-header">Chat Online</h1>
      <div className="chat-container">
        {messages.length > 0 ? (
          <div className="messages">
            {messages.map((message, index) => {
              const dt = new Date(message.sentAt);
              return message.sentBy === "User" ? (
                <div
                  key={index}
                  className={`message ${
                    message.sentBy === "User" ? "staff" : "user"
                  }`}
                >
                  <div className="user-chat">
                    <p className="message-content">{message.content}</p>
                    <p className="message-timestamp">{dt.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`message ${
                    message.sentBy === "User" ? "staff" : "user"
                  }`}
                >
                  <div className="user-chat">
                    <p className="message-content">{message.content}</p>
                    <p className="message-timestamp">{dt.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-messages">No messages yet</p>
        )}
      </div>
      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="chat-send-btn" type="submit">
          Send
        </button>
        <button
          className="chat-exit-btn"
          onClick={() => navigate("/user/dashboard/*")}
        >
          Exit
        </button>
      </form>
    </div>
  );
};

export default UserChat;
