import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Main from "./mainSection/Main";
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";
import CategoryList from "./mainSection/CategoryList";
import ProductDetail from "./mainSection/ProductDetail";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const fetchUserInfo = () => {
    axios
      .get("http://localhost:8080/auth/login/userinfo", {
        withCredentials: true, // HttpOnly 쿠키 포함
      })
      .then((response) => {
        console.log("유저 정보:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("유저 정보를 가져오는 데 실패했습니다:", error);
        setUser(null);
      });
  };

  useEffect(() => {
    fetchUserInfo(); // 초기 실행

    const interval = setInterval(fetchUserInfo, 60000); // 1분 -> 현재 만료 시간 및 쿠키 삭제 시간 1분

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <NavBar user={user} />
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
