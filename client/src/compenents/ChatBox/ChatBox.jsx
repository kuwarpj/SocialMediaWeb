import React from "react";
import "./ChatBox.css";
import { useEffect } from "react";
import { useState } from "react";
import { addMessage, getMessage } from "../../api/MessageApi";
import { getUser } from "../../api/UserApi";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();
  const imageRef = useRef();
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  //Fetching data For Header of ChatBox
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUser]);

  //fetch message
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await getMessage(chat._id);

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      fetchMessage();
    }
  }, [chat]);

  const handleSend = async (e) => {
    // e.preventDefault();
    if (newMessage !== "") {
      const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
      };
      //Send Message To Socket Server
      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMessage({ ...message, receiverId });
      //send message to database
      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //receive message
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // Always Scroll Chat to Last
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePic
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePic
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    className="followerImg chatImg"
                    alt=""
                  />
                  <div className="chat-name">
                    <span className="chat-image">
                      {userData?.firstname}
                      {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "85%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text} </span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                onEnter={handleSend}
              />
              <div className="button fc-button" onClick={handleSend}>
                Send
              </div>
            </div>{" "}
            {""}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on Chat to Start Conversation
          </span>
        )}
      </div>
    </>
  );
};
export default ChatBox;
