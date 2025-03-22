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
import { Mail, Phone, MapPin } from "react-feather";
import { useUser } from "../userContext";

const TransactionProductTab = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [transactionProducts, setTransactionProducts] = useState([]); // 찜
  const [transactionPage, setTransactionPage] = useState(0); // 찜 목록 페이지
  const [transactionTotalPages, setTransactionTotalPages] = useState(1); // 찜 전체 페이지 수

  function getBadgeColor(status) {
    switch (status) {
      case "거래가능":
        return "primary";
      case "거래대기":
        return "warning";
      case "검수대기":
        return "info";
      case "검수완료":
        return "success";
      case "배송중":
        return "dark";
      case "거래종료":
        return "secondary";
      default:
        return "light";
    }
  }

  // 진행중인 거래 페이징
  const transactionPageGroupSize = 5;
  const transactionCurrentGroup = Math.floor(
    transactionPage / transactionPageGroupSize
  );
  const transactionStartPage =
    transactionCurrentGroup * transactionPageGroupSize;
  const transactionEndPage = Math.min(
    transactionStartPage + transactionPageGroupSize,
    transactionTotalPages
  );

  // 진행중인 거래 목록 조회
  const fetchTransactionList = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/view?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setTransactionProducts(response.data.content);
      setTransactionTotalPages(response.data.totalPages); // 진행중인 거래의 totalPages 따로 관리
    } catch (error) {
      console.error("찜 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchTransactionList(transactionPage); // 진행중인 거래 목록 페이지 변화 감지
    }
  }, [userInfo?.email, transactionPage]);

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
          {transactionProducts.map((product, key) => (
            <tbody key={key}>
              <tr>
                <th scope="row">{product.productName}</th>
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
                  <button class="btn btn-danger btn-sm"> 구매취소 </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <div className="text-center mt-3">
        <Pagination className="d-inline-flex justify-content-center">
          <PaginationItem disabled={transactionCurrentGroup === 0}>
            <PaginationLink
              href="#"
              previous
              onClick={(e) => {
                e.preventDefault();
                setTransactionPage(
                  (transactionCurrentGroup - 1) * transactionPageGroupSize
                );
              }}
            >
              이전
            </PaginationLink>
          </PaginationItem>

          {[...Array(transactionEndPage - transactionStartPage)].map(
            (_, index) => (
              <PaginationItem
                key={transactionStartPage + index}
                active={transactionStartPage + index === transactionPage}
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTransactionPage(transactionStartPage + index);
                  }}
                >
                  {transactionStartPage + index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem
            disabled={transactionEndPage >= transactionTotalPages}
          >
            <PaginationLink
              href="#"
              next
              onClick={(e) => {
                e.preventDefault();
                setTransactionPage(
                  transactionCurrentGroup * transactionPageGroupSize +
                    transactionPageGroupSize
                );
              }}
            >
              다음
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </TabPane>
  );
};

export default TransactionProductTab;
