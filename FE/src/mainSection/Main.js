import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Slider from "react-slick";
import { Heart, Eye, ShoppingCart } from "react-feather";

// Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import bg1 from "../assets/images/shop/bg1.jpg";
import bg2 from "../assets/images/shop/bg2.jpg";
import bg3 from "../assets/images/shop/bg3.jpg";
import fea1 from "../assets/images/shop/fea1.jpg";
import fea2 from "../assets/images/shop/fea2.jpg";
import fea3 from "../assets/images/shop/fea3.jpg";

//
import product1 from "../assets/images/shop/product/s1.jpg";
import product2 from "../assets/images/shop/product/s2.jpg";
import product3 from "../assets/images/shop/product/s3.jpg";
import product4 from "../assets/images/shop/product/s4.jpg";
import product5 from "../assets/images/shop/product/s5.jpg";
import product6 from "../assets/images/shop/product/s6.jpg";
import product7 from "../assets/images/shop/product/s7.jpg";
import product8 from "../assets/images/shop/product/s8.jpg";

import prodtctOverlay1 from "../assets/images/shop/product/s-1.jpg";
import prodtctOverlay2 from "../assets/images/shop/product/s-2.jpg";
import prodtctOverlay3 from "../assets/images/shop/product/s-3.jpg";
import prodtctOverlay4 from "../assets/images/shop/product/s-4.jpg";
import prodtctOverlay5 from "../assets/images/shop/product/s-5.jpg";
import prodtctOverlay6 from "../assets/images/shop/product/s-6.jpg";
import prodtctOverlay7 from "../assets/images/shop/product/s-7.jpg";
import prodtctOverlay8 from "../assets/images/shop/product/s-8.jpg";

import fashion from "../assets/images/shop/categories/fashion.jpg";
import sports from "../assets/images/shop/categories/sports.jpg";
import music from "../assets/images/shop/categories/music.jpg";
import furniture from "../assets/images/shop/categories/furniture.jpg";
import electronics from "../assets/images/shop/categories/electronics.jpg";
import mobile from "../assets/images/shop/categories/mobile.jpg";

import product9 from "../assets/images/shop/product/s9.jpg";
import product10 from "../assets/images/shop/product/s10.jpg";
import product11 from "../assets/images/shop/product/s11.jpg";
import product12 from "../assets/images/shop/product/s12.jpg";

import prodtctOverlay9 from "../assets/images/shop/product/s-9.jpg";
import prodtctOverlay10 from "../assets/images/shop/product/s-10.jpg";
import prodtctOverlay11 from "../assets/images/shop/product/s-11.jpg";
import prodtctOverlay12 from "../assets/images/shop/product/s-12.jpg";

import ctaImg from "../assets/images/shop/cta.jpg";

import product13 from "../assets/images/shop/product/s13.jpg";
import product14 from "../assets/images/shop/product/s14.jpg";
import product15 from "../assets/images/shop/product/s15.jpg";
import product16 from "../assets/images/shop/product/s16.jpg";

import prodtctOverlay13 from "../assets/images/shop/product/s-13.jpg";
import prodtctOverlay15 from "../assets/images/shop/product/s-15.jpg";
import prodtctOverlay16 from "../assets/images/shop/product/s-16.jpg";

