// websocket.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let isConnected = false;

// export const connectWebSocket = (onMessageReceived) => {
//   if (isConnected) {
//     console.log("🛑 이미 WebSocket에 연결되어 있음");
//     return;
//   }

//   console.log("🧪 WebSocket 연결 시도");

//   const socket = new SockJS("http://localhost:8080/ws-chat");

//   stompClient = new Client({
//     webSocketFactory: () => socket,
//     connectHeaders: {},
//     // debug: (str) => console.log("💬 STOMP 디버그:", str),
//     reconnectDelay: 5000,

//     onConnect: () => {
//       console.log("✅ WebSocket 연결 성공!");
//       isConnected = true;

//       stompClient.subscribe("/topic/messages", (message) => {
//         const chat = JSON.parse(message.body);
//         console.log("📩 수신된 메시지:", chat);
//         onMessageReceived(chat);
//       });
//     },

//     onStompError: (frame) => {
//       console.error("❌ STOMP 오류:", frame);
//     },

//     onWebSocketError: (error) => {
//       console.error("❌ WebSocket 오류:", error);
//     },
//   });

//   stompClient.activate();
// };

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

export const connectWebSocket = (onMessageReceived) => {
  if (isConnected) {
    console.log("🛑 이미 WebSocket에 연결되어 있음 - 콜백 재등록만");

    // ✅ 콜백만 재등록 (중복 방지하려면 unsubscribe 관리도 가능)
    stompClient.subscribe("/topic/messages", (message) => {
      const chat = JSON.parse(message.body);
      console.log("📩 (재등록) 수신된 메시지:", chat);
      onMessageReceived(chat);
    });

    return;
  }

  console.log("🧪 WebSocket 연결 시도");

  const socket = new SockJS(ApiUrl + "/api/ws-chat");

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {},
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket 연결 성공!");
      isConnected = true;

      stompClient.subscribe("/topic/messages", (message) => {
        const chat = JSON.parse(message.body);
        console.log("📩 수신된 메시지:", chat);
        onMessageReceived(chat);
      });
    },

    onStompError: (frame) => {
      console.error("❌ STOMP 오류:", frame);
    },

    onWebSocketError: (error) => {
      console.error("❌ WebSocket 오류:", error);
    },
  });

  stompClient.activate();
};

// ✅ 이 부분이 누락되었을 가능성 높음
export const sendMessage = (chatMessage) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(chatMessage),
    });
  } else {
    console.warn("⚠️ WebSocket 연결 안 됨. 메시지 전송 불가.");
  }
};
