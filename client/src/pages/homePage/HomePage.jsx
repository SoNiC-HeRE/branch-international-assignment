import React, { useState } from "react";
import "./HomePage.scss";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineInterpreterMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  }

  return (
    <div className="outer-div">
      <div className="card">
        <div className="bg"></div>
        <div className="blob"></div>
      </div>
      <div className="header-text-div">
        <div className="header-text">
          <div>Bolt</div>
        </div>
        <div className="header-subheading">Your one stop solution</div>
      </div>
      <div className="selector-div">
        <div>
          <FaUserGroup
            size={180}
            className="user-icon"
            onClick={()=>handleClick('/verify/user')}
          />
        </div>
        <div>
          <MdOutlineInterpreterMode
            size={180}
            className="agent-icon"
            onClick={()=>handleClick('/agent')}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
