import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BlogsContextProvider } from "./Context/BlogContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogsContextProvider>
        <App />
      </BlogsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
