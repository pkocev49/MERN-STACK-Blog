import React, { useEffect } from "react";
import { useBlogsContext } from "../Hooks/useBlogsContext";
import BlogDetails from "../Components/BlogDetails";
const Blogs = () => {
  const { blogs, dispatch } = useBlogsContext();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs");

        if (!response.ok) {
          // Check for error response
          const errorData = await response.json();
          console.error("Error fetching blogs:", errorData);
          return;
        }

        const json = await response.json();
        console.log(json, "blogs");
        dispatch({ type: "SET_BLOGS", payload: json });
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <div>
        {blogs &&
          blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Blogs;