const Main = () => {
  const items = [
    {
      image: bg2,
      class: "slider-rtl-2",
      titleLine1: "광고1",
      titleLine2: "광고입니다",
      desc: "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.",
      link: "#",
    },
    {
      image: bg3,
      class: "slider-rtl-3",
      titleLine1: "광고2",
      titleLine2: "광고입니다다",
      desc: "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.",
      link: "#",
    },
    {
      image: bg1,
      class: "slider-rtl-1",
      titleLine1: "광고 3",
      titleLine2: "광고입니다",
      desc: "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.",
      link: "#",
    },
  ];

  const [cardData] = useState([{ img: fea1 }, { img: fea2 }, { img: fea3 }]);

  const [products] = useState([
    {
      id: 1,
      image: product1,
      imgOverlay: prodtctOverlay1,
      name: "Branded T-Shirt",
      price: "16.00",
      oldPrice: "21.00",
      isNew: true,
      isFeatured: true,
      isSale: true,
    },
    {
      id: 2,
      image: product2,
      imgOverlay: prodtctOverlay2,
      name: "Shopping Bag",
      price: "21.00",
      oldPrice: "25.00",
    },
    {
      id: 3,
      image: product3,
      imgOverlay: prodtctOverlay3,
      name: "Elegent Watch",
      price: "5.00",
      desc: "30% off",
      isSale: true,
    },
    {
      id: 4,
      image: product4,
      imgOverlay: prodtctOverlay4,
      name: "Casual Shoes",
      price: "18.00",
      oldPrice: "22.00",
    },
    {
      id: 5,
      image: product5,
      imgOverlay: prodtctOverlay5,
      name: "Earphones",
      price: "3.00",
      isSale: true,
    },
    {
      id: 6,
      image: product6,
      imgOverlay: prodtctOverlay6,
      name: "Elegent Mug",
      price: "4.50",
      oldPrice: "6.50",
    },
    {
      id: 7,
      image: product7,
      imgOverlay: prodtctOverlay7,
      name: "Sony Headphones",
      price: "9.99",
      desc: "20% off",
    },
    {
      id: 8,
      image: product8,
      imgOverlay: prodtctOverlay8,
      name: "Wooden Stools",
      price: "22.00",
      oldPrice: "25.00",
      isFeatured: true,
    },
  ]);

  const [cateData] = useState([
    { img: fashion, title: "의류" },
    { img: sports, title: "신발" },
    { img: music, title: "가방" },
    { img: furniture, title: "액세서리" },
    { img: electronics, title: "패션 잡화" },
    { img: mobile, title: "라이프 스타일" },
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

  const [productss] = useState([
    {
      id: 1,
      image: product9,
      imgOverlay: prodtctOverlay9,
      name: "Coffee Cup / Mug",
      price: "16.00",
      oldPrice: "21.00",
      isIcon: [
        { icon: Heart, subClass: "btn-soft-danger" },
        { icon: Eye, subClass: "btn-soft-primary" },
        { icon: ShoppingCart, subClass: "btn-soft-warning" },
      ],
    },
    {
      id: 2,
      image: product10,
      imgOverlay: prodtctOverlay10,
      name: "Sunglasses",
      price: "21.00",
      oldPrice: "25.00",
      isIcon: [
        { icon: Heart, subClass: "btn-soft-danger" },
        { icon: Eye, subClass: "btn-soft-primary" },
        { icon: ShoppingCart, subClass: "btn-soft-warning" },
      ],
    },
    {
      id: 3,
      image: product11,
      imgOverlay: prodtctOverlay11,
      name: "Loafer Shoes",
      price: "5.00",
      desc: "30% off",
      isIcon: [
        { icon: Heart, subClass: "btn-soft-danger" },
        { icon: Eye, subClass: "btn-soft-primary" },
        { icon: ShoppingCart, subClass: "btn-soft-warning" },
      ],
    },
    {
      id: 4,
      image: product12,
      imgOverlay: prodtctOverlay12,
      name: "T-Shirts",
      price: "18.00",
      oldPrice: "22.00",
      isIcon: [
        { icon: Heart, subClass: "btn-soft-danger" },
        { icon: Eye, subClass: "btn-soft-primary" },
        { icon: ShoppingCart, subClass: "btn-soft-warning" },
      ],
    },
  ]);

  const [productsss] = useState([
    {
      id: 1,
      image: product13,
      imgOverlay: prodtctOverlay13,
      name: "Wooden Chair",
      price: "16.00",
      oldPrice: "21.00",
      isNew: true,
      isLogo: true,
      isOverlay: true,
    },
    {
      id: 2,
      image: product14,
      name: "Women Block Heels",
      price: "21.00",
      oldPrice: "25.00",
      isNew: true,
      outofstock: true,
      isLogo: false,
      isOverlay: false,
    },
    {
      id: 3,
      image: product15,
      imgOverlay: prodtctOverlay15,
      name: "T-Shirts",
      price: "5.00",
      desc: "30% off",
      isNew: true,
      isLogo: true,
      isOverlay: true,
    },
    {
      id: 4,
      image: product16,
      imgOverlay: prodtctOverlay16,
      name: "Clock",
      price: "18.00",
      oldPrice: "22.00",
      isNew: true,
      isFeatured: true,
      isSale: true,
      isLogo: true,
      isOverlay: true,
    },
  ]);

  useEffect(() => {
    const e1 = document.getElementsByClassName("slick-slide");
    for (let i = 0; i < 3; i++) {
      if (i === 0) e1[i].style.background = `url(${bg2}) center center`;
      if (i === 1) e1[i].style.background = `url(${bg3}) center center`;
      if (i === 2) e1[i].style.background = `url(${bg1}) center center`;
    }
  }, []);

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
                        <Link to={item.link} className="btn btn-soft-primary">
                          자세히보기
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </li>
          ))}
        </Slider>
        {/* // -------------------- section ------------------------ */}
      </section>

      {/* // -------------------- collection ------------------------ */}
      <Container fluid className="mt-4">
        <Row>
          {cardData.map((item, key) => (
            <Col key={key} md={4} className="mt-4 pt-2">
              <Card className="shop-features border-0 rounded overflow-hidden">
                <img src={item.img} className="img-fluid" alt="" />
                <div className="category-title ms-md-4 ms-2">
                  <h4>
                    어떤걸로 <br /> 디자인
                  </h4>
                  <Link to="#" className="btn btn-sm btn-soft-primary mt-2">
                    자세히 보기
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* // -------------------- collection ------------------------ */}
      {/* // -------------------- TopCategoris ------------------------ */}
      <Container className="mt-100 mt-60">
        <Row>
          <Col xs={12}>
            <h5 className="mb-0">카테고리</h5>
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
                      <Link to="#" className="title text-dark">
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
      {/* // -------------------- TopCategoris ------------------------ */}
      <section className="section">
        {/* // -------------------- MostViewdProducts ------------------------ */}
        <Container>
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">조회수 높은거</h5>
            </Col>
          </Row>

          <Row>
            {products.map((product, key) => (
              <Col key={key} lg={3} md={6} xs={12} className="mt-4 pt-2">
                <Card className="shop-list border-0 position-relative">
                  <ul className="label list-unstyled mb-0">
                    {product.isNew && (
                      <li>
                        <Link
                          to="#"
                          className="badge badge-link rounded-pill bg-primary"
                        >
                          신상
                        </Link>
                      </li>
                    )}
                    {product.isFeatured && (
                      <li>
                        <Link
                          to="#"
                          className="badge badge-link rounded-pill bg-success"
                        >
                          추천
                        </Link>
                      </li>
                    )}
                    {product.isSale && (
                      <li>
                        <Link
                          to="#"
                          className="badge badge-link rounded-pill bg-warning"
                        >
                          세일
                        </Link>
                      </li>
                    )}
                  </ul>

                  <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link to="shop-product-detail">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt="shop"
                      />
                    </Link>
                    <Link to="shop-product-detail" className="overlay-work">
                      <img
                        src={product.imgOverlay}
                        className="img-fluid"
                        alt="shop"
                      />
                    </Link>
                    <ul className="list-unstyled shop-icons">
                      <li>
                        <Link
                          to="#"
                          className="btn btn-icon btn-pills btn-soft-danger"
                        >
                          <Heart className="icons" />
                        </Link>
                      </li>
                      <li className="mt-2">
                        <Link
                          to="shop-product-detail"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <Eye className="icons" />
                        </Link>
                      </li>
                      <li className="mt-2">
                        <Link
                          to="shop-cart"
                          className="btn btn-icon btn-pills btn-soft-warning"
                        >
                          <ShoppingCart className="icons" />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <CardBody className="content pt-4 p-2">
                    <Link
                      to="shop-product-detail"
                      className="text-dark product-name h6"
                    >
                      {product.name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-muted small fst-italic mb-0 mt-1">
                        ${product.price}{" "}
                        {product.oldPrice && (
                          <del className="text-danger ms-2">
                            ${product.oldPrice}
                          </del>
                        )}
                        {product.desc && (
                          <span className="text-success ms-1">
                            {product.desc}
                          </span>
                        )}
                      </h6>
                      <ul className="list-unstyled text-warning mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star"></i>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* // -------------------- MostViewdProducts ------------------------ */}

        {/* // -------------------- Popluer ------------------------ */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">인기순</h5>
            </Col>
          </Row>

          <Row>
            {productss.map((product, key) => (
              <Col key={key} lg={3} md={6} xs={12} className="mt-4 pt-2">
                <Card className="shop-list border-0 position-relative overflow-hidden shadow">
                  <ul className="label list-unstyled mb-0">
                    <li>
                      <Link
                        to="#"
                        className="badge badge-link rounded-pill bg-info"
                      >
                        인기
                      </Link>
                    </li>
                  </ul>
                  <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link to="shop-product-detail">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt="shop"
                      />
                    </Link>
                    <Link to="shop-product-detail" className="overlay-work">
                      <img
                        src={product.imgOverlay}
                        className="img-fluid"
                        alt="shop"
                      />
                    </Link>
                    <ul className="list-unstyled shop-icons">
                      {product.isIcon.map((Item, key) => (
                        <li key={key}>
                          <Link
                            to="#"
                            className={`mb-2 btn btn-icon btn-pills ${Item.subClass}`}
                          >
                            <Item.icon className="icons" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CardBody className="content pt-4 p-2">
                    <Link
                      to="shop-product-detail"
                      className="text-dark product-name h6"
                    >
                      {product.name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-muted small fst-italic mb-0 mt-1">
                        ${product.price}{" "}
                        {product.oldPrice && (
                          <del className="text-danger ms-2">
                            ${product.oldPrice}
                          </del>
                        )}
                        {product.desc && (
                          <span className="text-success ms-1">
                            {product.desc}
                          </span>
                        )}
                      </h6>
                      <ul className="list-unstyled text-warning mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star me-1"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star"></i>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* // -------------------- Popluer ------------------------ */}
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
                      혜택받으세요 혜택 <br /> 30프로
                    </h2>
                    <p className="para-desc para-white text-muted mb-0">
                      Launch your campaign and benefit from our expertise on
                      designing and managing conversion centered bootstrap v5
                      html page.
                    </p>
                    <div className="mt-4">
                      <Link to="#" className="btn btn-primary">
                        쿠폰 받기
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
        {/* // -------------------- cta ------------------------ */}
        {/* // -------------------- recentproducts ------------------------ */}
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <h5 className="mb-0">최근에 등록됐어요</h5>
            </Col>
          </Row>

          <Row>
            {productsss.map((product, key) => (
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
                    <Link to="shop-product-detail">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt="shop"
                      />
                    </Link>
                    {product.isOverlay && (
                      <Link to="shop-product-detail" className="overlay-work">
                        <img
                          src={product.imgOverlay}
                          className="img-fluid"
                          alt="shop"
                        />
                      </Link>
                    )}
                    <ul className="list-unstyled shop-icons">
                      {product.isLogo && (
                        <li>
                          <Link
                            to="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                          >
                            <Heart className="icons" />
                          </Link>
                        </li>
                      )}
                      <li className="mt-2">
                        <Link
                          to="shop-product-detail"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <Eye className="icons" />
                        </Link>
                      </li>
                      {product.isLogo && (
                        <li className="mt-2">
                          <Link
                            to="shop-cart"
                            className="btn btn-icon btn-pills btn-soft-warning"
                          >
                            <ShoppingCart className="icons" />
                          </Link>
                        </li>
                      )}
                    </ul>
                    {product.outofstock && (
                      <div className="overlay-work">
                        <div className="py-2 bg-soft-dark rounded-bottom out-stock">
                          <h6 className="mb-0 text-center">Out of stock</h6>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardBody className="content pt-4 p-2">
                    <Link
                      to="shop-product-detail"
                      className="text-dark product-name h6"
                    >
                      {product.name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                      <h6 className="text-dark small fst-italic mb-0 mt-1">
                        ${product.price}{" "}
                        {product.oldPrice && (
                          <del className="text-danger ms-2">
                            ${product.oldPrice}
                          </del>
                        )}
                        {product.desc && (
                          <span className="text-success ms-1">
                            {product.desc}
                          </span>
                        )}
                      </h6>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* // -------------------- recentproducts ------------------------ */}
      </section>
    </>
  );
};

export default Main;
