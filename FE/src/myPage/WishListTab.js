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
import { useUser } from "../userContext";

const WishListTab = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const [wishProducts, setWishProducts] = useState([]); // 찜
  const [wishPage, setWishPage] = useState(0); // 찜 목록 페이지
  const [wishTotalPages, setWishTotalPages] = useState(1); // 찜 전체 페이지 수

  // 거래 상태 별 뱃지 스타일 적용
  function getBadgeColor(product_status) {
    switch (product_status) {
      case "거래가능":
        return "primary";

      case "거래중":
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

  // 찜 목록 삭제
  const deleteWish = async (email, product_id) => {
    const isCofirm = window.confirm("해당 찜 상품을 삭제하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/wishlist/delete/${email}/${product_id}`,
          {
            email,
            product_id,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          setWishProducts((prevWishProducts) =>
            prevWishProducts.filter((item) => item.product_id !== product_id)
          );

          fetchWishList(wishPage);
        } else {
          alert("찜 목록 삭제 실패");
        }
      } catch (error) {
        console.log("찜 삭제 실패", error);
        alert("서버 오류");
      }
    }
  };

  return (
    <TabPane className="show fade bg-white p-4" tabId="2">
      <div className="table-responsive bg-white shadow rounded">
        <Table className="mb-0 table-center table-nowrap">
          <thead>
            <tr>
              <th scope="col" className="border-bottom">
                상품명
              </th>
              <th scope="col" className="border-bottom">
                가격
              </th>
              <th scope="col" className="border-bottom">
                상품 상태
              </th>
              <th scope="col" className="border-bottom">
                상세 페이지
              </th>
              <th scope="col" className="border-bottom"></th>
            </tr>
          </thead>
          {wishProducts.map((product, key) => (
            <tbody key={key}>
              <tr>
                <th scope="row">{product.product_name}</th>
                <td>{product.product_price.toLocaleString()}원</td>
                <td className="text-success">
                  <span
                    className={`badge bg-${getBadgeColor(
                      product.product_status
                    )}`}
                  >
                    {product.product_status}
                  </span>
                </td>
                <td>
                  {" "}
                  <Link
                    to={`/detail/${product.category_id}/${product.product_id}`}
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
                      deleteWish(userInfo.email, product.product_id)
                    }
                  >
                    <i className="uil uil-multiply align-middle me-1"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
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
    </TabPane>
  );
};

export default WishListTab;
