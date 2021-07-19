import React, { useRef } from "react";
import Modal from "../UI/modal";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

import "./newblog.css";

function Addblog(props) {
  const titleRef = useRef("");
  const content = useRef("");
  const releaseDateRef = useRef("");
  const imageurl = useRef("");
  const name = useRef("");

  const dispatch = useDispatch();

  const onclickHandler = () => {
    dispatch(userActions.setModalstate(false));
  };

  function submitHandler(event) {
    event.preventDefault();

    const blog = {
      title: titleRef.current.value,
      name: name.current.value,
      content: content.current.value,
      imageurl: imageurl.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    dispatch(userActions.setBlogData(blog));
    dispatch(userActions.sendDatatoFire(true));
    dispatch(userActions.setModalstate(false));
  }

  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className="control">
          <label htmlFor="opening-text">Content</label>
          <textarea rows="5" id="opening-text" ref={content}></textarea>
        </div>
        <div className="control">
          <label htmlFor="date">Release Date</label>
          <input type="date" id="date" ref={releaseDateRef} />
        </div>
        <div className="control">
          <label htmlFor="image">Image Url</label>
          <input type="text" id="image" ref={imageurl} />
        </div>
        <div className="control">
          <label htmlFor="name">Written By</label>
          <input type="text" id="name" ref={name} />
        </div>
        <button type="submit" className="actions">
          Add Blog
        </button>

        <button onClick={onclickHandler} className="actionclose">
          Close
        </button>
      </form>
    </Modal>
  );
}

export default Addblog;
