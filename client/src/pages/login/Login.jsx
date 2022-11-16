import { useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import {loginCall} from "../../apiCalls";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MernSocial</h3>
          <span className="loginDesc">
            Connectand with friends and the world around you on MernSocial.{" "}
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              minLength={4}
              required
              placeholder="Password"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress 
                style={{'color': 'white'}}
                size="25px"
                />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisteregisterButton" disabled={isFetching}>
            {isFetching ? (
                <CircularProgress 
                style={{'color': 'white'}}
                size="25px"
                />
              ) : (
                <NavLink className="registerLink" to="/register">Create a New Account</NavLink>
              )}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
