import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Container,
  Row,
  Col,
  Progress,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { connectWebSocket, sendMessage } from "../components/Chatbot/websocket";
import axios from "axios";

import bgChat from "../assets/images/account/bg-chat.png";
import client1 from "../assets/images/client/05.jpg";
import client2 from "../assets/images/client/02.jpg";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const ChatPage = () => {
  const [historyMessages, setHistoryMessages] = useState([]); // 과거 메시지
  const [messages, setMessages] = useState([]); // 실시간 메세지
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [userList, setUserList] = useState([]); // 유저 리스트
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 유저

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
    connectWebSocket((chatMessage) => {
      console.log("📥 수신:", chatMessage);

      // 유저가 보낸 메시지면 리스트에 없을 경우에만 추가
      if (chatMessage.role === "user") {
        setUserList((prevUserList) => {
          const exists = prevUserList.some(
            (user) => user.email === chatMessage.sender
          );
          if (exists) return prevUserList;

          const newUser = {
            email: chatMessage.sender,
            name: chatMessage.sender,
            lastMessage: chatMessage.chatUserMessagecontent,
            profileImage: chatMessage.imgUrl,
            lastTime: chatMessage.chatUserMessageTime,
          };

          return [...prevUserList, newUser];
        });
      }

      setMessages((prev) => [...prev, chatMessage]);
    });
  }, []);

  // 메세지 보내기 전송 함수
  const handleSend = async () => {
    if (!selectedUser) {
      alert("대화할 유저가 없습니다.");
      return;
    }

    if (input.trim() === "") return;

    const chatMessage = {
      sender: "admin",
      receiver: selectedUser.email,
      chatUserMessagecontent: input,
      role: "admin",
      imgUrl: client1,
    };

    sendMessage(chatMessage);

    // + 동시에 관리자 백엔드 저장
    try {
      await axios.post(
        ApiUrl + "/api/chat/save",
        {
          sender: selectedUser.email,
          receiver: "admin",
          chatUserMessagecontent: input,
          role: "admin",
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("메시지 저장 실패:", err);
    }

    setInput("");
  };

  // 관리자에게 보낸 유저 메세지 목록
  useEffect(() => {
    const fetchInitialUserList = async () => {
      try {
        const res = await axios.get(ApiUrl + "/api/chat/lastMessage", {
          withCredentials: true,
        });

        const formatted = res.data.map((msg) => ({
          email: msg.sender,
          name: msg.sender,
          lastMessage: msg.chatUserMessagecontent,
          profileImage: msg.imgUrl,
          lastTime: msg.chatUserMessageTime,
        }));

        setUserList(formatted);
      } catch (err) {
        console.error(
          "관리자에게 보낸 유저 메세지 목록 초기 불러오기 실패:",
          err
        );
      }
    };

    fetchInitialUserList();
  }, []);

  // 유저 선택
  const handleSelectUser = async (user) => {
    try {
      setSelectedUser(user);
      setMessages([]);
      const res = await axios.get(ApiUrl + "/api/chat/detail", {
        params: { email: user.email },
        withCredentials: true,
      });

      setHistoryMessages(res.data);
    } catch (err) {
      console.error("유저 메시지 불러오기 실패:", err);
    }
  };

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

  // 새 메세지 시 자동으로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const allMessages = [...historyMessages, ...messages];

  return (
    <>
      <div className="border-bottom pb-4">
        <h5>🛍️ 채팅 관리</h5>
        <p className="text-muted mb-0">
          유저의 문의사항을 실시간 채팅으로 관리합니다.
        </p>
      </div>
      <Container className="mt-lg-3">
        <Row>
          <div>
            <div className="card border-0 rounded shadow">
              <SimpleBar
                className="p-2 chat chat-list"
                data-simplebar
                style={{ maxHeight: "360px" }}
              >
                {userList.map((user) => (
                  <Link
                    key={user.email}
                    to="#"
                    className="d-flex chat-list active p-2 rounded position-relative"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="position-relative">
                      <img
                        src={user.profileImage}
                        className="avatar avatar-md-sm rounded-circle border shadow"
                        alt=""
                      />
                    </div>
                    <div className="overflow-hidden flex-1 ms-2">
                      <div className="d-flex justify-content-between">
                        <h6 className="text-dark mb-0 d-block">{user.name}</h6>
                        <small className="text-muted">
                          {formatDate(user.lastTime)}
                        </small>
                      </div>
                      <div className="text-muted text-truncate">
                        {user.lastMessage}
                      </div>
                    </div>
                  </Link>
                ))}
              </SimpleBar>
            </div>

            <div className="card chat chat-person border-0 shadow rounded mt-4">
              {/* <div className="d-flex justify-content-between border-bottom p-4">
                <div className="d-flex">
                  <img
                    src={client2}
                    className="avatar avatar-md-sm rounded-circle border shadow"
                    alt=""
                  />
                  <div className="overflow-hidden ms-3">
                    <Link
                      to="#"
                      className="text-dark mb-0 h6 d-block text-truncate"
                    >
                      Cristino Murphy
                    </Link>
                    <small className="text-muted">
                      <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>{" "}
                      Online
                    </small>
                  </div>
                </div>

                <ul className="list-unstyled mb-0">
                  <UncontrolledDropdown className="dropdown-primary list-inline-item">
                    <DropdownToggle
                      type="button"
                      className="btn btn-icon btn-pills btn-soft-primary p-0"
                      tag="a"
                    >
                      <i className="uil uil-ellipsis-h "></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3">
                      <DropdownItem className="text-dark" href="#">
                        <span className="mb-0 d-inline-block me-1">
                          <i className="uil uil-user align-middle h6"></i>
                        </span>{" "}
                        Profile
                      </DropdownItem>
                      <DropdownItem className="text-dark" href="#">
                        <span className="mb-0 d-inline-block me-1">
                          <i className="uil uil-setting align-middle h6"></i>
                        </span>{" "}
                        Profile Settings
                      </DropdownItem>
                      <DropdownItem className="text-dark" href="#">
                        <span className="mb-0 d-inline-block me-1">
                          <i className="uil uil-trash align-middle h6"></i>
                        </span>{" "}
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ul>
              </div> */}

              <SimpleBar
                className="p-4 list-unstyled mb-0 chat"
                style={{
                  background: `url(${bgChat}) center center`,
                  maxHeight: "500px",
                }}
              >
                {allMessages
                  .filter(
                    (msg) =>
                      selectedUser &&
                      (msg.sender === selectedUser.email ||
                        msg.receiver === selectedUser.email)
                  )
                  .map((msg, index) => (
                    <li
                      key={index}
                      className={msg.role === "admin" ? "chat-right" : ""}
                    >
                      <div className="d-inline-block">
                        <div className="d-flex chat-type mb-3">
                          <div
                            className={`position-relative ${
                              msg.role === "admin" ? "chat-user-image" : ""
                            }`}
                          >
                            <img
                              src={msg.role === "admin" ? client1 : msg.imgUrl}
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
              </SimpleBar>

              <div className="p-2 rounded-bottom shadow">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="메시지를 입력하세요"
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
  );
};

export default ChatPage;
