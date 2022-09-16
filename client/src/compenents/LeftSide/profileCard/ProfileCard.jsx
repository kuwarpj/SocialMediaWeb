import React from "react";
import "./ProfileCard.css";
//import coverImg from '../../../img/cover.jpg'
import profileImg from "../../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeferredValue } from "react";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  {
    console.log(user);
  }
  return (
    <div className="ProfileCard">
      <div className="profileImage">
        <img
          src={
            user.coverPic
              ? serverPublic + user.coverPic
              : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
        <img
          src={
            user.profilePic
              ? serverPublic + user.profilePic
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="profileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.about ? user.about : "Write about Yourself"}</span>
      </div>
      <div className="follower">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit " }}
            to={`/profile/${user._id}`}
          >
            My Profile{" "}
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
