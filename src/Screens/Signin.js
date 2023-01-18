import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/users/signin",
        { email, password },
        config
      );

      // if(data){
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      //   alert("user loggedin");
      //   navigate("/main");
      // }
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("user loggedin");
      navigate("/main");
      
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <>
      <h3>Login</h3>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </>
  )
}
