import React from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

import "./home.css";

const Homepage = () => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const dispatch = useDispatch();
  const login = () => {
    dispatch(userActions.setSignedIn(true));
  };

  const getrname = (Username) => {
    dispatch(userActions.setUserData(Username));
  };

  if (localStorage.getItem("logged in") === "1") {
    dispatch(userActions.setSignedIn(true));
  }

  const say = `
Come enjoy 
READING
with Us!!
`;

  return (
    <div className="home__page">
      {!isSignedIn && (
        <div>
          <div className="home__page">
            <div className="login__message">
              <h2> 📚 </h2>
              <h1>{say}</h1>
              <p>
                `We provide high quality online resource for reading blogs. Just
                sign up and start reading some quality blogs.`
              </p>
            </div>
          </div>
          <Login signin={login} getname={getrname} />
        </div>
      )}
    </div>
  );
};

export default Homepage;
