// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./components/Layout/ScrollToTop";
// import NavBar from "./common/NavBar";
// import Footer from "./common/Footer";
// import Main from "./mainSection/Main";
// import "./assets/css/materialdesignicons.min.css";
// import "./Apps.scss";
// import CategoryList from "./mainSection/CategoryList";
// import ProductDetail from "./mainSection/ProductDetail";
// import Mypage from "./myPage/Mypage";
// import ProtectedRoute from "./ProtectedRoute";
// import ProductPayment from "./mainSection/ProductPayment";
// import Chatbot from "./components/Chatbot/Chatbot";

// // Admin
// import AdminMain from "./admin/Main";

// import "react-loading-skeleton/dist/skeleton.css";
// import { UserProvider } from "./userContext"; // 전역 상태 관리

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <UserProvider>
//         <NavBar />
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/category/:categoryId" element={<CategoryList />} />
//           <Route
//             path="/detail/:categoryId/:productId"
//             element={<ProductDetail />}
//           />
//           {/* 로그인 해야 접근 가능 */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/user/myinfo" element={<Mypage />}></Route>
//             <Route
//               path="/payment/:productId"
//               element={<ProductPayment />}
//             ></Route>
//           </Route>
//           {/* */}
//         </Routes>
//         <Chatbot />
//         <Footer />

//         {/* 관리자 라우터 */}
//         <Route path="/admin/*" element={<AdminMain />} />
//       </UserProvider>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Main from "./mainSection/Main";
import CategoryList from "./mainSection/CategoryList";
import ProductDetail from "./mainSection/ProductDetail";
import Mypage from "./myPage/Mypage";
import ProtectedRoute from "./ProtectedRoute";
import ProductPayment from "./mainSection/ProductPayment";
import Chatbot from "./components/Chatbot/Chatbot";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ReviewPage from "./admin/ReviewPage";
import ChatPage from "./admin/ChatPage";
import InspectionPage from "./admin/InspectionPage";
import { UserProvider } from "./userContext";
import AdminProtectedRoute from "./AdminProtectedRoute";

import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<InspectionPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="review" element={<ReviewPage />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route
                    path="/category/:categoryId"
                    element={<CategoryList />}
                  />
                  <Route
                    path="/detail/:categoryId/:productId"
                    element={<ProductDetail />}
                  />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/user/myinfo" element={<Mypage />} />
                    <Route
                      path="/payment/:productId"
                      element={<ProductPayment />}
                    />
                  </Route>
                </Routes>
                <Chatbot />
                <Footer />
              </>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
