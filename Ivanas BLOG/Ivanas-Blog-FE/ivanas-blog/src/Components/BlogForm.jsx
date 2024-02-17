import React, { useState } from "react";
import { useBlogsContext } from "../Hooks/useBlogsContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const BlogForm = () => {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const blog = { blogTitle, blogDescription };
    const response = await fetch("http://localhost:4000/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json, "createdBlog:");
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setBlogTitle("");
      setBlogDescription("");
      setError(null);
      setEmptyFields([]);
      navigate("/blogs");
      dispatch({ type: "CREATE_BLOG", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add A New Blog</h3>
      <label>Blog Title</label>
      <input
        type="text"
        onChange={(e) => {
          setBlogTitle(e.target.value);
        }}
        value={blogTitle}
      />
      <label>Blog Description</label>
      <input
        type="text"
        onChange={(e) => {
          setBlogDescription(e.target.value);
        }}
        value={blogDescription}
      />
      <button>Add Blog</button>
    </form>
  );
};

export default BlogForm;
