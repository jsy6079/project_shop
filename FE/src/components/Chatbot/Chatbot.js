import React, { useState, useEffect } from "react";
import { Chatbot } from "react-chatbot-kit";
import { MessageSquare } from "react-feather";
import "react-chatbot-kit/build/main.css";
import config from "./Config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const chatbotBtn = document.getElementById("chatbot-button");
      if (chatbotBtn) {
        if (window.scrollY > 100) {
          chatbotBtn.style.display = "block";
        } else {
          chatbotBtn.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 챗봇 버튼 */}
      <button
        id="chatbot-button"
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
          zIndex: 1000,
          display: "none",
        }}
      >
        <MessageSquare size={24} color="white" />
      </button>

      {/* 챗봇 창 */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "270px",
            height: "500px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
