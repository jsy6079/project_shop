import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Table,
  TabPane,
  Container,
  Row,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { connectWebSocket, sendMessage } from "../components/Chatbot/websocket";
import { useUser } from "../userContext";
import axios from "axios";

import bgChat from "../assets/images/account/bg-chat.png";
import client1 from "../assets/images/client/05.jpg";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const Inquiry = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [historyMessages, setHistoryMessages] = useState([]); // 과거 메시지
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // 템플릿 코드

  const scrollNavigation = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top > 80) {
      document
        .querySelector(".shoppingbtn")
        ?.classList.replace("btn-light", "btn-primary");
      document
        .querySelector(".settingbtn")
        ?.classList.replace("btn-light", "btn-soft-primary");
      document.getElementById("topnav")?.classList.add("nav-sticky");
    } else {
      document
        .querySelector(".shoppingbtn")
        ?.classList.replace("btn-primary", "btn-light");
      document
        .querySelector(".settingbtn")
        ?.classList.replace("btn-soft-primary", "btn-light");
      document.getElementById("topnav")?.classList.remove("nav-sticky");
    }
  };

  useEffect(() => {
    document.body.classList = "";
    document.querySelectorAll("#buyButton").forEach((btn) => {
      btn.classList.add("btn-light");
      btn.classList.remove("btn-soft-primary");
    });
    document.getElementById("top-menu")?.classList.add("nav-light");

    window.addEventListener("scroll", scrollNavigation, true);

    return () => {
      window.removeEventListener("scroll", scrollNavigation, true);
    };
  }, []);

  // 템플릿 코드

  useEffect(() => {
    console.log("🎯 useEffect 실행됨");
    connectWebSocket((chatMessage) => {
      console.log("📥 관리자로부터 수신된 메시지:", chatMessage);

      // 자기가 보내는 메세지 구분 (유저 채팅 내)
      if (
        chatMessage.role === "user" &&
        chatMessage.sender === userInfo.email
      ) {
        setMessages((prev) => [...prev, chatMessage]);
      }

      // 관리자가 보내는 메세지 구분 (유저 채팅 내)
      if (chatMessage.receiver === userInfo.email) {
        setMessages((prev) => [...prev, chatMessage]);
      }
    });
  }, [userInfo?.email]);

  // 유저 대화내역 불러오기
  // useEffect(async () => {
  //   try {
  //     const res = await axios.get(ApiUrl + "/api/chat/detail", {
  //       params: { email: userInfo.email },
  //       withCredentials: true,
  //     });

  //     setHistoryMessages(res.data);
  //   } catch (err) {
  //     console.error("유저 메시지 불러오기 실패:", err);
  //   }
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(ApiUrl + "/api/chat/detail", {
  //         params: { email: userInfo.email },
  //         withCredentials: true,
  //       });

  //       setHistoryMessages(res.data);
  //     } catch (err) {
  //       console.error("유저 메시지 불러오기 실패:", err);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(ApiUrl + "/api/chat/detail", {
          params: { email: userInfo.email },
          withCredentials: true,
        });
        setHistoryMessages(res.data);
      } catch (err) {
        console.error("유저 메시지 불러오기 실패:", err);
      }
    };

    if (userInfo?.email) {
      fetchMessages();
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const chatMessage = {
      sender: userInfo.email,
      receiver: "admin",
      chatUserMessagecontent: input,
      role: "user",
      imgUrl: userInfo.imgUrl,
    };

    sendMessage(chatMessage);

    try {
      await axios.post(
        ApiUrl + "/api/chat/save",
        {
          sender: userInfo.email,
          chatUserMessagecontent: input,
          role: "user",
        },
        { withCredentials: true }
      );
      console.log("✅ 저장 성공!");
    } catch (err) {
      console.error("❌ 메시지 저장 실패:", err);
    }

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 시간 데이터 조정
  const formatDate = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const allMessages = [...historyMessages, ...messages];

  return (
    <>
      <TabPane className="fade bg-white show p-4" tabId="7">
        <>
          <div>
            <h5>🛍️ 문의사항 채팅</h5>
            <p className="text-muted mb-0">
              문의사항이 있다면 이곳에 남겨주세요. 관리자가 확인 후
              답변해드립니다.
            </p>
          </div>

          <Container className="mt-lg-3">
            <Row>
              <div>
                <div className="card chat chat-person border-0 shadow rounded mt-4">
                  <SimpleBar
                    className="p-4 list-unstyled mb-0 chat"
                    style={{
                      background: `url(${bgChat}) center center`,
                      maxHeight: "500px",
                    }}
                  >
                    <ul className="list-unstyled mb-0">
                      {allMessages.map((msg, index) => (
                        <li
                          key={index}
                          className={msg.role !== "admin" ? "chat-right" : ""}
                        >
                          <div className="d-inline-block">
                            <div className="d-flex chat-type mb-3">
                              <div
                                className={`position-relative ${
                                  msg.role === "admin" ? "chat-user-image" : ""
                                }`}
                              >
                                <img
                                  src={
                                    msg.role === "admin"
                                      ? client1
                                      : userInfo.imgUrl
                                  }
                                  className="avatar avatar-md-sm rounded-circle border shadow"
                                  alt=""
                                />
                              </div>

                              <div
                                className="chat-msg"
                                style={{ maxHeight: "500px" }}
                              >
                                <p className="text-muted small msg px-3 py-2 bg-light rounded mb-1">
                                  {msg.chatUserMessagecontent}
                                </p>
                                <small className="text-muted msg-time">
                                  <i className="uil uil-clock-nine me-1"></i>
                                  {formatDate(msg.chatUserMessageTime)}
                                </small>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      <div ref={messagesEndRef} />
                    </ul>
                  </SimpleBar>
                  <div className="p-2 rounded-bottom shadow">
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="관리자에게 보낼 메시지를 입력하세요"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </div>
                      <div className="col-auto">
                        <button
                          onClick={handleSend}
                          className="btn btn-icon btn-primary"
                        >
                          <i className="uil uil-message"></i>
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </>
      </TabPane>
    </>
  );
};

export default Inquiry;
