import React from "react";
import "./UserInfo.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModals from "./ProfileModals";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from "../../api/UserApi";
import { logout } from "../../actions/AuthAction";
const UserInfo = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="UserInfo">
      <div className="user-head">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModals
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="user-info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="user-info">
        <span>
          <b>Live In </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="user-info">
        <span>
          <b>Works At </b>
        </span>
        <span>{profileUser.workAt}</span>
      </div>
      <button className="button lg-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
