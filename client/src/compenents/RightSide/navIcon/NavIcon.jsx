import React from "react";
import "./NavIcon.css";
import Home from "../../../img/home.png";
import Notification from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
const NavIcon = () => {
  return (
    <div className="NavIcon">
      <div className="nav-icon">
        <Link to="../home">
          {" "}
          <img src={Home} alt="Home" />{" "}
        </Link>
        <UilSetting />
        <img src={Notification} alt="Home" />
        <Link to="../chat">
          <img src={Comment} alt="Home" />
        </Link>
      </div>
    </div>
  );
};

export default NavIcon;
