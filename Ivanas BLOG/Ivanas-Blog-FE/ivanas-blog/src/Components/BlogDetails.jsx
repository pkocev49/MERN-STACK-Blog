import React, { useEffect } from "react";
import { useBlogsContext } from "../Hooks/useBlogsContext";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const BlogDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { singleBlog, dispatch } = useBlogsContext();
  const { blogId } = useParams();
  console.log(blogId, "blogId");
  useEffect(() => {
    const fetchBlogs = async () => {
      // Check if blogId is undefined
      if (!blogId) {
        console.error("BlogId is undefined");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:4000/api/blogs/${blogId}`
        );

        if (!response.ok) {
          // Check for error response
          const errorData = await response.json();
          console.error("Error fetching blogs:", errorData);
          return;
        }

        const json = await response.json();

        dispatch({ type: "SET_SINGLE_BLOG", payload: json });
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [blogId, dispatch]);
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:4000/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
    navigate("/blogs");
  };
  return (
    <div>
      <div>
        {singleBlog && ( // Check if singleBlog exists
          <div key={singleBlog._id}>
            <h1>{singleBlog.blogTitle}</h1>
            <p>{singleBlog.blogDescription}</p>
            {user && (
              <>
                <button onClick={handleDelete}>Delete</button>
                <button>Update</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
