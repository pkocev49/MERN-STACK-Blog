import { createContext, useReducer } from "react";

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.payload,
      };
    case "SET_SINGLE_BLOG":
      return {
        ...state,

        singleBlog: action.payload,
      };
    case "CREATE_BLOG":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
      };
    case "DELETE_BLOG":
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
      };
    default:
      return state;
  }
};

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: [],
    singleBlog: null,
  });
  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
