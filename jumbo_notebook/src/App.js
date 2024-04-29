import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./component/Navigation";
import Home from "./component/Home";
import About from "./component/About";
import Footer from "./component/Footer";
import NoteState from "./context/notes/noteState";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
