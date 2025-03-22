import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TabPane,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
import { useUser } from "../userContext";

const MileageTab = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [selectMoney, setSelectMoney] = useState(100); // 기본 100원
  const [moneyProducts, setMoneyProducts] = useState([]); // 마일리지
  const [moneyPage, setMoneyPage] = useState(0); // 마일리지 목록 페이지
  const [moneyTotalPages, setMoneyTotalPages] = useState(1); // 마일리지 전체 페이지 수

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
            {
              imp_uid: response.imp_uid,
              paid_amount: response.paid_amount,
              buyer_email: response.buyer_email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // 쿠키 포함
            }
          )
          .then((res) => {
            const result = res.data;
            if (result === "결제 검증 완료") {
              alert("결제가 완료되었습니다!");
              fetchUserInfo();
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

  // 마일리지 페이징
  const moneyPageGroupSize = 5;
  const moneyCurrentGroup = Math.floor(moneyPage / moneyPageGroupSize);
  const moneyStartPage = moneyCurrentGroup * moneyPageGroupSize;
  const moneyEndPage = Math.min(
    moneyStartPage + moneyPageGroupSize,
    moneyTotalPages
  );

  // 마일리지 목록 조회
  const fetchReviewList = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/money?page=${pageNumber}&size=5`,
        {
          withCredentials: true, // ✅ 이게 꼭 있어야 쿠키가 전송됨!
        }
      );
      setMoneyProducts(response.data.content);
      setMoneyTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("마일리지 목록을 가져오는 중 오류 발생:", error);
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

  useEffect(() => {
    if (userInfo && userInfo.email) {
      fetchReviewList(moneyPage);
    }
  }, [moneyPage, userInfo]);

  return (
    <>
      <TabPane className="fade bg-white show p-4" tabId="3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-dark mb-0">
            내 마일리지:{" "}
            <span className="text-primary">
              {userInfo.money.toLocaleString()}
            </span>
            <span className="text-dark"> 원</span>
          </h5>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setSelectMoney(100)}
          >
            10,000원
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setSelectMoney(300)}
          >
            30,000원
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setSelectMoney(400)}
          >
            50,000원
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setSelectMoney(500)}
          >
            100,000원
          </button>
          <p className="text-dark">
            예상 충전 금액 (수수료 5% 차감):{" "}
            <span className="text-danger fw-bold">
              {(selectMoney * 0.95).toLocaleString()} 원
            </span>
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
            {moneyProducts.map((money, key) => (
              <tbody key={key}>
                <tr>
                  <th scope="row">{formatDate(money.moneyTime)}</th>

                  <td>
                    <Badge
                      color={
                        money.moneyType === "입금"
                          ? "primary"
                          : money.moneyType === "출금"
                          ? "danger"
                          : "primary"
                      }
                    >
                      {money.moneyType}
                    </Badge>
                  </td>
                  <td>
                    {money.moneyType === "입금"
                      ? `+ ${money.moneyAmount.toLocaleString()}원`
                      : `- ${money.moneyAmount.toLocaleString()}원`}
                  </td>
                  <td>{money.moneyComment} </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
        <div className="text-center mt-3">
          <Pagination className="d-inline-flex justify-content-center">
            <PaginationItem disabled={moneyCurrentGroup === 0}>
              <PaginationLink
                href="#"
                previous
                onClick={(e) => {
                  e.preventDefault();
                  setMoneyPage((moneyCurrentGroup - 1) * moneyPageGroupSize);
                }}
              >
                이전
              </PaginationLink>
            </PaginationItem>

            {[...Array(moneyEndPage - moneyStartPage)].map((_, index) => (
              <PaginationItem
                key={moneyStartPage + index}
                active={moneyStartPage + index === moneyPage}
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMoneyPage(moneyStartPage + index);
                  }}
                >
                  {moneyStartPage + index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={moneyEndPage >= moneyTotalPages}>
              <PaginationLink
                href="#"
                next
                onClick={(e) => {
                  e.preventDefault();
                  setMoneyPage(
                    moneyCurrentGroup * moneyPageGroupSize + moneyPageGroupSize
                  );
                }}
              >
                다음
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </TabPane>
    </>
  );
};

export default MileageTab;
