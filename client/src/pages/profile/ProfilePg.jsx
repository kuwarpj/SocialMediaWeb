import React from "react";
import ProfileCard from "../../compenents/LeftSide/profileCard/ProfileCard";
import Posts from "../../compenents/MiddleSide/posts/Posts";
import PostSec from "../../compenents/MiddleSide/PostSec/PostSec";
import ProfileDetails from "../../compenents/Profilepg/ProfileDetails";
import NavIcon from "../../compenents/RightSide/navIcon/NavIcon";
import RightSec from "../../compenents/RightSide/rightSec/RightSec";
import Trend from "../../compenents/RightSide/TrendingSec/Trend";
import "./ProfilePg.css";
const ProfilePg = () => {
  return (
    <div className="ProfilePg">
      <ProfileDetails />
      <div className="profile-center">
        <ProfileCard location="profilePage" />
        <PostSec />
      </div>
      <div className="profile-right">
        <RightSec />
      </div>
    </div>
  );
};

export default ProfilePg;
