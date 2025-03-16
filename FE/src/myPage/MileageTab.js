import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TabPane } from "reactstrap";

const MileageTab = ({ userInfo }) => {
  const [selectMoney, setSelectMoney] = useState(100); // 기본 100원원

  // 아임포트 충전
  const handlePayment = () => {
    const { IMP } = window; // 아임포트 전역 객체
    IMP.init("imp35813801"); // 가맹점 식별 코드 입력

    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제 방식
      merchant_uid: `order_${new Date().getTime()}`, // 고유 주문번호
      name: "Moa 마일리지 충전", // 상품 이름
      amount: selectMoney, // 결제 금액 (원)
      buyer_email: userInfo.email, // 구매자 이메일
      buyer_name: userInfo.username, // 구매자 이름
    };

    IMP.request_pay(data, (response) => {
      console.log("결제 요청 데이터:", data); // 결제 요청 데이터를 콘솔에 출력
      if (response.success) {
        console.log("결제 성공 응답:", response); // 결제 성공 시 응답 데이터를 출력
        // 결제 성공 시 서버로 검증 요청
        axios
          .post(
            "http://localhost:8080/api/verify",
            { imp_uid: response.imp_uid, username: userInfo.username }, // 요청 데이터
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // 쿠키 포함
            }
          )
          .then((res) => {
            const result = res.data;
            if (result === "결제가 성공적으로 검증되었습니다.") {
              alert("결제가 완료되었습니다!");
            } else {
              alert("결제 검증 실패: " + result);
            }
          })
          .catch((error) => {
            console.error("결제 검증 요청 실패:", error);
            alert("결제 검증 요청 중 문제가 발생했습니다.");
          });
      } else {
        // 결제 실패 처리
        alert(`결제 실패: ${response.error_msg}`);
      }
    });
  };

  return (
    <>
      <TabPane className="fade bg-white show p-4" tabId="3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-dark mb-0">
            내 마일리지: <span className="text-primary">{userInfo.money}</span>
            <span className="text-dark"> 원</span>
          </h6>
        </div>
        <div>
          <button onClick={() => setSelectMoney(100)}>100원</button>
          <button onClick={() => setSelectMoney(200)}>200원</button>
          <button onClick={() => setSelectMoney(300)}>300원</button>
          <button onClick={() => setSelectMoney(400)}>400원</button>
          <button onClick={() => setSelectMoney(500)}>500원</button>
          <button onClick={() => setSelectMoney(600)}>600원</button>
          <p className="text-dark">
            예상 충전 금액 (수수료 5% 차감):{" "}
            {(selectMoney * 0.95).toLocaleString()} 원
          </p>
          <button className="btn btn-primary btn-sm" onClick={handlePayment}>
            충전하기
          </button>
        </div>
      </TabPane>
      <TabPane className="show fade bg-white shadow rounded p-4" tabId="3">
        <div className="table-responsive bg-white shadow rounded">
          <Table className="mb-0 table-center table-nowrap">
            <thead>
              <tr>
                <th scope="col" className="border-bottom">
                  날짜
                </th>
                <th scope="col" className="border-bottom">
                  구분(입금/출금)
                </th>
                <th scope="col" className="border-bottom">
                  금액
                </th>
                <th scope="col" className="border-bottom">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2025.01.01</th>
                <td className="text-success">입금</td>
                <td>+ 15,000</td>
                <td>
                  마일리지 충전 <span className="text-muted">(상품명)</span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </TabPane>
    </>
  );
};

export default MileageTab;
