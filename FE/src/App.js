import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Main from "./mainSection/Main";
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";
import CategoryList from "./mainSection/CategoryList";
import ProductDetail from "./mainSection/ProductDetail";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      console.log("로그인 중 + jwt 토큰" + token);
    } else {
      console.log("로그인 X");
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category/:categoryId" element={<CategoryList />} />
        <Route
          path="/detail/:categoryId/:productId"
          element={<ProductDetail />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
