import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Login from "./Pages/Login";
import BlogForm from "./Components/BlogForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addBlog" element={<BlogForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
