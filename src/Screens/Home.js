import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContext";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useContext(ChatContext);
  console.log(user);
  if (user) {
    navigate("/main");
  }
  const signinClick = () => {
    navigate("/signin");
  };

  const registerClick = () => {
    navigate("/register");
  };
  return (
    <>
      <h2>Pls signin to Banking System!</h2>
      <div className="home-buttons">
        <button type="button" className="btn btn-primary" onClick={signinClick}>
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={registerClick}
        >
          Register
        </button>
      </div>
    </>
  );
}
