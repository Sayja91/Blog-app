import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import "./navbar.css";

const Navbar = () => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const getblog = useSelector((state) => state.user.blogpage);
  const [inputValue, setInputValue] = useState("tech");
  const dispatch = useDispatch();
  // const myame = useSelector((state) => state.user.Username);
  // const myname = myame;
  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const LogoutHandler = () => {
    localStorage.removeItem("logged in");
    dispatch(userActions.setSignedIn(false));
    dispatch(userActions.getBlogpage(false));
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(userActions.setInput(inputValue));
    console.log("fhfhgfhgf");
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(userActions.setInput(inputValue));
    }
  };

  const onclickHandler = () => {
    dispatch(userActions.setModalstate(true));
  };

  const getblogpageHandler = () => {
    dispatch(userActions.getBlogpage(true));
  };

  const ongetclickHandler = () => {
    dispatch(userActions.getBlogpage(false));
  };
  const text = `
Personal Blog page-link  `;

  return (
    <div className="navbar">
      <h1 className="navbar__header">Blogerrs World..... 💬</h1>
      {isSignedIn && !getblog && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={changeHandler}
            onKeyPress={enterHandler}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}
      {isSignedIn && getblog && (
        <h1 className="navbar__headers">
          <span>What Users Say!! 📜</span>
        </h1>
      )}
      {/* {isSignedIn && getblog && <p>Accounts of people</p>} */}
      {isSignedIn ? (
        <div className="navbar__user__data">
          {!getblog && (
            <h1 className="signedIn" onClick={getblogpageHandler}>
              <span>{text}</span>
              📃
            </h1>
          )}
          {getblog && (
            <button className="logout__buttonsss" onClick={ongetclickHandler}>
              Back to Search 🔙
            </button>
          )}
          <button className="logout__button" onClick={onclickHandler}>
            ADD BLOG 📑
          </button>

          <button className="logout__button" onClick={LogoutHandler}>
            Logout 😦
          </button>
        </div>
      ) : (
        <h1 className="notSignedIn">User not available 😞</h1>
      )}
    </div>
  );
};

export default Navbar;
