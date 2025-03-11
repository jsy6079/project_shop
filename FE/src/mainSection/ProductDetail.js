import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  NavItem,
  TabContent,
  TabPane,
  Label,
  Card,
  CardBody,
  Badge,
  Alert,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Heart, MessageCircle } from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import product3 from "../assets/images/shop/product/s3.jpg";
import product8 from "../assets/images/shop/product/s8.jpg";

const ProductDetail = ({ user }) => {
  const { categoryId } = useParams();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [viewProducts, setViewProducts] = useState([]); // 리뷰
  const [reviewPage, setReviewPage] = useState(0); // 리뷰 목록 페이지
  const [reviewTotalPages, setReviewTotalPages] = useState(1); // 리뷰 전체 페이지 수
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 저장
  const [reviewScore, setReviewScore] = useState(5); // 리뷰 점수 저장

  // 카테고리 별 데이터 API
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:8080/api/product/category/${categoryId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("API 호출 중 에러 발생:", error);
        });
    }
  }, [categoryId]);

  // 상세보기 API + 리뷰 email 값 호출
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8080/api/product/detail/${productId}`)
        .then((response) => {
          setProducts2(response.data);
          const productData = response.data[0]; // 배열에서 첫번째 상품
          fetchReviewList(productData.user_email, 0); // 리뷰 목록 호출
        })
        .catch((error) => {
          console.error("API 호출 중 에러 발생:", error);
        });
    }
  }, [productId]);

  // 리뷰 페이징
  const reviewPageGroupSize = 5;
  const reviewCurrentGroup = Math.floor(reviewPage / reviewPageGroupSize);
  const reviewStartPage = reviewCurrentGroup * reviewPageGroupSize;
  const reviewEndPage = Math.min(
    reviewStartPage + reviewPageGroupSize,
    reviewTotalPages
  );

  // 리뷰 목록 조회 (상세페이지에서는 product 테이블의 user_email 값)
  const fetchReviewList = async (user_email, pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/review/view/${user_email}?page=${pageNumber}&size=5`
      );
      setViewProducts(response.data.content);
      setReviewTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("리뷰 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const settings = {
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: false,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  // 찜 목록 등록
  const wishConfirm = async (email, product_id) => {
    const isCofirm = window.confirm("해당 상품을 찜 하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/wishlist/regist",
          {
            email,
            product_id,
          }
        );

        if (response.status === 200) {
          alert(response.data);
        } else {
          alert("찜 목록 추가 실패");
        }
      } catch (error) {
        console.log("찜 실패", error);
        alert("서버 오류");
      }
    }
  };

  // 리뷰 등록
  const reviewConfirm = async (
    email,
    product_id,
    seller_email,
    reviewContent,
    reviewScore
  ) => {
    try {
      // DTO 에 맞춰 꼭 명칭 변경해주기!
      const response = await axios.post(
        "http://localhost:8080/api/review/regist",
        {
          buyer_email: email,
          product_id: product_id,
          seller_email: seller_email,
          review_text: reviewContent,
          review_score: reviewScore,
        }
      );

      if (response.status === 200) {
        alert(response.data);
        setReviewContent(""); // 입력 초기화
        setReviewScore(5); // 별점 초기화
        setReviewPage(0); // 첫 페이지로 이동
        fetchReviewList(products2[0].user_email, 0); // ⭐ 리뷰 새로고침
      } else {
        alert("리뷰 작성 실패");
      }
    } catch (error) {
      console.log("리뷰 작성 실패", error);
      alert("서버 오류");
    }
  };

  useEffect(() => {
    if (products2.length > 0 && products2[0]?.user_email) {
      fetchReviewList(products2[0].user_email, reviewPage);
    }
  }, [reviewPage, products2]);

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
    <>
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
      {/* 상세보기  */}
      <section className="section pb-0">
        <Container>
          {products2.map((product, key) => (
            <Row key={key} className="align-items-center">
              <Col md={5}>
                <Slider {...settings}>
                  {products.map((product, key) => (
                    <div key={key}>
                      <img src={product3} className="img-fluid rounded" />
                    </div>
                  ))}
                </Slider>
              </Col>

              <Col md={7} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ms-md-4">
                  <h4 className="title">{product.product_name}</h4>
                  <Badge color="primary"> {product.product_status} </Badge>
                  <h5 className="text-muted">
                    {product.product_price.toLocaleString()}원
                  </h5>
                  <h6 className="text-muted">
                    {product.user_name}님의 제품입니다.
                  </h6>
                  <ul className="list-unstyled text-warning h5 mb-0">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <li key={i} className="list-inline-item">
                          <i className="mdi mdi-star"></i>
                        </li>
                      ))}
                  </ul>

                  <h5 className="mt-4 py-2">상품 상세설명 :</h5>
                  <p className="text-muted">{product.product_description}</p>

                  <Row className="mt-4 pt-2">
                    <Col lg={6} xs={12}>
                      {product.size_value && (
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0">사이즈: </h6>
                          <ul className="list-unstyled mb-0 ms-3">
                            <li className="btn btn-icon btn-soft-primary">
                              {product.size_value}
                            </li>
                          </ul>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <div className="mt-4 pt-2">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={() => {
                        if (!user) {
                          alert("로그인 후 이용 가능합니다.");
                        } else {
                          console.log("DB 연결 준비");
                        }
                      }}
                    >
                      구매하기
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-soft-danger ms-2"
                      onClick={() => {
                        if (!user) {
                          alert("로그인 후 이용 가능합니다.");
                        } else {
                          {
                            wishConfirm(user.email, product.product_id);
                          }
                        }
                      }}
                    >
                      찜하기{" "}
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Container>

        {/* 상세보기 설명 란 */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <ul className="nav nav-pills shadow flex-column flex-sm-row d-md-inline-flex mb-0 p-1 bg-white rounded position-relative overflow-hidden">
                <NavItem className="m-1">
                  <div className="text-center">
                    <h6 className="mb-0">⭐️ 해당 판매자 리뷰 내역 ⭐️</h6>
                  </div>
                </NavItem>
              </ul>

              <TabContent className="mt-5" activeTab={activeTab}>
                <TabPane className="card border-0 fade show" tabId="1">
                  <Row>
                    <Col lg={6}>
                      {/*  리뷰 리뷰 등록등록록 리뷰 리뷰 등록등록록 리뷰 리뷰 등록등록록*/}
                      {viewProducts.map((review, key) => (
                        <ul className="media-list list-unstyled mb-0" key={key}>
                          <li>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <div className="pe-3" to="#">
                                  <img
                                    src={review.buyer_name_img}
                                    className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                    alt="img"
                                  />
                                </div>

                                <div className="flex-1 commentor-detail">
                                  <h6 className="mb-0">
                                    <div className="text-dark media-heading">
                                      {review.buyer_name}
                                      <span className="text-secondary media-heading">
                                        {" "}
                                        ({review.product_name})
                                      </span>
                                    </div>
                                  </h6>
                                  <small className="text-muted">
                                    {formatDate(review.review_time)}
                                  </small>
                                </div>
                              </div>
                              <ul className="list-unstyled mb-0">
                                {Array(review.review_score)
                                  .fill()
                                  .map((_, i) => (
                                    <li key={i} className="list-inline-item">
                                      <i className="mdi mdi-star text-warning"></i>
                                    </li>
                                  ))}
                                {Array(5 - review.review_score)
                                  .fill()
                                  .map((_, i) => (
                                    <li
                                      key={`empty-${i}`}
                                      className="list-inline-item"
                                    >
                                      <i className="mdi mdi-star-outline text-warning"></i>{" "}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="mt-3">
                              <p className="text-muted fst-italic p-3 bg-light rounded">
                                {review.review_text}
                              </p>
                            </div>
                          </li>
                        </ul>
                      ))}
                      {/*  리뷰 리뷰 등록등록록 리뷰 리뷰 등록등록록 리뷰 리뷰 등록등록록*/}
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
                    </Col>

                    <Col lg={6} className="mt-4 mt-lg-0 pt-2 pt-lg-0">
                      {products2.map((product, key) => (
                        <form className="ms-lg-4">
                          <Row>
                            <Col xs={12}>
                              <h5>리뷰 작성</h5>
                            </Col>
                            <Col xs={12} className="mt-4">
                              <h6 className="small fw-bold">별점</h6>
                              <select
                                className="form-select w-auto"
                                value={reviewScore}
                                onChange={(e) =>
                                  setReviewScore(Number(e.target.value))
                                } // 숫자로 변환
                              >
                                <option value={5}>5점 (★★★★★)</option>
                                <option value={4}>4점 (★★★★☆)</option>
                                <option value={3}>3점 (★★★☆☆)</option>
                                <option value={2}>2점 (★★☆☆☆)</option>
                                <option value={1}>1점 (★☆☆☆☆)</option>
                              </select>
                            </Col>
                            <Col md={12} className="mt-3">
                              <div className="mb-3">
                                <Label className="form-label">상세내용:</Label>
                                <div className="form-icon position-relative">
                                  <MessageCircle className="fea icon-sm icons" />
                                  <textarea
                                    id="message"
                                    placeholder="비방,욕설이 담긴 글은 관리자에 의해 삭제될수있습니다. (100자 이내)"
                                    rows="5"
                                    name="message"
                                    className="form-control ps-5"
                                    value={reviewContent}
                                    maxLength={100}
                                    onChange={(e) =>
                                      setReviewContent(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </Col>

                            <Col md={12}>
                              <div className="send d-grid">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    if (!user) {
                                      alert("로그인 후 이용 가능합니다.");
                                    } else {
                                      {
                                        reviewConfirm(
                                          user.email,
                                          product.product_id,
                                          product.user_email,
                                          reviewContent,
                                          reviewScore
                                        );
                                      }
                                    }
                                  }}
                                >
                                  작성하기
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      ))}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
        {/* 관련 상품 */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">관련 상품</h5>
            </Col>

            <Col xs={12} className="mt-4">
              <Slider {...settings2} className="owl-carousel owl-theme">
                {products.map((product, key) => (
                  <div key={key} style={{ marginLeft: 5, marginRight: 5 }}>
                    <Card className="shop-list border-0 position-relative overflow-hidden m-2">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <Link
                            to="#"
                            className="badge badge-link rounded-pill bg-danger"
                          >
                            Hot
                          </Link>
                        </li>
                      </ul>

                      <ul className="label list-unstyled mb-0">
                        <li>
                          <Link
                            to="#"
                            className="badge badge-link rounded-pill bg-primary"
                          >
                            New
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="#"
                            className="badge badge-link rounded-pill bg-success"
                          >
                            Pop
                          </Link>
                        </li>
                      </ul>

                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <Link
                          to={`/detail/${product.category_id}/${product.product_id}`}
                        >
                          <img src={product8} className="img-fluid" />
                        </Link>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <Link
                              to="#"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i>
                                {user ? (
                                  <Heart
                                    className="icons"
                                    onClick={() =>
                                      wishConfirm(
                                        user.email,
                                        product.product_id
                                      )
                                    }
                                  />
                                ) : null}
                              </i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <CardBody className="content pt-4 p-2">
                        <Link
                          to={`/detail/${product.category_id}/${product.product_id}`}
                          className="text-dark product-name h6"
                        >
                          {product.product_name}
                        </Link>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-muted small fst-italic mb-0 mt-1">
                            {product.product_price.toLocaleString()}원
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
                            <li className="list-inline-item me-1">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item me-1">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item me-1">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item me-1">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item me-1">
                              <i className="mdi mdi-star"></i>
                            </li>
                          </ul>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      {/* 하단 블록 */}
      <div className="container-fluid mt-100 mt-60 px-0">
        <div className="py-5 bg-light d-flex justify-content-center"></div>
      </div>
    </>
  );
};

export default ProductDetail;
