import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import Displayblog from "./Dispalybog";

const MBlogpage = () => {
  const newblog = useSelector((state) => state.user.blogData);
  const senddata = useSelector((state) => state.user.senddata);
  const dispatch = useDispatch();

  async function AddblogHandler(newblog) {
    const response = await fetch(
      "https://blog-app-a3319-default-rtdb.firebaseio.com/blog.json",
      {
        method: "POST",
        body: JSON.stringify(newblog),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(userActions.sendDatatoFire(false));
  }

  if (senddata) {
    AddblogHandler(newblog);
  }

  return (
    <div>
      <Displayblog></Displayblog>
    </div>
  );
};

export default MBlogpage;
