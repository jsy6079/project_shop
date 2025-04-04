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

const HistoryTab = ({ defaultInnerTab = "home" }) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [innerTab, setInnerTab] = useState(defaultInnerTab);
  const [orderhistoryProducts, setOrderhistoryProducts] = useState([]); // 구매 이력
  const [orderhistoryPage, setOrderhistoryPage] = useState(0); // 구매 이력 목록 페이지
  const [orderhistoryTotalPages, setOrderhistoryTotalPages] = useState(1); // 구매 이력 전체 페이지 수
  const [saleshistoryProducts, setSaleshistoryProducts] = useState([]); // 판매 이력
  const [saleshistoryPage, setSaleshistoryPage] = useState(0); // 판매 이력 목록 페이지
  const [saleshistoryTotalPages, setSaleshistoryTotalPages] = useState(1); // 판매 이력 전체 페이지 수

  function getBuyerBadgeColor(status) {
    switch (status) {
      case "거래가능":
        return "primary";
      case "거래대기":
        return "warning";
      case "요청확인":
        return "info";
      case "검수대기":
        return "info";
      case "검수 중":
        return "dark";
      case "검수실패":
        return "danger";
      case "검수완료":
        return "success";
      case "배송중":
        return "warning";
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
        return "warning";
      case "발송대기":
        return "info";
      case "발송완료":
        return "success";
      case "검수 대기":
        return "info";
      case "검수실패":
        return "danger";
      case "검수 중":
        return "dark";
      case "검수완료":
        return "success";
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

  // 구매 이력 페이징
  const orderhistoryPageGroupSize = 5;
  const orderhistoryCurrentGroup = Math.floor(
    orderhistoryPage / orderhistoryPageGroupSize
  );
  const orderhistoryStartPage =
    orderhistoryCurrentGroup * orderhistoryPageGroupSize;
  const orderhistoryEndPage = Math.min(
    orderhistoryStartPage + orderhistoryPageGroupSize,
    orderhistoryTotalPages
  );

  // 판매 이력 페이징
  const saleshistoryPageGroupSize = 5;
  const saleshistoryCurrentGroup = Math.floor(
    saleshistoryPage / saleshistoryPageGroupSize
  );
  const saleshistoryStartPage =
    saleshistoryCurrentGroup * saleshistoryPageGroupSize;
  const saleshistoryEndPage = Math.min(
    saleshistoryStartPage + saleshistoryPageGroupSize,
    saleshistoryTotalPages
  );

  // 구매 이력 목록 조회
  const fetchOrderHistoryList = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/product/orderhistory?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setOrderhistoryProducts(response.data.content);
      setOrderhistoryTotalPages(response.data.totalPages); // 구매 이력의 totalPages 따로 관리
    } catch (error) {
      console.error("구매 이력 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 판매 이력 목록 조회
  const fetchSalesHistoryList = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/product/saleshistory?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setSaleshistoryProducts(response.data.content);
      setSaleshistoryTotalPages(response.data.totalPages); // 판매 이력의 totalPages 따로 관리
    } catch (error) {
      console.error("구매 이력 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 판매 물품 삭제 (DB X)
  const deleteProduct = async (email, productId) => {
    const isCofirm = window.confirm("등록된 상품을 삭제하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/product/delete/${productId}`,
          null,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          setSaleshistoryProducts((prevSaleshistoryProducts) =>
            prevSaleshistoryProducts.filter(
              (item) => item.productId !== productId
            )
          );

          fetchSalesHistoryList(saleshistoryPage);
        } else {
          alert("판매 목록 삭제 실패");
        }
      } catch (error) {
        console.log("판매 목록 삭제 실패", error);
        alert("알 수 없는 요청입니다.");
      }
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchOrderHistoryList(orderhistoryPage); // 구매 이력 목록 페이지 변화 감지
    }
  }, [userInfo?.email, orderhistoryPage]);

  useEffect(() => {
    if (userInfo?.email) {
      fetchSalesHistoryList(saleshistoryPage); // 판매 이력 목록 페이지 변화 감지
    }
  }, [userInfo?.email, saleshistoryPage]);

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
    <TabPane className="show fade bg-white shadow rounded p-4" tabId="6">
      <Tabs
        activeKey={innerTab}
        onSelect={(k) => setInnerTab(k)}
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="구매 이력">
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
                    비고
                  </th>
                  <th scope="col" className="border-bottom">
                    요청 날짜
                  </th>
                  <th scope="col" className="border-bottom">
                    상세 페이지
                  </th>
                </tr>
              </thead>
              {orderhistoryProducts.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      구매 이력이 없습니다.
                    </td>
                  </tr>
                </tbody>
              ) : (
                orderhistoryProducts.map((product, key) => (
                  <tbody key={key}>
                    <tr>
                      <th scope="row">
                        {product.productName.length > 12
                          ? product.productName.substring(0, 12) + "..."
                          : product.productName}
                      </th>
                      <td>
                        {" "}
                        <span
                          className={`badge bg-${getBuyerBadgeColor(
                            product.transactionStatusBuyer
                          )}`}
                        >
                          {product.transactionStatusBuyer}
                        </span>
                      </td>
                      <td className="text-secondary">
                        {product.orderHistoryComment}
                      </td>
                      <td>{formatDate(product.orderHistoryTime)}</td>
                      <td>
                        {" "}
                        <Link
                          to={`/detail/${product.categoryId}/${product.productId}`}
                          className="text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View <i className="uil uil-arrow-right"></i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </div>
          <div className="text-center mt-3">
            <Pagination className="d-inline-flex justify-content-center">
              <PaginationItem disabled={orderhistoryCurrentGroup === 0}>
                <PaginationLink
                  href="#"
                  previous
                  onClick={(e) => {
                    e.preventDefault();
                    setOrderhistoryPage(
                      (orderhistoryCurrentGroup - 1) * orderhistoryPageGroupSize
                    );
                  }}
                >
                  이전
                </PaginationLink>
              </PaginationItem>

              {[...Array(orderhistoryEndPage - orderhistoryStartPage)].map(
                (_, index) => (
                  <PaginationItem
                    key={orderhistoryStartPage + index}
                    active={orderhistoryStartPage + index === orderhistoryPage}
                  >
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOrderhistoryPage(orderhistoryStartPage + index);
                      }}
                    >
                      {orderhistoryStartPage + index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem
                disabled={orderhistoryEndPage >= orderhistoryTotalPages}
              >
                <PaginationLink
                  href="#"
                  next
                  onClick={(e) => {
                    e.preventDefault();
                    setOrderhistoryPage(
                      orderhistoryCurrentGroup * orderhistoryPageGroupSize +
                        orderhistoryPageGroupSize
                    );
                  }}
                >
                  다음
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Tab>
        <Tab eventKey="profile" title="판매 이력">
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
                    비고
                  </th>
                  <th scope="col" className="border-bottom">
                    등록 날짜
                  </th>
                  <th scope="col" className="border-bottom">
                    상세 페이지
                  </th>
                  <th scope="col" className="border-bottom"></th>
                </tr>
              </thead>
              {saleshistoryProducts.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      판매 이력이 없습니다.
                    </td>
                  </tr>
                </tbody>
              ) : (
                saleshistoryProducts.map((product, key) => (
                  <tbody key={key}>
                    <tr>
                      <th scope="row">
                        {product.productName.length > 12
                          ? product.productName.substring(0, 12) + "..."
                          : product.productName}
                      </th>
                      <td>
                        {" "}
                        <span
                          className={`badge bg-${getSellerBadgeColor(
                            product.transactionStatusSeller
                          )}`}
                        >
                          {product.transactionStatusSeller}
                        </span>
                      </td>
                      <td className="text-secondary">
                        {product.salesHistoryComment}
                      </td>
                      <td>{formatDate(product.salesHistoryTime)}</td>
                      {product.transactionStatusSeller === "판매중" ? (
                        <>
                          <td>
                            <Link
                              to={`/detail/${product.categoryId}/${product.productId}`}
                              className="text-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View <i className="uil uil-arrow-right"></i>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                deleteProduct(userInfo.email, product.productId)
                              }
                            >
                              <i className="uil uil-multiply align-middle me-1"></i>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </div>
          <div className="text-center mt-3">
            <Pagination className="d-inline-flex justify-content-center">
              <PaginationItem disabled={saleshistoryCurrentGroup === 0}>
                <PaginationLink
                  href="#"
                  previous
                  onClick={(e) => {
                    e.preventDefault();
                    setSaleshistoryPage(
                      (saleshistoryCurrentGroup - 1) * saleshistoryPageGroupSize
                    );
                  }}
                >
                  이전
                </PaginationLink>
              </PaginationItem>

              {[...Array(saleshistoryEndPage - saleshistoryStartPage)].map(
                (_, index) => (
                  <PaginationItem
                    key={saleshistoryStartPage + index}
                    active={saleshistoryStartPage + index === saleshistoryPage}
                  >
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSaleshistoryPage(saleshistoryStartPage + index);
                      }}
                    >
                      {saleshistoryStartPage + index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem
                disabled={saleshistoryEndPage >= saleshistoryTotalPages}
              >
                <PaginationLink
                  href="#"
                  next
                  onClick={(e) => {
                    e.preventDefault();
                    setSaleshistoryPage(
                      saleshistoryCurrentGroup * saleshistoryPageGroupSize +
                        saleshistoryPageGroupSize
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

export default HistoryTab;
