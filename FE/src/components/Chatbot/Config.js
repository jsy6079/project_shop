import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Moa 챗봇",
  initialMessages: [
    createChatBotMessage(
      <>
        안녕하세요! 무엇을 도와드릴까요? <br />
        도움말을 보시려면 번호를 입력하세요! <br />
        <br />
        1️⃣ 구매 안내 <br />
        2️⃣ 판매 안내 <br />
        3️⃣ 정품 검사 안내 <br />
        4️⃣ 배송 안내 <br />
        5️⃣ 고객센터 안내
      </>
    ),
  ],

  customComponents: {
    header: () => (
      <div style={{ padding: "10px", fontWeight: "bold" }}>Moa ChatBot</div>
    ),
    botAvatar: () => <div>🤖</div>,
    userAvatar: () => <div>👤</div>,
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;
