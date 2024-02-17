import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BlogsContextProvider } from "./Context/BlogContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { FeedbackContextProvider } from "./Context/FeedbackContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogsContextProvider>
        <FeedbackContextProvider>
          <App />
        </FeedbackContextProvider>
      </BlogsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
