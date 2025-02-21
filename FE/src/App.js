import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Main from "./mainSection/Main";
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
