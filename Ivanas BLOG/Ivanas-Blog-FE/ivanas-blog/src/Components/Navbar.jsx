import React from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <header>
        <div>
          <Link to="/">
            <h1>Psychologycornerwithivv</h1>
          </Link>
          <div>
            <Link to="/blogs">Blog</Link>
            {user ? (
              <>
                <Link to="/addBlog">Add Blog</Link>
                {/* Add a logout functionality here if needed */}
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
