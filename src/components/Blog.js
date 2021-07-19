import React, { useEffect, useState, useCallback } from "react";
import "./Blogs.css";

import { useSelector } from "react-redux";

let counter = 1;

const Blog = () => {
  const [blogs, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInput = useSelector((state) => state.user.searchInput);

  const fetchblogHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${searchInput}&token=f862a5c722cbe3f0fe117e59c63ffb7f`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedblog = data.articles.map((blogData) => {
        return {
          key: counter++,
          src: blogData.url,
          image: blogData.image,
          name: blogData.source.name,
          art: blogData.publishedAt,
          description: blogData.description,
          title: blogData.title,
        };
      });

      setBlog(transformedblog);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [searchInput]);

  useEffect(() => {
    fetchblogHandler();
  }, [fetchblogHandler]);

  return (
    <div>
      <div className="blog__page">
        <h1 className="blog__page__header">Blogs</h1>
        {isLoading ? <h1 className="loading">Loading...</h1> : ""}
        <div className="blogs">
          {blogs.length != 0 &&
            blogs.map((blog) => (
              <a
                className="blog"
                target="_blank"
                href={blog.src}
                key={counter++}
              >
                <img src={blog.image} />
                <div>
                  <h3 className="sourceName">
                    <span>{blog.name}</span>
                    <p>{blog.art}</p>
                  </h3>
                  <h1>{blog.title}</h1>
                  <p>{blog.description}</p>
                </div>
              </a>
            ))}

          {blogs.length === 0 && !isLoading && (
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

export default Blog;
