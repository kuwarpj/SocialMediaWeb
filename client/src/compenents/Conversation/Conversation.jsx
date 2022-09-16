import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../api/UserApi";
const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          <img
            src={
              userData?.profilePic
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePic
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            className="followerImg"
            style={{ width: "50px", height: "50px" }}
            alt=""
          />
          <div className="chat-name">
            <span>
              {userData?.firstname}
              {userData?.lastname}
            </span>

            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
              {online ? <div className="online-dot"></div> : ""}
            </span>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Conversation;
