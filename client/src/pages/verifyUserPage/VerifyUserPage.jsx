import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyUserPage.scss";

const VerifyUserPage = () => {
  const [userId, setUserId] = useState(""); // State to store user input
  const [error, setError] = useState(""); // State to store any error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  // Handle login button click
  const handleLogin = async () => {
    if (!userId) {
      setError("User ID is required.");
      return;
    }

    try {
      // Make an API call to check if the user ID exists
      const response = await fetch(`http://localhost:5000/api/messages/${userId}`);
      const data = await response.json();

      if (response.ok) {
        // If user exists, navigate to the /user route with the userId as a URL parameter
        navigate(`/user/${userId}`);
      } else {
        // If user does not exist, show error message
        setError(data.error || "User not found.");
      }
    } catch (error) {
      console.error("Error checking user ID:", error);
      setError("An error occurred while verifying the user.");
    }
  };

  return (
    <div className="outer-div">
      <div className="card">
        <div className="bg"></div>
        <div className="blob"></div>
      </div>
      <div className="header-text-div">
        <div className="header-text">
          <div>Welcome</div>
        </div>
        <div className="header-subheading">Please Login</div>
      </div>
      <div className="input-field-box">
        <div className="user-input-header">Enter User ID</div>
        <input
          className="user-id-input"
          value={userId}
          onChange={handleInputChange}
        />
        <button className="user-login-button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>} {/* Error message */}
        <p>New User? <a href="/new-user">Click here</a></p> {/* Link to new user page */}
      </div>
    </div>
  );
};

export default VerifyUserPage;
