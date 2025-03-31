class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOrderInfo = () => {
    const message = this.createChatBotMessage(
      <>
        💳 구매 안내:
        <br />
        <br />
        1️⃣ 원하는 명품을 찾아 구매 신청을 합니다. <br />
        2️⃣ 판매자가 상품을 사이트로 발송하면 정품 검사를 진행합니다. <br />
        3️⃣ 정품 확인 후, 상품이 구매자에게 배송됩니다. <br />
        4️⃣ 가품일 경우 주문이 취소되며 환불됩니다. <br />
      </>
    );
    this.addMessageToState(message);
  };

  handleShippingInfo = () => {
    const message = this.createChatBotMessage(
      <>
        🛍 판매 안내:
        <br />
        <br />
        1️⃣ 판매자는 사이트에 상품을 등록합니다. <br />
        2️⃣ 구매자가 구매 신청을 하면, 판매자는 사이트로 상품을 발송합니다.{" "}
        <br />
        3️⃣ 상품이 도착하면 정품 검사를 진행합니다. <br />
        4️⃣ 정품 인증 완료 시 구매자에게 배송됩니다. <br />
        5️⃣ 가품일 경우 주문이 취소되며, 판매자에게 반송됩니다.
        <br />
      </>
    );
    this.addMessageToState(message);
  };

  handleReturnInfo = () => {
    const message = this.createChatBotMessage(
      <>
        🔍 정품 검사 안내:
        <br />
        <br />
        판매자가 보낸 상품은 감정팀이 감정을 진행합니다.
        <br />
        ✅ 정품 인증 → 구매자에게 배송
        <br />
        ❌ 가품 판정 → 거래 취소 후 판매자에게 반송
        <br />
      </>
    );
    this.addMessageToState(message);
  };

  handleAccountInfo = () => {
    const message = this.createChatBotMessage(
      <>
        🚚 배송 안내:
        <br />
        <br />
        판매자가 상품을 사이트로 발송하면, 정품 검수를 거친 후 구매자에게
        배송됩니다.
        <br />
        지역 및 택배사 사정에 따라 배송까지 1~5일 소요될 수 있습니다.
        <br />
      </>
    );
    this.addMessageToState(message);
  };

  handleCustomerSupport = () => {
    const message = this.createChatBotMessage(
      <>
        📞 기타 문의 안내:
        <br />
        <br />
        기타 문의는 '내 정보' 내
        <br />
        '관리자 문의' 탭을 이용해주세요.
        <br />
      </>
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;
