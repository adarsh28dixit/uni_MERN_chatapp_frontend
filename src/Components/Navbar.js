import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContext";

export default function Navbar() {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          iChat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {/* <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a> */}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {user ? (
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
                onClick={logOut}
              >
                {/* {user.name.split(" ")[0]} */}
                Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            )}
            {/* <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> */}
          </form>
        </div>
      </nav>
    </>
  );
}
