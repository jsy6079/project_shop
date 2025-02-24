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
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  Heart,
  Eye,
  ShoppingCart,
  MessageCircle,
  User,
  Mail,
} from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client1 from "../assets/images/client/01.jpg";
import client2 from "../assets/images/client/02.jpg";

import product3 from "../assets/images/shop/product/s3.jpg";
import product8 from "../assets/images/shop/product/s8.jpg";

const ProductDetail = () => {
  const { categoryId } = useParams();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

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

  // 상세보기 API
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8080/api/product/detail/${productId}`)
        .then((response) => {
          setProducts2(response.data);
        })
        .catch((error) => {
          console.error("API 호출 중 에러 발생:", error);
        });
    }
  }, [productId]);

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
                    <Link to="#" className="btn btn-primary">
                      구매하기
                    </Link>
                    <Link to="shop-cart" className="btn btn-soft-danger ms-2">
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
                    <h6 className="mb-0">⭐️ 해당 판매자 평가 및 후기 ⭐️</h6>
                  </div>
                </NavItem>
              </ul>

              <TabContent className="mt-5" activeTab={activeTab}>
                <TabPane className="card border-0 fade show" tabId="1">
                  <Row>
                    <Col lg={6}>
                      <ul className="media-list list-unstyled mb-0">
                        <li>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link className="pe-3" to="#">
                                <img
                                  src={client1}
                                  className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                  alt="img"
                                />
                              </Link>
                              <div className="flex-1 commentor-detail">
                                <h6 className="mb-0">
                                  <Link
                                    to="#"
                                    className="text-dark media-heading"
                                  >
                                    Lorenzo Peterson
                                  </Link>
                                </h6>
                                <small className="text-muted">
                                  15th August, 2019 at 01:25 pm
                                </small>
                              </div>
                            </div>
                            <ul className="list-unstyled mb-0">
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted fst-italic p-3 bg-light rounded">
                              " Awesome product "
                            </p>
                          </div>
                        </li>

                        <li className="mt-4">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link className="pe-3" to="#">
                                <img
                                  src={client2}
                                  className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                  alt="img"
                                />
                              </Link>
                              <div className="flex-1 commentor-detail">
                                <h6 className="mb-0">
                                  <Link
                                    to="#"
                                    className="media-heading text-dark"
                                  >
                                    Tammy Camacho
                                  </Link>
                                </h6>
                                <small className="text-muted">
                                  15th August, 2019 at 05:44 pm
                                </small>
                              </div>
                            </div>
                            <ul className="list-unstyled mb-0">
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star text-warning"></i>
                              </li>{" "}
                              <li className="list-inline-item">
                                <i className="mdi mdi-star-outline text-warning"></i>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted fst-italic p-3 bg-light rounded mb-0">
                              " Good "
                            </p>
                          </div>
                        </li>
                      </ul>
                    </Col>

                    <Col lg={6} className="mt-4 mt-lg-0 pt-2 pt-lg-0">
                      <form className="ms-lg-4">
                        <Row>
                          <Col xs={12}>
                            <h5>Add your review:</h5>
                          </Col>
                          <Col xs={12} className="mt-4">
                            <h6 className="small fw-bold">Your Rating:</h6>
                            <Link to="#" className="d-inline-block me-3">
                              <ul className="list-unstyled mb-0 small">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>
                              </ul>
                            </Link>

                            <Link to="#" className="d-inline-block me-3">
                              <ul className="list-unstyled mb-0 small">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>
                              </ul>
                            </Link>

                            <Link to="#" className="d-inline-block me-3">
                              <ul className="list-unstyled mb-0 small">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>
                              </ul>
                            </Link>

                            <Link to="#" className="d-inline-block me-3">
                              <ul className="list-unstyled mb-0 small">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning"></i>
                                </li>
                              </ul>
                            </Link>

                            <Link to="#" className="d-inline-block">
                              <ul className="list-unstyled mb-0 small">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                              </ul>
                            </Link>
                          </Col>
                          <Col md={12} className="mt-3">
                            <div className="mb-3">
                              <Label className="form-label">Your Review:</Label>
                              <div className="form-icon position-relative">
                                <MessageCircle className="fea icon-sm icons" />
                                <textarea
                                  id="message"
                                  placeholder="Your Comment"
                                  rows="5"
                                  name="message"
                                  className="form-control ps-5"
                                  required=""
                                ></textarea>
                              </div>
                            </div>
                          </Col>

                          <div className="col-lg-6">
                            <div className="mb-3">
                              <Label className="form-label">
                                Name <span className="text-danger">*</span>
                              </Label>
                              <div className="form-icon position-relative">
                                <User className="fea icon-sm icons" />
                                <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  placeholder="Name"
                                  className="form-control ps-5"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label className="form-label">
                                Your Email{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <div className="form-icon position-relative">
                                <Mail className="fea icon-sm icons" />
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  name="email"
                                  className="form-control ps-5"
                                  required=""
                                />
                              </div>
                            </div>
                          </Col>

                          <Col md={12}>
                            <div className="send d-grid">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </form>
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
                        <Link to="shop-product-detail">
                          <img src={product8} className="img-fluid" />
                        </Link>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <Link
                              to="#"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i>
                                <Heart className="icons" />
                              </i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <CardBody className="content pt-4 p-2">
                        <Link
                          to="shop-product-detail"
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
