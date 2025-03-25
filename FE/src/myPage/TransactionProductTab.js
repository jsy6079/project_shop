import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import { Mail, Phone, MapPin } from "react-feather";
import { useUser } from "../userContext";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const TransactionProductTab = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [buyerTransactionProducts, setBuyerTransactionProducts] = useState([]); // 진행중인 거래 목록 조회 (구매자)
  const [buyerTransactionPage, setBuyerTransactionPage] = useState(0); // 진행중인 거래 목록 조회 (구매자) 목록 페이지
  const [buyerTransactionTotalPages, setBuyerTransactionTotalPages] =
    useState(1); // 진행중인 거래 목록 조회 (구매자) 전체 페이지 수
  const [sellerTransactionProducts, setSellerTransactionProducts] = useState(
    []
  ); // 진행중인 거래 목록 조회 (판매자)
  const [sellerTransactionPage, setSellerTransactionPage] = useState(0); // 진행중인 거래 목록 조회 (판매자) 목록 페이지
  const [sellerTransactionTotalPages, setSellerTransactionTotalPages] =
    useState(1); // 진행중인 거래 목록 조회 (판매자) 전체 페이지 수

  // 구매 취소
  const cancelConfirm = async (transactionId) => {
    const result = window.confirm(
      "거래를 정말 취소하시겠습니까?\n취소 시, 사용한 마일리지는 환급됩니다."
    );

    if (result) {
      try {
        const response = await axios.put(
          `${ApiUrl}/api/product/cancel/${transactionId}`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert(response.data);
        fetchBuyerTransactionList(buyerTransactionPage);
      } catch (error) {
        if (error.response && error.response.data) {
          alert("알 수 없는 요청입니다.");
        } else {
          alert("알 수 없는 요청입니다.");
        }
        console.error(error);
      }
    }
  };

  // 요청 확인
  const requestConfirm = async (transactionId) => {
    const result = window.confirm(
      "요청을 수락하시겠습니까?\n1일 내로 물품을 배송하지 않으면 거래는 취소됩니다."
    );
    if (result) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/product/accept/${transactionId}`
        );
        alert(response.data);
        fetchSellerTransactionList(sellerTransactionPage);
      } catch (error) {
        alert("알 수 없는 요청입니다.");
        console.error(error);
      }
    }
  };

  function getBadgeColor(status) {
    switch (status) {
      case "거래가능":
        return "primary";
      case "거래대기":
        return "warning";
      case "요청확인":
        return "info";
      case "검수대기":
        return "info";
      case "검수중":
        return "danger";
      case "검수완료":
        return "success";
      case "배송중":
        return "dark";
      case "거래종료":
        return "secondary";
      case "거래취소":
        return "secondary";
      default:
        return "secondary";
    }
  }

  function getSellerBadgeColor(status) {
    switch (status) {
      case "판매중":
        return "primary";
      case "거래요청":
        return "primary";
      case "발송대기":
        return "info";
      case "발송완료":
        return "success";
      case "검수대기":
        return "success";
      case "검수중":
        return "danger";
      case "검수완료":
        return "secondary";
      case "구매자 배송중":
        return "secondary";
      case "거래종료":
        return "secondary";
      case "거래취소":
        return "secondary";
      default:
        return "secondary";
    }
  }

  // 진행중인 거래 페이징 (구매자)
  const buyerTransactionPageGroupSize = 5;
  const buyerTransactionCurrentGroup = Math.floor(
    buyerTransactionPage / buyerTransactionPageGroupSize
  );
  const buyerTransactionStartPage =
    buyerTransactionCurrentGroup * buyerTransactionPageGroupSize;
  const buyerTransactionEndPage = Math.min(
    buyerTransactionStartPage + buyerTransactionPageGroupSize,
    buyerTransactionTotalPages
  );

  // 진행중인 거래 페이징 (판매자)
  const sellerTransactionPageGroupSize = 5;
  const sellerTransactionCurrentGroup = Math.floor(
    sellerTransactionPage / sellerTransactionPageGroupSize
  );
  const sellerTransactionStartPage =
    sellerTransactionCurrentGroup * sellerTransactionPageGroupSize;
  const sellerTransactionEndPage = Math.min(
    sellerTransactionStartPage + sellerTransactionPageGroupSize,
    sellerTransactionTotalPages
  );

  // 진행중인 거래 목록 조회 (구매자)
  const fetchBuyerTransactionList = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/product/buyer/view?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setBuyerTransactionProducts(response.data.content);
      setBuyerTransactionTotalPages(response.data.totalPages); // 진행중인 거래(구매자)의 totalPages 따로 관리
    } catch (error) {
      console.error(
        "진행중인 거래 목록(구매자)을 가져오는 중 오류 발생:",
        error
      );
    }
  };

  // 진행중인 거래 목록 조회 (판매자)
  const fetchSellerTransactionList = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/product/seller/view?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setSellerTransactionProducts(response.data.content);
      setSellerTransactionTotalPages(response.data.totalPages); // 진행중인 거래(판매자)의 totalPages 따로 관리
    } catch (error) {
      console.error(
        "진행중인 거래 목록(판매자)을 가져오는 중 오류 발생:",
        error
      );
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchBuyerTransactionList(buyerTransactionPage); // 진행중인 거래(구매자) 목록 페이지 변화 감지
    }
  }, [userInfo?.email, buyerTransactionPage]);

  useEffect(() => {
    if (userInfo?.email) {
      fetchSellerTransactionList(sellerTransactionPage); // 진행중인 거래(판매자) 목록 페이지 변화 감지
    }
  }, [userInfo?.email, sellerTransactionPage]);

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

  return (
    <TabPane className="show fade bg-white shadow rounded p-4" tabId="5">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="구매 중">
          <div className="table-responsive bg-white shadow rounded">
            <Table className="mb-0 table-center table-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="border-bottom">
                    상품명
                  </th>
                  <th scope="col" className="border-bottom">
                    거래상태
                  </th>
                  <th scope="col" className="border-bottom">
                    상세페이지
                  </th>
                  <th scope="col" className="border-bottom">
                    날짜
                  </th>
                  <th scope="col" className="border-bottom">
                    비고
                  </th>
                </tr>
              </thead>
              {buyerTransactionProducts.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      구매 진행 중인 상품이 없습니다.
                    </td>
                  </tr>
                </tbody>
              ) : (
                buyerTransactionProducts.map((product, key) => (
                  <tbody key={key}>
                    <tr>
                      <th scope="row">
                        {product.productName.length > 12
                          ? product.productName.substring(0, 12) + "..."
                          : product.productName}
                      </th>
                      <td>
                        <span
                          className={`badge bg-${getBadgeColor(
                            product.transactionStatusBuyer
                          )}`}
                        >
                          {product.transactionStatusBuyer}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/detail/${product.categoryId}/${product.productId}`}
                          className="text-primary"
                        >
                          View <i className="uil uil-arrow-right"></i>
                        </Link>
                      </td>
                      <td>{formatDate(product.transactionTime)}</td>
                      <td>
                        {product.transactionStatusBuyer == "거래대기" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => cancelConfirm(product.transactionId)}
                          >
                            구매취소
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </div>
          <div className="text-center mt-3">
            <Pagination className="d-inline-flex justify-content-center">
              <PaginationItem disabled={buyerTransactionCurrentGroup === 0}>
                <PaginationLink
                  href="#"
                  previous
                  onClick={(e) => {
                    e.preventDefault();
                    setBuyerTransactionPage(
                      (buyerTransactionCurrentGroup - 1) *
                        buyerTransactionPageGroupSize
                    );
                  }}
                >
                  이전
                </PaginationLink>
              </PaginationItem>

              {[
                ...Array(buyerTransactionEndPage - buyerTransactionStartPage),
              ].map((_, index) => (
                <PaginationItem
                  key={buyerTransactionStartPage + index}
                  active={
                    buyerTransactionStartPage + index === buyerTransactionPage
                  }
                >
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setBuyerTransactionPage(
                        buyerTransactionStartPage + index
                      );
                    }}
                  >
                    {buyerTransactionStartPage + index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                disabled={buyerTransactionEndPage >= buyerTransactionTotalPages}
              >
                <PaginationLink
                  href="#"
                  next
                  onClick={(e) => {
                    e.preventDefault();
                    setBuyerTransactionPage(
                      buyerTransactionCurrentGroup *
                        buyerTransactionPageGroupSize +
                        buyerTransactionPageGroupSize
                    );
                  }}
                >
                  다음
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Tab>
        <Tab eventKey="profile" title="판매 중">
          <div className="table-responsive bg-white shadow rounded">
            <Table className="mb-0 table-center table-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="border-bottom">
                    상품명
                  </th>
                  <th scope="col" className="border-bottom">
                    거래상태
                  </th>
                  <th scope="col" className="border-bottom">
                    상세페이지
                  </th>
                  <th scope="col" className="border-bottom">
                    날짜
                  </th>
                  <th scope="col" className="border-bottom">
                    비고
                  </th>
                </tr>
              </thead>
              {sellerTransactionProducts.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      판매 진행 중인 상품이 없습니다.
                    </td>
                  </tr>
                </tbody>
              ) : (
                sellerTransactionProducts.map((product, key) => (
                  <tbody key={key}>
                    <tr>
                      <th scope="row">
                        {product.productName.length > 12
                          ? product.productName.substring(0, 12) + "..."
                          : product.productName}
                      </th>
                      <td>
                        <span
                          className={`badge bg-${getSellerBadgeColor(
                            product.transactionStatusSeller
                          )}`}
                        >
                          {product.transactionStatusSeller}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/detail/${product.categoryId}/${product.productId}`}
                          className="text-primary"
                        >
                          View <i className="uil uil-arrow-right"></i>
                        </Link>
                      </td>
                      <td>{formatDate(product.transactionTime)}</td>
                      <td>
                        {product.transactionStatusSeller == "거래요청" && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              requestConfirm(product.transactionId)
                            }
                          >
                            요청 확인
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </div>
          <div className="text-center mt-3">
            <Pagination className="d-inline-flex justify-content-center">
              <PaginationItem disabled={buyerTransactionCurrentGroup === 0}>
                <PaginationLink
                  href="#"
                  previous
                  onClick={(e) => {
                    e.preventDefault();
                    setBuyerTransactionPage(
                      (buyerTransactionCurrentGroup - 1) *
                        buyerTransactionPageGroupSize
                    );
                  }}
                >
                  이전
                </PaginationLink>
              </PaginationItem>

              {[
                ...Array(buyerTransactionEndPage - buyerTransactionStartPage),
              ].map((_, index) => (
                <PaginationItem
                  key={buyerTransactionStartPage + index}
                  active={
                    buyerTransactionStartPage + index === buyerTransactionPage
                  }
                >
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setBuyerTransactionPage(
                        buyerTransactionStartPage + index
                      );
                    }}
                  >
                    {buyerTransactionStartPage + index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                disabled={buyerTransactionEndPage >= buyerTransactionTotalPages}
              >
                <PaginationLink
                  href="#"
                  next
                  onClick={(e) => {
                    e.preventDefault();
                    setBuyerTransactionPage(
                      buyerTransactionCurrentGroup *
                        buyerTransactionPageGroupSize +
                        buyerTransactionPageGroupSize
                    );
                  }}
                >
                  다음
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Tab>
      </Tabs>
    </TabPane>
  );
};

export default TransactionProductTab;
