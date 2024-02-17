import React, { useEffect } from "react";
import { useBlogsContext } from "../Hooks/useBlogsContext";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  const { blogs, dispatch } = useBlogsContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/blogs");

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
  const handleMoreDetailsClick = (blogId) => {
    // Use the navigate function to navigate to a specific blog page
    navigate(`/blog/${blogId}`);
  };
  return (
    <div>
      <div>
        {blogs &&
          blogs.map((blog) => (
            <div key={blog._id}>
              <h1>{blog.blogTitle}</h1>
              <button
                onClick={() => {
                  handleMoreDetailsClick(blog._id);
                }}
              >
                More Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
