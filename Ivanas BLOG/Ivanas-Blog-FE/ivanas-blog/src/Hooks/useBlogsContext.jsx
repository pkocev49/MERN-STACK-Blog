import { useContext } from "react";
import { BlogContext } from "../Context/BlogContext";

export const useBlogsContext = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw Error("useBlogsContext must be used inside an BlogsContextProvider");
  }
  return context;
};
