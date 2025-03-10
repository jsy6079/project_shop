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
import classnames from "classnames";

const AccountManagement = ({ user }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [wishProducts, setWishProducts] = useState([]); // 찜
  const [viewProducts, setViewProducts] = useState([]); // 리뷰
  const [userInfo, setUserInfo] = useState(user); // userInfo로 유저 값 가져오기

  const [wishPage, setWishPage] = useState(0); // 찜 목록 페이지
  const [wishTotalPages, setWishTotalPages] = useState(1); // 찜 전체 페이지 수

  const [reviewPage, setReviewPage] = useState(0); // 리뷰 목록 페이지
  const [reviewTotalPages, setReviewTotalPages] = useState(1); // 리뷰 전체 페이지 수

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // 점수에 따른 거래 등급 부여
  function reviewGrade(score) {
    if (score >= 0 && score <= 20) {
      return "실버";
    } else if (score >= 21 && score <= 40) {
      return "골드";
    } else if (score >= 41 && score <= 60) {
      return "플래티넘";
    } else if (score >= 61 && score <= 80) {
      return "VIP";
    }
  }

  // 거래 상태 별 뱃지 스타일 적용
  function getBadgeColor(product_status) {
    switch (product_status) {
      case "거래가능":
        return "primary";

      case "거래불가":
        return "danger";

      case "거래종료":
        return "secondary";
    }
  }

  // 전화번호, 주소 변경
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 전화번호, 주소 수정
  const handleSave = async () => {
    if (!userInfo.phone.trim()) {
      alert("전화번호를 입력해 주세요.");
      return;
    }

    if (!userInfo.address.trim()) {
      alert("주소를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/update",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("수정 실패:", error);
      console.log(userInfo);
      alert("서버오류");
    }
  };

  // 찜 페이징

  const wishPageGroupSize = 5;
  const wishCurrentGroup = Math.floor(wishPage / wishPageGroupSize);
  const wishStartPage = wishCurrentGroup * wishPageGroupSize;
  const wishEndPage = Math.min(
    wishStartPage + wishPageGroupSize,
    wishTotalPages
  );

  // 리뷰 페이징징
  const reviewPageGroupSize = 5;
  const reviewCurrentGroup = Math.floor(reviewPage / reviewPageGroupSize);
  const reviewStartPage = reviewCurrentGroup * reviewPageGroupSize;
  const reviewEndPage = Math.min(
    reviewStartPage + reviewPageGroupSize,
    reviewTotalPages
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

  // 리뷰 목록 조회
  const fetchReviewList = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/review/view/${userInfo.email}?page=${pageNumber}&size=5`
      );
      setViewProducts(response.data.content);
      setReviewTotalPages(response.data.totalPages); // 리뷰의 totalPages 따로 관리
    } catch (error) {
      console.error("리뷰 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchWishList(wishPage); // 찜 목록 페이지 변화 감지
    }
  }, [userInfo?.email, wishPage]);

  useEffect(() => {
    if (userInfo?.email) {
      fetchReviewList(reviewPage); // 리뷰 목록 페이지 변화 감지
    }
  }, [userInfo?.email, reviewPage]);

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
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <Container>
          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">내 정보</li>{" "}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <React.Fragment>
        <section className="section">
          <Container>
            <Row className="align-items-end">
              <Col md={4}>
                <div className="d-flex align-items-center">
                  <img
                    src={userInfo.imgUrl}
                    className="avatar avatar-md-md rounded-circle"
                    alt=""
                  />
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">반갑습니다,😊 </h6>
                    <h5 className="mb-0">{userInfo.username} 님</h5>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={4} className="mt-4 pt-2">
                <ul
                  className="nav nav-pills nav-justified flex-column rounded shadow p-3 mb-0"
                  id="pills-tab"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "1" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("1")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-user h5 align-middle me-2 mb-0"></i>{" "}
                          계정 관리
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="mt-2">
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "2" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("2")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-heart h5 align-middle me-2 mb-0"></i>{" "}
                          찜 목록
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="mt-2">
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "3" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("3")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-credit-card h5 align-middle me-2 mb-0"></i>{" "}
                          마일리지
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="mt-2">
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "4" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("4")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-store h5 align-middle me-2 mb-0"></i>{" "}
                          판매물품 등록
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="mt-2">
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "5" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("5")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-transaction h5 align-middle me-2 mb-0"></i>{" "}
                          진행중인 거래
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="mt-2">
                    <NavLink
                      to="#"
                      className={classnames(
                        { active: activeTab === "6" },
                        "rounded"
                      )}
                      onClick={() => toggleTab("6")}
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-clipboard-notes h5 align-middle me-2 mb-0"></i>{" "}
                          구매/판매 내역
                        </h6>
                      </div>
                    </NavLink>
                  </NavItem>
                </ul>
              </Col>

              <Col md={8} xs={12} className="mt-4 pt-2">
                <TabContent activeTab={activeTab}>
                  {/* 내 계정 내 계정 내 계정 내 계정 내 계정 내 계정  내 계정 내 계정 내 계정  내 계정 내 계정 내 계정  내 계정 내 계정 내 계정  */}
                  <TabPane
                    className="fade bg-white show shadow rounded p-4"
                    tabId="1"
                  >
                    <h6 className="text-dark">
                      {userInfo.username} 회원님의 등급은{" "}
                      <span className="text-info">
                        {reviewGrade(userInfo.score)}
                      </span>
                      <span className="text-dark"> 등급 입니다.</span>
                      <p className="text-secondary">
                        리뷰 점수 : {userInfo.score}점
                      </p>
                    </h6>
                    <h6 className="text-dark mb-0">
                      내 마일리지 :
                      <span className="text-primary"> {userInfo.money}</span>
                      <span className="text-dark"> 원</span>
                    </h6>
                  </TabPane>

                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="1"
                  >
                    <Form>
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label className="form-label">이메일</Label>
                            <div className="form-icon position-relative">
                              <Mail className="fea icon-sm icons" />
                              <input
                                name="email"
                                id="email"
                                type="text"
                                className="form-control ps-5"
                                defaultValue={userInfo.email}
                                readOnly
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label className="form-label">전화번호</Label>
                            <div className="form-icon position-relative">
                              <Phone className="fea icon-sm icons" />
                              <input
                                name="phone"
                                id="phone"
                                type="text"
                                className="form-control ps-5"
                                value={userInfo.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="mb-3">
                            <Label className="form-label">주소</Label>
                            <div className="form-icon position-relative">
                              <MapPin className="fea icon-sm icons" />
                              <input
                                name="address"
                                id="address"
                                type="text"
                                className="form-control ps-5"
                                value={userInfo.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>

                        <div className="col-lg-12 mt-2 mb-0">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                          >
                            변경사항 수정하기
                          </button>
                        </div>
                      </Row>
                    </Form>
                  </TabPane>

                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="1"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <Table className="mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              리뷰 작성자
                            </th>
                            <th scope="col" className="border-bottom">
                              리뷰 내용
                            </th>
                            <th scope="col" className="border-bottom">
                              점수
                            </th>
                          </tr>
                        </thead>
                        {viewProducts.map((review, key) => (
                          <tbody>
                            <tr>
                              <th scope="row">{review.buyer_name}</th>
                              <td>{review.review_text}</td>
                              <td className="text-success">
                                {review.review_score}
                              </td>
                              <button className="dropdown-item">
                                <i className="uil uil-multiply align-middle me-1"></i>
                              </button>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                      <div className="text-center mt-3">
                        <Pagination className="d-inline-flex justify-content-center">
                          <PaginationItem disabled={reviewCurrentGroup === 0}>
                            <PaginationLink
                              href="#"
                              previous
                              onClick={(e) => {
                                e.preventDefault();
                                setReviewPage(
                                  (reviewCurrentGroup - 1) * reviewPageGroupSize
                                );
                              }}
                            >
                              이전
                            </PaginationLink>
                          </PaginationItem>

                          {[...Array(reviewEndPage - reviewStartPage)].map(
                            (_, index) => (
                              <PaginationItem
                                key={reviewStartPage + index}
                                active={reviewStartPage + index === reviewPage}
                              >
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setReviewPage(reviewStartPage + index);
                                  }}
                                >
                                  {reviewStartPage + index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}

                          <PaginationItem
                            disabled={reviewEndPage >= reviewTotalPages}
                          >
                            <PaginationLink
                              href="#"
                              next
                              onClick={(e) => {
                                e.preventDefault();
                                setReviewPage(
                                  reviewCurrentGroup * reviewPageGroupSize +
                                    reviewPageGroupSize
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
                  {/* 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록 찜 목록   */}
                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="2"
                  >
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
                              <td>
                                {product.product_price.toLocaleString()}원
                              </td>
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
                                    deleteWish(
                                      userInfo.email,
                                      product.product_id
                                    )
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
                              setWishPage(
                                (wishCurrentGroup - 1) * wishPageGroupSize
                              );
                            }}
                          >
                            이전
                          </PaginationLink>
                        </PaginationItem>

                        {[...Array(wishEndPage - wishStartPage)].map(
                          (_, index) => (
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
                          )
                        )}

                        <PaginationItem
                          disabled={wishEndPage >= wishTotalPages}
                        >
                          <PaginationLink
                            href="#"
                            next
                            onClick={(e) => {
                              e.preventDefault();
                              setWishPage(
                                wishCurrentGroup * wishPageGroupSize +
                                  wishPageGroupSize
                              );
                            }}
                          >
                            다음
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </TabPane>

                  {/* 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지 마일리지  */}
                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="3"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <Table className="table mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Product Name
                            </th>
                            <th scope="col" className="border-bottom">
                              Description
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Quick heal</th>
                            <td className="text-muted">
                              It is said that song composers of the past <br />{" "}
                              used dummy texts as lyrics when writing <br />{" "}
                              melodies in order to have a 'ready-made' <br />{" "}
                              text to sing with the melody.
                            </td>
                            <td className="text-success">Downloaded</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </TabPane>
                  {/* 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기 판매등록 하기   */}
                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="4"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <Table className="mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Order no.
                            </th>
                            <th scope="col" className="border-bottom">
                              Date
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                            <th scope="col" className="border-bottom">
                              Total
                            </th>
                            <th scope="col" className="border-bottom">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">7107</th>
                            <td>1st November 2020</td>
                            <td className="text-success">Delivered</td>
                            <td>
                              $ 320{" "}
                              <span className="text-muted">for 2items</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8007</th>
                            <td>4th November 2020</td>
                            <td className="text-muted">Processing</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8008</th>
                            <td>4th November 2020</td>
                            <td className="text-danger">Canceled</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </TabPane>
                  {/* 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래 진행중인 거래  */}

                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="5"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <Table className="mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Order no.
                            </th>
                            <th scope="col" className="border-bottom">
                              Date
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                            <th scope="col" className="border-bottom">
                              Total
                            </th>
                            <th scope="col" className="border-bottom">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">7107</th>
                            <td>1st November 2020</td>
                            <td className="text-success">Delivered</td>
                            <td>
                              $ 320{" "}
                              <span className="text-muted">for 2items</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8007</th>
                            <td>4th November 2020</td>
                            <td className="text-muted">Processing</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8008</th>
                            <td>4th November 2020</td>
                            <td className="text-danger">Canceled</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </TabPane>
                  {/* 구매/판매 내역 구매/판매 내역  구매/판매 내역  구매/판매 내역  구매/판매 내역  구매/판매 내역  구매/판매 내역  구매/판매 내역  구매/판매 내역   */}
                  <TabPane
                    className="show fade bg-white shadow rounded p-4"
                    tabId="6"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <Table className="mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Order no.
                            </th>
                            <th scope="col" className="border-bottom">
                              Date
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                            <th scope="col" className="border-bottom">
                              Total
                            </th>
                            <th scope="col" className="border-bottom">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">7107</th>
                            <td>1st November 2020</td>
                            <td className="text-success">Delivered</td>
                            <td>
                              $ 320{" "}
                              <span className="text-muted">for 2items</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8007</th>
                            <td>4th November 2020</td>
                            <td className="text-muted">Processing</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">8008</th>
                            <td>4th November 2020</td>
                            <td className="text-danger">Canceled</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <Link to="#" className="text-primary">
                                View <i className="uil uil-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    </>
  );
};

export default AccountManagement;
