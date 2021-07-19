import React from "react";
import { useState, useCallback, useEffect } from "react";

import "./addblog.css";

let counter = 0;

const Displayblog = (props) => {
  const [blogs, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchblogHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://blog-app-a3319-default-rtdb.firebaseio.com/blog.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          image: data[key].imageurl,
          content: data[key].content,
          name: data[key].name,
          art: data[key].releaseDate,
        });
      }

      setBlog(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchblogHandler();
  }, [fetchblogHandler]);

  return (
    <div>
      <div className="blog__page">
        <h1 className="blog__page__header">Persaonal Blogs</h1>
        {isLoading ? <h1 className="loading">Loading...</h1> : ""}
        <div className="blogs">
          {blogs.length != 0 &&
            blogs.map((blog) => (
              <div className="blog" target="_blank" key={counter++}>
                <img src={blog.image} />
                <div>
                  <h3 className="sourceName">
                    <span>{blog.name}</span>
                    <br></br>
                    <p>{blog.art}</p>
                  </h3>
                  <h1>{blog.title}</h1>

                  <p>{blog.content}</p>
                  <div>
                    <h6>By-{blog.name}</h6>
                  </div>
                </div>
              </div>
            ))}

          {blogs.length == 0 && !isLoading && (
            <h1 className="no__blogs">
              No blogs available 😞. Search something else to read blogs on the
              greatest platform.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Displayblog;
