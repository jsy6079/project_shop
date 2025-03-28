import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  TabPane,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  CardBody,
  Card,
  Progress,
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const InspectionPage = () => {
  const [productInspectionBefore, setProductInsepectionBefore] = useState([]); // 검수 전
  const [productInspectionDuring, setProductInsepectionDuring] = useState([]); // 검수 중
  const [productInspectionAfter, setProductInsepectionAfter] = useState([]); // 검수 완료
  const [productInspectionBeforePage, setProductInsepectionBeforePage] =
    useState(0); // 검수 전 목록 페이지
  const [
    productInspectionBeforeTotalPages,
    setProductInsepectionBeforeTotalPages,
  ] = useState(1); // 검수 전 전체 페이지 수
  const [productInspectionDuringPage, setProductInsepectionDuringPage] =
    useState(0); // 검수 중 목록 페이지
  const [
    productInspectionDuringTotalPages,
    setProductInsepectionDuringTotalPages,
  ] = useState(1); // 검수 중 전체 페이지 수
  const [productInspectionAfterPage, setProductInsepectionAfterPage] =
    useState(0); // 검수 완료 목록 페이지
  const [
    productInspectionAfterTotalPages,
    setProductInsepectionAfterTotalPages,
  ] = useState(1); // 검수 완료 전체 페이지 수

  // 검수 전 리스트
  const fetchproductInspectionBefore = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/admin/product/before?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setProductInsepectionBefore(response.data.content);
      setProductInsepectionBeforeTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("검수 전 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 검수 중 리스트
  const fetchproductInspectionDuring = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/admin/product/during?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setProductInsepectionDuring(response.data.content);
      setProductInsepectionDuringTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("검수 전 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 검수 완료 리스트
  const fetchproductInspectionAfter = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/admin/product/after?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setProductInsepectionAfter(response.data.content);
      setProductInsepectionAfterTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("검수 전 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 검수 시작 요청
  const startProductInsection = async (transactionId) => {
    const isCofirm = window.confirm("해당 상품의 검수를 시작하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/product/start/${transactionId}`,
          { transactionId },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchproductInspectionBefore(productInspectionBeforePage);
          fetchproductInspectionDuring(productInspectionDuringPage);
          fetchproductInspectionAfter(productInspectionAfterPage);
        } else {
          alert("검수 시작 요청이 실패했습니다.");
        }
      } catch (error) {
        console.log("검수 시작 요청 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 검수 통과 요청
  const passProductInsection = async (transactionId) => {
    const isCofirm = window.confirm("해당 상품을 통과 처리 하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/product/pass/${transactionId}`,
          { transactionId },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchproductInspectionBefore(productInspectionBeforePage);
          fetchproductInspectionDuring(productInspectionDuringPage);
          fetchproductInspectionAfter(productInspectionAfterPage);
        } else {
          alert("처리를 실패했습니다.");
        }
      } catch (error) {
        console.log("통과 처리 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 검수 실패 요청
  const failProductInsection = async (transactionId) => {
    const isCofirm = window.confirm("해당 상품을 실패 처리 하시겠습니까??");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/product/fail/${transactionId}`,
          { transactionId },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchproductInspectionBefore(productInspectionBeforePage);
          fetchproductInspectionDuring(productInspectionDuringPage);
          fetchproductInspectionAfter(productInspectionAfterPage);
        } else {
          alert("처리를 실패했습니다.");
        }
      } catch (error) {
        console.log("실패 처리 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 검수 통과 후 배송 처리
  const deliveryProductInsection = async (transactionId) => {
    const isCofirm = window.confirm("해당 상품을 배송 처리 하시겠습니까??");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/product/delivery/${transactionId}`,
          { transactionId },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchproductInspectionBefore(productInspectionBeforePage);
          fetchproductInspectionDuring(productInspectionDuringPage);
          fetchproductInspectionAfter(productInspectionAfterPage);
        } else {
          alert("배송 처리를 실패했습니다.");
        }
      } catch (error) {
        console.log("배송 처리 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 검수 실패 후 반송 처리
  const returnProductInsection = async (transactionId) => {
    const isCofirm = window.confirm("해당 상품을 반송 처리 하시겠습니까??");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/product/return/${transactionId}`,
          { transactionId },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchproductInspectionBefore(productInspectionBeforePage);
          fetchproductInspectionDuring(productInspectionDuringPage);
          fetchproductInspectionAfter(productInspectionAfterPage);
        } else {
          alert("반송 처리를 실패했습니다.");
        }
      } catch (error) {
        console.log("실패 처리 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 검수 전 페이징
  const productInspectionBeforePageGroupSize = 5;
  const productInspectionBeforeCurrentGroup = Math.floor(
    productInspectionBeforePage / productInspectionBeforePageGroupSize
  );
  const productInspectionBeforeStartPage =
    productInspectionBeforeCurrentGroup * productInspectionBeforePageGroupSize;
  const productInspectionBeforeEndPage = Math.min(
    productInspectionBeforeStartPage + productInspectionBeforePageGroupSize,
    productInspectionBeforeTotalPages
  );

  // 검수 중 페이징
  const productInspectionDuringPageGroupSize = 5;
  const productInspectionDuringCurrentGroup = Math.floor(
    productInspectionDuringPage / productInspectionDuringPageGroupSize
  );
  const productInspectionDuringStartPage =
    productInspectionDuringCurrentGroup * productInspectionDuringPageGroupSize;
  const productInspectionDuringEndPage = Math.min(
    productInspectionDuringStartPage + productInspectionDuringPageGroupSize,
    productInspectionDuringTotalPages
  );

  // 검수 완료 페이징
  const productInspectionAfterPageGroupSize = 5;
  const productInspectionAfterCurrentGroup = Math.floor(
    productInspectionAfterPage / productInspectionAfterPageGroupSize
  );
  const productInspectionAfterStartPage =
    productInspectionAfterCurrentGroup * productInspectionAfterPageGroupSize;
  const productInspectionAfterEndPage = Math.min(
    productInspectionAfterStartPage + productInspectionAfterPageGroupSize,
    productInspectionAfterTotalPages
  );

  useEffect(() => {
    {
      fetchproductInspectionBefore(productInspectionBeforePage);
      fetchproductInspectionDuring(productInspectionDuringPage);
      fetchproductInspectionAfter(productInspectionAfterPage);
    }
  }, [
    productInspectionBeforePage,
    productInspectionDuringPage,
    productInspectionAfterPage,
  ]);

  return (
    <>
      <div className="border-bottom pb-4">
        <h5>🔍 검수 관리</h5>
        <p className="text-muted mb-0">
          상품 등록 후 검수 절차를 진행하며, 검수 대기 → 검수 중 → 검수 완료의
          단계별 상태를 관리합니다.
        </p>
      </div>

      <div className="border-bottom pb-4">
        <Row>
          <Col md="12" className="mt-4">
            <TabPane className="show fade bg-white shadow rounded p-4">
              <Tabs
                defaultActiveKey="home1"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home1" title="검수 대기">
                  <div className="table-responsive bg-white shadow rounded">
                    <Table className="mb-0 table-center table-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" className="border-bottom">
                            상품번호
                          </th>
                          <th scope="col" className="border-bottom">
                            상품명
                          </th>
                          <th scope="col" className="border-bottom">
                            판매자
                          </th>
                          <th scope="col" className="border-bottom">
                            구매자
                          </th>
                          <th scope="col" className="border-bottom"></th>
                        </tr>
                      </thead>
                      {productInspectionBefore.length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              검수 대기중인 물품이 없습니다.
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        productInspectionBefore.map((product, key) => (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{product.transactionId}</th>
                              <td>{product.productName}</td>
                              <td>{product.sellerName}</td>
                              <td>{product.buyerName}</td>
                              <td>
                                {" "}
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() =>
                                    startProductInsection(product.transactionId)
                                  }
                                >
                                  검수 시작
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      )}
                    </Table>
                  </div>
                  <div className="text-center mt-3">
                    <Pagination className="d-inline-flex justify-content-center">
                      <PaginationItem
                        disabled={productInspectionBeforeCurrentGroup === 0}
                      >
                        <PaginationLink
                          href="#"
                          previous
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionBeforePage(
                              (productInspectionBeforeCurrentGroup - 1) *
                                productInspectionBeforePageGroupSize
                            );
                          }}
                        >
                          이전
                        </PaginationLink>
                      </PaginationItem>

                      {[
                        ...Array(
                          productInspectionBeforeEndPage -
                            productInspectionBeforeStartPage
                        ),
                      ].map((_, index) => (
                        <PaginationItem
                          key={productInspectionBeforeStartPage + index}
                          active={
                            productInspectionBeforeStartPage + index ===
                            productInspectionBeforePage
                          }
                        >
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductInsepectionBeforePage(
                                productInspectionBeforeStartPage + index
                              );
                            }}
                          >
                            {productInspectionBeforeStartPage + index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={
                          productInspectionBeforeEndPage >=
                          productInspectionBeforeTotalPages
                        }
                      >
                        <PaginationLink
                          href="#"
                          next
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionBeforePage(
                              productInspectionBeforeCurrentGroup *
                                productInspectionBeforePageGroupSize +
                                productInspectionBeforePageGroupSize
                            );
                          }}
                        >
                          다음
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Tab>
                {/* 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 검수중 탭 */}
                <Tab eventKey="home2" title="검수 중">
                  <div className="table-responsive bg-white shadow rounded">
                    <Table className="mb-0 table-center table-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" className="border-bottom">
                            상품번호
                          </th>
                          <th scope="col" className="border-bottom">
                            상품명
                          </th>
                          <th scope="col" className="border-bottom">
                            판매자
                          </th>
                          <th scope="col" className="border-bottom">
                            구매자
                          </th>
                          <th scope="col" className="border-bottom"></th>
                          <th scope="col" className="border-bottom"></th>
                        </tr>
                      </thead>
                      {productInspectionDuring.length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              검수 중인 물품이 없습니다.
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        productInspectionDuring.map((product, key) => (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{product.transactionId}</th>
                              <td>{product.productName}</td>
                              <td>{product.sellerName}</td>
                              <td>{product.buyerName}</td>
                              <td>
                                {" "}
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    passProductInsection(product.transactionId)
                                  }
                                >
                                  통과
                                </button>
                              </td>
                              <td>
                                {" "}
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    failProductInsection(product.transactionId)
                                  }
                                >
                                  실패
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      )}
                    </Table>
                  </div>
                  <div className="text-center mt-3">
                    <Pagination className="d-inline-flex justify-content-center">
                      <PaginationItem
                        disabled={productInspectionDuringCurrentGroup === 0}
                      >
                        <PaginationLink
                          href="#"
                          previous
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionDuringPage(
                              (productInspectionDuringCurrentGroup - 1) *
                                productInspectionDuringPageGroupSize
                            );
                          }}
                        >
                          이전
                        </PaginationLink>
                      </PaginationItem>

                      {[
                        ...Array(
                          productInspectionDuringEndPage -
                            productInspectionDuringStartPage
                        ),
                      ].map((_, index) => (
                        <PaginationItem
                          key={productInspectionDuringStartPage + index}
                          active={
                            productInspectionDuringStartPage + index ===
                            productInspectionDuringPage
                          }
                        >
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductInsepectionDuringPage(
                                productInspectionDuringStartPage + index
                              );
                            }}
                          >
                            {productInspectionDuringStartPage + index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={
                          productInspectionDuringEndPage >=
                          productInspectionDuringTotalPages
                        }
                      >
                        <PaginationLink
                          href="#"
                          next
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionDuringPage(
                              productInspectionDuringCurrentGroup *
                                productInspectionDuringPageGroupSize +
                                productInspectionDuringPageGroupSize
                            );
                          }}
                        >
                          다음
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Tab>
                {/* 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 검수 완료 탭 */}
                <Tab eventKey="home3" title="검수 완료">
                  <div className="table-responsive bg-white shadow rounded">
                    <Table className="mb-0 table-center table-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" className="border-bottom">
                            상품번호
                          </th>
                          <th scope="col" className="border-bottom">
                            상품명
                          </th>
                          <th scope="col" className="border-bottom">
                            판매자
                          </th>
                          <th scope="col" className="border-bottom">
                            구매자
                          </th>
                          <th scope="col" className="border-bottom">
                            상태
                          </th>
                        </tr>
                      </thead>
                      {productInspectionAfter.length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              검수 완료된 물품이 없습니다.
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        productInspectionAfter.map((product, key) => (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{product.transactionId}</th>
                              <td>{product.productName}</td>
                              <td>{product.sellerName}</td>
                              <td>{product.buyerName}</td>
                              <td>
                                {product.transactionStatusBuyer ===
                                "검수완료" ? (
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      deliveryProductInsection(
                                        product.transactionId
                                      )
                                    }
                                  >
                                    배송 시작
                                  </button>
                                ) : product.transactionStatusSeller ===
                                  "검수실패" ? (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      returnProductInsection(
                                        product.transactionId
                                      )
                                    }
                                  >
                                    반송 처리
                                  </button>
                                ) : (
                                  <p className="text-muted mb-0">처리완료</p>
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
                      <PaginationItem
                        disabled={productInspectionAfterCurrentGroup === 0}
                      >
                        <PaginationLink
                          href="#"
                          previous
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionAfterPage(
                              (productInspectionAfterCurrentGroup - 1) *
                                productInspectionAfterPageGroupSize
                            );
                          }}
                        >
                          이전
                        </PaginationLink>
                      </PaginationItem>

                      {[
                        ...Array(
                          productInspectionAfterEndPage -
                            productInspectionAfterStartPage
                        ),
                      ].map((_, index) => (
                        <PaginationItem
                          key={productInspectionAfterStartPage + index}
                          active={
                            productInspectionAfterStartPage + index ===
                            productInspectionAfterPage
                          }
                        >
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductInsepectionAfterPage(
                                productInspectionAfterStartPage + index
                              );
                            }}
                          >
                            {productInspectionAfterStartPage + index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={
                          productInspectionAfterEndPage >=
                          productInspectionAfterTotalPages
                        }
                      >
                        <PaginationLink
                          href="#"
                          next
                          onClick={(e) => {
                            e.preventDefault();
                            setProductInsepectionAfterPage(
                              productInspectionAfterCurrentGroup *
                                productInspectionAfterPageGroupSize +
                                productInspectionAfterPageGroupSize
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InspectionPage;
