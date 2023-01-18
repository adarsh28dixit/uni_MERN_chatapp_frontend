import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import axios from "axios";
import Conversation from "../Components/Conversation";
import Chatbox from "../Components/Chatbox";
import { io } from "socket.io-client";

export default function Main() {
  const { user } = useContext(ChatContext);
  const socket = useRef();

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/chats/userChatsById/${user?._id}`
        );
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user?._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceiveMessage(data);
    });
  }, );

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  console.log(chats);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <Chatbox
          chat={currentChat}
          currentUser={user?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receiveMessage}
        />
      </div>
    </div>
  );
}
