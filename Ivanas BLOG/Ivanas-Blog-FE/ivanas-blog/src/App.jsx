import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Login from "./Pages/Login";
import BlogForm from "./Components/BlogForm";
import BlogDetails from "./Components/BlogDetails";
import { useAuthContext } from "./Hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/addBlog"
              element={user ? <BlogForm /> : <Navigate to="/" />}
            />
            <Route path="/blog/:blogId" element={<BlogDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
