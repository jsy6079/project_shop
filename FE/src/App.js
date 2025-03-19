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
import Mypage from "./myPage/Mypage";
import ProtectedRoute from "./ProtectedRoute";
import ProductPayment from "./mainSection/ProductPayment";
import "react-loading-skeleton/dist/skeleton.css";
import { UserProvider } from "./userContext"; // 전역 상태 관리

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route
            path="/detail/:categoryId/:productId"
            element={<ProductDetail />}
          />
          {/* 로그인 해야 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user/myinfo" element={<Mypage />}></Route>/
          </Route>
          {/* */}
          <Route
            path="/payment/:productId"
            element={<ProductPayment />}
          ></Route>
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
