import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Slider from "react-slick";
import { Heart } from "react-feather";
import { useUser } from "../userContext";

// Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import bg1 from "../assets/images/shop/bg1.jpg";
import fea1 from "../assets/images/shop/fea1.jpg";
import fea2 from "../assets/images/shop/fea2.jpg";
import fea3 from "../assets/images/shop/fea3.jpg";
import fashion from "../assets/images/shop/categories/fashion.jpg";
import sports from "../assets/images/shop/categories/sports.jpg";
import music from "../assets/images/shop/categories/music.jpg";
import furniture from "../assets/images/shop/categories/furniture.jpg";
import electronics from "../assets/images/shop/categories/electronics.jpg";
import mobile from "../assets/images/shop/categories/mobile.jpg";
import ctaImg from "../assets/images/shop/cta.jpg";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const Main = ({}) => {
  const items = [
    {
      image: bg1,
      class: "slider-rtl-2",
      titleLine1: "Moa",
      titleLine2: "모두의 아이템",
      desc: "다양한 카테고리에서 원하는 아이템을 찾아보세요.",
      link: "#",
    },
  ];

  const { userInfo, setUserInfo } = useUser(); // 전역 상태 사용
  const [cardData] = useState([{ img: fea1 }, { img: fea2 }, { img: fea3 }]);

  // 1. Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed Most Viewed

  const [products1, setProducts1] = useState([]);

  useEffect(() => {
    axios
      .get(ApiUrl + "/api/product/mostview")
      .then((response) => {
        setProducts1(response.data);
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
      });
  }, []);

  // 2. Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular Most Popular
  const [products2, setProducts2] = useState([]);

  useEffect(() => {
    axios
      .get(ApiUrl + "/api/product/likeview")
      .then((response) => {
        setProducts2(response.data);
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
      });
  }, []);

  // 3. recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts recentproducts
  const [products3, setProducts3] = useState([]);

  useEffect(() => {
    axios
      .get(ApiUrl + "/api/product/recent")
      .then((response) => {
        setProducts3(response.data);
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
      });
  }, []);

  const [cateData] = useState([
    { img: fashion, title: "의류", link: "/category/1" },
    { img: sports, title: "신발", link: "/category/2" },
    { img: music, title: "가방", link: "/category/3" },
    {
      img: furniture,
      title: "액세서리",
      link: "/category/4",
    },
    {
      img: electronics,
      title: "패션 잡화",
      link: "/category/5",
    },
    {
      img: mobile,
      title: "라이프 스타일",
      link: "/category/6",
    },
  ]);

  const settings = {
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    draggable: true,
    pauseOnHover: true,
  };

  useEffect(() => {
    const e1 = document.getElementsByClassName("slick-slide");
    for (let i = 0; i < 3; i++) {
      if (i === 0) e1[i].style.background = `url(${bg1}) center center`;
    }
  }, []);

  // 찜 목록 등록
  const wishConfirm = async (email, product_id) => {
    const isCofirm = window.confirm("해당 상품을 찜 하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.post(ApiUrl + "/api/wishlist/regist", {
          email,
          product_id,
        });

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

  return (
    <>
      <section className="home-slider position-relative">
        {/* // -------------------- section ------------------------ */}
        <Slider className="carousel slide carousel-fade" {...settings}>
          {items.map((item, key) => (
            <li
              key={key}
              className={`bg-home slider-rtl-2 d-flex align-items-center ${item.class}`}
              style={{ background: `url(${item.image}) center center` }}
            >
              <Container>
                <Row className="align-items-center mt-5">
                  <Col lg={7} md={7} className="slider-desc">
                    <div className="title-heading mt-4">
                      <h1 className="display-4 fw-bold mb-3 text-black">
                        {item.titleLine1} <br /> {item.titleLine2}
                      </h1>
                      <p className="para-desc text-black">{item.desc}</p>
                      <div className="mt-4">
                        {/* <Link to={item.link} className="btn btn-soft-primary">
                          자세히보기
                        </Link> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </li>
          ))}
        </Slider>
      </section>
      {/* // -------------------- TopCategoris ------------------------ */}
      <Container className="mt-100 mt-60">
        <Row>
          <Col xs={12}>
            <h4 className="mb-0">Category🔖</h4>
          </Col>
        </Row>

        <Row>
          {cateData.map((item, key) => (
            <Col key={key} lg={2} md={4} xs={6} className="mt-4 pt-2">
              <Card className="features feature-primary explore-feature border-0 rounded text-center">
                <CardBody>
                  <img
                    src={item.img}
                    className="avatar avatar-small rounded-circle shadow-md"
                    alt=""
                  />
                  <div className="content mt-3">
                    <h6 className="mb-0">
                      <Link to={item.link} className="title text-dark">
                        {item.title}
                      </Link>
                    </h6>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <section className="section">
        {/* // -------------------- MostViewdProducts ------------------------ */}
        <Container>
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">Most Viewed👀</h5>
            </Col>
          </Row>

          <Row>
            {products1.map((product, key) => (
              <Col key={key} lg={3} md={6} xs={12} className="mt-4 pt-2">
                <Card className="shop-list border-0 position-relative">
                  <ul className="label list-unstyled mb-0">
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
                      <img
                        src={
                          product?.product_image?.length > 0
                            ? product.product_image[0]
                            : "https://moa-upload-files.s3.ap-northeast-2.amazonaws.com/products/noImage.png"
                        }
                        className="img-fluid"
                      />
                    </Link>
                    {userInfo ? (
                      <ul className="list-unstyled shop-icons">
                        <li>
                          <Link
                            to="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                          >
                            <Heart
                              className="icons"
                              onClick={() =>
                                wishConfirm(userInfo.email, product.product_id)
                              }
                            />
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </div>

                  <CardBody className="content pt-4 p-2">
                    <Link
                      to={`/detail/${product.category_id}/${product.product_id}`}
                      className="text-dark product-name h6"
                    >
                      {product.product_name.length > 11
                        ? product.product_name.substring(0, 11) + "..."
                        : product.product_name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-muted small fst-italic mb-0 mt-1">
                        {product.product_price.toLocaleString()}원
                      </h6>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* // -------------------- Popluer ------------------------ */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">Most Popular🔥</h5>
            </Col>
          </Row>

          <Row>
            {products2.map((product, key) => (
              <Col key={key} lg={3} md={6} xs={12} className="mt-4 pt-2">
                <Card className="shop-list border-0 position-relative overflow-hidden shadow">
                  <ul className="label list-unstyled mb-0">
                    <li>
                      <Link
                        to="#"
                        className="badge badge-link rounded-pill bg-warning"
                      >
                        Hot
                      </Link>
                    </li>
                  </ul>
                  <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link
                      to={`/detail/${product.category_id}/${product.product_id}`}
                    >
                      <img
                        src={
                          product?.product_image?.length > 0
                            ? product.product_image[0]
                            : "https://moa-upload-files.s3.ap-northeast-2.amazonaws.com/products/noImage.png"
                        }
                        className="img-fluid"
                      />
                    </Link>
                    {userInfo ? (
                      <ul className="list-unstyled shop-icons">
                        <li>
                          <Link
                            to="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                          >
                            <Heart
                              className="icons"
                              onClick={() =>
                                wishConfirm(userInfo.email, product.product_id)
                              }
                            />
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                  <CardBody className="content pt-4 p-2">
                    <Link
                      to={`/detail/${product.category_id}/${product.product_id}`}
                      className="text-dark product-name h6"
                    >
                      {product.product_name.length > 11
                        ? product.product_name.substring(0, 11) + "..."
                        : product.product_name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-muted small fst-italic mb-0 mt-1">
                        {product.product_price.toLocaleString()}원
                      </h6>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* // -------------------- cta ------------------------ */}
        <Container fluid className="mt-100 mt-60">
          <div
            className="rounded py-5"
            style={{ background: `url(${ctaImg}) fixed` }}
          >
            <Container>
              <Row>
                <Col xs={12}>
                  <div className="section-title">
                    <h2 className="fw-bold mb-4">
                      원하는 아이템을 미리 찜하세요! <br /> 특별한 득템의 기회!
                    </h2>
                    <p className="para-desc para-white text-muted mb-0">
                      지금 로그인하고, <br />
                      인기 상품을 먼저 만나보세요.
                    </p>
                    <div className="mt-4"></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
        {/* // -------------------- recentproducts ------------------------ */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">New Uploads🚀</h5>
            </Col>
          </Row>

          <Row>
            {products3.map((product, key) => (
              <Col key={key} lg={3} md={6} xs={12} className="mt-4 pt-2">
                <Card className="shop-list border-0 position-relative overflow-hidden shadow">
                  <ul className="label list-unstyled mb-0">
                    <li>
                      <Link
                        to="#"
                        className="badge badge-link rounded-pill bg-primary"
                      >
                        New
                      </Link>
                    </li>
                  </ul>
                  <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link
                      to={`/detail/${product.category_id}/${product.product_id}`}
                    >
                      <img
                        src={
                          product?.product_image?.length > 0
                            ? product.product_image[0]
                            : "https://moa-upload-files.s3.ap-northeast-2.amazonaws.com/products/noImage.png"
                        }
                        className="img-fluid"
                      />
                    </Link>
                    {userInfo ? (
                      <ul className="list-unstyled shop-icons">
                        <li>
                          <Link
                            to="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                          >
                            <Heart
                              className="icons"
                              onClick={() =>
                                wishConfirm(userInfo.email, product.product_id)
                              }
                            />
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                  <CardBody className="content pt-4 p-2">
                    <Link
                      to={`/detail/${product.category_id}/${product.product_id}`}
                      className="text-dark product-name h6"
                    >
                      {product.product_name.length > 11
                        ? product.product_name.substring(0, 11) + "..."
                        : product.product_name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-dark small fst-italic mb-0 mt-1">
                        {product.product_price.toLocaleString()}원
                      </h6>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Main;
