import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Conversation({ data, currentUser, online }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/getUserById/${userId}`)
        setUserData(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  console.log(userData)
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          {/* <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          /> */}
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.name} </span>
            {/* <span>adarsh dixit</span> */}
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}
