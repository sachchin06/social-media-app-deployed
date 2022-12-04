import "./register.css";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import {  register } from "../../apiCalls";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password1 = useRef();
  const password2 = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1.current.value !== password2.current.value) {
        password2.current.setCustomValidity("password do not match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password1.current.value,
      }

       register(user)
       navigate('/login')
       
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">MernSocial</h3>
          <span className="registerDesc">
            Connectand with friends and the world around you on MernSocial.{" "}
          </span>
        </div>
        <div className="registerRight">
          <form onSubmit={handleSubmit} className="registerBox">
            <input
              required
              type="text"
              ref={username}
              placeholder="Username"
              className="registerInput"
            />
            <input
              required
              type="email"
              ref={email}
              placeholder="Email"
              className="registerInput"
            />
            <input
              required
              type="password"
              ref={password1}
              placeholder="Password"
              className="registerInput"
            />
            <input
              required
              type="password"
              ref={password2}
              placeholder="Password Again"
              className="registerInput"
            />
            <button className="registerButton">Sign Up</button>
            <button className="loginButton">
              <NavLink className="loginLink" to="/login">
                Log into Account
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
