import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "react-feather";

// import images

import logoLight from "../assets/images/logo-light.png";
import svgMap from "../assets/images/svg-map.svg";
import logoMoa from "../assets/images/logo-moa.png";

const Loader = () => (
  <div id="preloader">
    <div id="status">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  </div>
);

// 소셜 아이콘 배열
const socialIcons = [
  { icon: Facebook, name: "facebook" },
  { icon: Instagram, name: "instagram" },
  { icon: Twitter, name: "twitter" },
  { icon: Linkedin, name: "linkedin" },
];

const Footer = () => {
  return (
    <Suspense fallback={<Loader />}>
      <footer
        className="footer"
        style={{
          backgroundImage: `url(${svgMap})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col className="col-12 py-lg-5">
              <div className="footer-py-60 text-center">
                <div className="logo-footer">
                  <img
                    src={logoMoa}
                    alt="MOA 로고"
                    style={{ filter: "invert(1)", height: "60px" }}
                  />
                </div>
                <p className="mt-4 para-desc mx-auto">
                  Moa와 함께 당신의 소중한 아이템이 안전하게 거래될 수 있도록 ,
                  모두가 믿고 찾는 특별한 가치를 만들어갑니다.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="footer-py-30 footer-bar bg-footer">
          <Container className="text-center">
            <Row className="justify-content-center">
              <Col className="col-12">
                <div className="text-center">
                  <p className="mb-0">
                    © {new Date().getFullYear()} Landrick. Design with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by{" "}
                    <Link
                      to="//themesbrand.com//"
                      target="_blank"
                      className="text-reset"
                    >
                      Themesbrand
                    </Link>
                    .
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </Suspense>
  );
};

export default Footer;
