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
  const [wishProducts, setWishProducts] = useState([]); // 찜
  const [wishPage, setWishPage] = useState(0); // 찜 목록 페이지
  const [wishTotalPages, setWishTotalPages] = useState(1); // 찜 전체 페이지 수

  // 거래 상태 별 뱃지 스타일 적용 -> 수정해야함
  function getBadgeColor(product_status) {
    switch (product_status) {
      case "거래가능":
        return "primary";

      case "거래대기":
        return "danger";

      case "거래종료":
        return "secondary";
    }
  }

  // 찜 페이징
  const wishPageGroupSize = 5;
  const wishCurrentGroup = Math.floor(wishPage / wishPageGroupSize);
  const wishStartPage = wishCurrentGroup * wishPageGroupSize;
  const wishEndPage = Math.min(
    wishStartPage + wishPageGroupSize,
    wishTotalPages
  );

  // 찜 목록 조회
  const fetchWishList = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/wishlist/view/${userInfo.email}?page=${pageNumber}&size=5`
      );
      setWishProducts(response.data.content);
      setWishTotalPages(response.data.totalPages); // 찜의 totalPages 따로 관리
    } catch (error) {
      console.error("찜 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchWishList(wishPage); // 찜 목록 페이지 변화 감지
    }
  }, [userInfo?.email, wishPage]);

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
          {wishProducts.map((product, key) => (
            <tbody key={key}>
              <tr>
                <th scope="row">7107</th>
                <td className="text-success">Delivered</td>
                <td>
                  <Link to="#" className="text-primary">
                    View <i className="uil uil-arrow-right"></i>
                  </Link>
                </td>
                <td>1st November 2020</td>
                <td>
                  $ 320 <span className="text-muted">for 2items</span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <div className="text-center mt-3">
          <Pagination className="d-inline-flex justify-content-center">
            <PaginationItem disabled={wishCurrentGroup === 0}>
              <PaginationLink
                href="#"
                previous
                onClick={(e) => {
                  e.preventDefault();
                  setWishPage((wishCurrentGroup - 1) * wishPageGroupSize);
                }}
              >
                이전
              </PaginationLink>
            </PaginationItem>

            {[...Array(wishEndPage - wishStartPage)].map((_, index) => (
              <PaginationItem
                key={wishStartPage + index}
                active={wishStartPage + index === wishPage}
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setWishPage(wishStartPage + index);
                  }}
                >
                  {wishStartPage + index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={wishEndPage >= wishTotalPages}>
              <PaginationLink
                href="#"
                next
                onClick={(e) => {
                  e.preventDefault();
                  setWishPage(
                    wishCurrentGroup * wishPageGroupSize + wishPageGroupSize
                  );
                }}
              >
                다음
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </TabPane>
  );
};

export default TransactionProductTab;
