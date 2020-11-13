import React, { useState } from "react";

import "./SignIn.css";
import Aux from "../../../hoc/Auxiliary";
import Axios from "axios";

const SignIn = (props) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error,setError] = useState(false);

  const signUpHandler = () => {
    props.history.push("/signup");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    Axios.post("/api/signin", { email, password })
      .then((response) => props.history.push("/"))
      .catch((error) => {
        setError(true);
        setTimeout(()=>setError(false),2000);
      });
  };

  return (
    <Aux>
      <form className="form-signin">
        {error ? <div className="signin-fail">Sign In Failed !!!</div> : null}
        <h2>SIGN IN</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="btn-sign-in"
          onClick={(event) => onSubmitHandler(event)}
        >
          Sign-In
        </button>
        <button className="btn-sign-up" onClick={signUpHandler}>
          Create A New Account
        </button>
      </form>
    </Aux>
  );
};

export default SignIn;
