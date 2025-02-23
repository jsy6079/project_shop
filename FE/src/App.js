import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Main from "./mainSection/Main";
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";
import CategoryList from "./mainSection/CategoryList";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category/:categoryId" element={<CategoryList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
