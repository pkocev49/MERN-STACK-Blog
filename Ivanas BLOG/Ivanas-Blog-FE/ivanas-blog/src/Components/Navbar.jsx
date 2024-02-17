import React from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <header
        className="flex justify-between items-center  px-4 
    bg-myBlue text-white z-50  w-full h-20"
      >
        <Link to="/">
          <h1 className="px-4 cursor-pointer  text-white font-bold text-[22px]  hover:scale-110 capitalize duration-200">
            Psychologycornerwithivv
          </h1>
        </Link>
        <div className="hidden md:flex">
          <Link
            className="px-4 cursor-pointer  text-white font-medium text-1xl  hover:scale-110 capitalize duration-200"
            to="/blogs"
          >
            Blog
          </Link>
          <Link
            className="px-4 cursor-pointer  text-white font-medium text-1xl  hover:scale-110 capitalize duration-200"
            to="/feedback"
          >
            Leave a Feedback
          </Link>

          {user && (
            <>
              <Link
                className="px-4 cursor-pointer  text-white font-medium text-1xl  hover:scale-110 capitalize duration-200"
                to="/addBlog"
              >
                Add Blog
              </Link>
            </>
          )}
        </div>
      </header>
      <div></div>
    </div>
  );
};

export default Navbar;
