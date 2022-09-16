import React, { useEffect } from "react";
import { useState } from "react";
import LogoSearch from "../../compenents/LeftSide/Search/LogoSearch";
import { useSelector } from "react-redux";
import "./Chat.css";
import { userChats } from "../../api/ChatApi";
import Conversation from "../../compenents/Conversation/Conversation";

import NavIcon from "../../compenents/RightSide/navIcon/NavIcon";
import ChatBox from "../../compenents/ChatBox/ChatBox";

import io from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMesssage] = useState(null);
  const socket = useRef();

  const { user } = useSelector((state) => state.AuthReducer.authData);

  //Get chat in chat Section

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  //Connect to Socket.io

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Receive message from socket server

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMesssage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <div style={{ width: "15rem", alignSelf: "flex-end" }}>
          <NavIcon />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
