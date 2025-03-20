import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

// 1️⃣ Context 생성
const UserContext = createContext();

// 2️⃣ Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // 전역 상태 (유저 정보)
  const [loading, setLoading] = useState(true); // 로딩 상태
  const intervalRef = useRef(null); // 주기적인 업데이트 관리

  // 3️⃣ 최신 유저 정보 가져오기
  const fetchUserInfo = () => {
    axios
      .get("http://localhost:8080/auth/login/userinfo", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("🔄 유저 정보 갱신:", response.data);
        setUserInfo(response.data); // 전역 상태 업데이트
      })
      .catch((error) => {
        console.error("유저 정보를 가져오는 데 실패했습니다:", error);
        setUserInfo(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 4️⃣ 컴포넌트 마운트 시 실행
  useEffect(() => {
    fetchUserInfo(); // 초기 실행

    if (!intervalRef.current) {
      // 기존 인터벌이 없을 때만 실행
      intervalRef.current = setInterval(fetchUserInfo, 300000); // 5분마다 갱신
      console.log("⏰ 5분마다 유저 정보 갱신");
    }

    return () => clearInterval(intervalRef.current); // 언마운트 시 인터벌 제거
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, fetchUserInfo, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
