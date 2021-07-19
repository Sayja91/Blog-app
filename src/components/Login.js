import React, { useState, useEffect, useReducer } from "react";

import ".//Login.css";

const emailreducer = (state, action) => {
  if (action.type === "Valid email") {
    return {
      val: state.val,
      isvalid: state.val.includes("@"),
    };
  }

  if (action.type === "email change") {
    return {
      val: action.val,
      isvalid: action.val.includes("@"),
    };
  }

  return {
    val: "",
    isvalid: false,
  };
};

const passwordreducer = (state, action) => {
  if (action.type === "Valid password") {
    return {
      val: state.val,
      isvalid: state.val.trim().length > 6,
    };
  }

  if (action.type === "password change") {
    return {
      val: action.val,
      isvalid: action.val.trim().length > 6,
    };
  }

  return {
    val: "",
    isvalid: false,
  };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailstate, emaildispatch] = useReducer(emailreducer, {
    val: " ",
    isvalid: null,
  });

  const [passwordstate, passwordispatch] = useReducer(passwordreducer, {
    val: "",
    isvalid: null,
  });

  useEffect(() => {
    setFormIsValid(emailstate.isvalid && passwordstate.isvalid);
  }, [emailstate, passwordstate]);

  const emailChangeHandler = (event) => {
    emaildispatch({ type: "email change", val: event.target.value });
  };

  const validateEmailHandler = () => {
    emaildispatch({ type: "Valid email" });
  };

  const passwordChangeHandler = (event) => {
    passwordispatch({ type: "password change", val: event.target.value });
  };

  const validatePasswordHandler = () => {
    passwordispatch({ type: "Valid password" });
  };

  const submitHandler = (event) => {
    if (formIsValid) {
      localStorage.setItem("logged in", "1");
      props.signin();
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <div
          className={`${"control"} ${
            emailstate.isvalid === false ? "invalid" : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            placeholder="Email-Id"
          />
        </div>
        <div
          className={`${"control"} ${
            passwordstate.isvalid === false ? "invalid" : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            placeholder="********"
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className="actionswet"
            style={{ background: !formIsValid ? "red" : "black" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
