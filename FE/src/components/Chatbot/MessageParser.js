class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage === "1") {
      this.actionProvider.handleOrderInfo();
    } else if (lowerCaseMessage === "2") {
      this.actionProvider.handleShippingInfo();
    } else if (lowerCaseMessage === "3") {
      this.actionProvider.handleReturnInfo();
    } else if (lowerCaseMessage === "4") {
      this.actionProvider.handleAccountInfo();
    } else if (lowerCaseMessage === "5") {
      this.actionProvider.handleCustomerSupport();
    } else {
      this.actionProvider.addMessageToState(
        this.actionProvider.createChatBotMessage(
          <>
            죄송해요, 이해하지 못했어요. <br />
            도움말을 보시려면 번호를 입력하세요! <br />
            <br />
            1️⃣ 구매 안내 <br />
            2️⃣ 판매 안내 <br />
            3️⃣ 정품 검사 안내 <br />
            4️⃣ 배송 안내 <br />
            5️⃣ 고객센터 안내
          </>
        )
      );
    }
  }
}

export default MessageParser;
