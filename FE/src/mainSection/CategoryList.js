import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Form, Input } from "reactstrap";
import { Heart, Eye, ShoppingCart } from "react-feather";
import { useUser } from "../userContext";

const categories = [
  { id: 1, name: "의류" },
  { id: 2, name: "신발" },
  { id: 3, name: "가방" },
  { id: 4, name: "액세서리" },
  { id: 5, name: "패션 잡화" },
  { id: 6, name: "라이프 스타일" },
];

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const CategoryList = ({}) => {
  const { userInfo, setUserInfo } = useUser(); // 전역 상태 사용
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [sortOption, setSortOption] = useState("등록순");
  const [originalProducts, setOriginalProducts] = useState([]);
  const [keyword, setKeyword] = useState([]);

  // 카테고리 별 데이터 API
  useEffect(() => {
    if (categoryId) {
      axios
        .get(ApiUrl + `/api/product/category/${categoryId}`)
        .then((response) => {
          setProducts(response.data);
          setOriginalProducts(response.data); // 초기 데이터를 저장
        })
        .catch((error) => {
          console.error("API 호출 중 에러 발생:", error);
        });
    }
  }, [categoryId]);

  const categoryName =
    categories.find((cat) => cat.id === parseInt(categoryId))?.name ||
    "All Products";

  // 인기순 API
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

  // 스크롤 Nav
  const scrollNavigation = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const topNav = document.getElementById("topnav");

    if (top > 80) {
      topNav?.classList.add("nav-sticky");
    } else {
      topNav?.classList.remove("nav-sticky");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation);
    return () => {
      window.removeEventListener("scroll", scrollNavigation);
    };
  }, []);

  // input순 정렬
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedProducts = [...products];
    if (selectedOption === "등록순") {
      sortedProducts = [...originalProducts]; // 원본 데이터로 복원
    } else if (selectedOption === "인기순") {
      sortedProducts.sort(
        (a, b) => b.product_like_Count - a.product_like_Count
      );
    } else if (selectedOption === "최신순") {
      sortedProducts.sort(
        (a, b) => new Date(b.product_time) - new Date(a.product_time)
      );
    } else if (selectedOption === "낮은 가격순") {
      sortedProducts.sort((a, b) => a.product_price - b.product_price);
    } else if (selectedOption === "높은 가격순") {
      sortedProducts.sort((a, b) => b.product_price - a.product_price);
    }

    setProducts(sortedProducts);
  };

  // 검색
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        ApiUrl + `/api/product/category/${categoryId}/${keyword}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

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
      <section className="bg-half-170 bg-light d-table w-100">
        <Container>
          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">카테고리</li>{" "}
                <li className="breadcrumb-item active" aria-current="page">
                  {categoryName}
                </li>
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
      <section className="section">
        <Container>
          <Row>
            <Col lg={3} md={4} xs={12}>
              <Card className="border-0 sidebar sticky-bar">
                <CardBody className="p-0">
                  <div className="widget">
                    <div id="search2" className="widget-search mb-0">
                      <Form
                        role="search"
                        method="get"
                        id="searchform"
                        onSubmit={handleSearch}
                      >
                        <div className="input-group mb-3 border rounded">
                          <Input
                            type="text"
                            className="form-control border-0"
                            name="s"
                            id="s"
                            placeholder={`'${categoryName}' 내 검색`}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="input-group-text bg-white border-0"
                            id="searchsubmit"
                          >
                            <i className="uil uil-search"></i>
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>

                  <div className="widget mt-4 pt-2">
                    <h5 className="widget-title">카테고리</h5>
                    <ul className="list-unstyled mt-4 mb-0 blog-categories">
                      <li>
                        <Link to="/category/1">의류</Link>
                      </li>
                      <li>
                        <Link to="/category/2">신발</Link>
                      </li>
                      <li>
                        <Link to="/category/3">가방</Link>
                      </li>
                      <li>
                        <Link to="/category/4">액세서리</Link>
                      </li>
                      <li>
                        <Link to="/category/5">패션잡화</Link>
                      </li>
                      <li>
                        <Link to="/category/6">라이프 스타일</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="widget mt-4 pt-2">
                    <h5 className="widget-title">실시간 인기상품</h5>
                    <ul className="list-unstyled mt-4 mb-0">
                      {products2.map((product, key) => (
                        <li
                          key={key}
                          className={`d-flex align-items-center ${
                            key !== 0 ? "mt-2" : ""
                          }`}
                        >
                          <Link
                            to={`/detail/${product.category_id}/${product.product_id}`}
                          >
                            <img
                              src={
                                product?.product_image?.length > 0
                                  ? product.product_image[0]
                                  : "https://moa-upload-files.s3.ap-northeast-2.amazonaws.com/products/noImage.png"
                              }
                              className="img-fluid avatar avatar-small rounded shadow"
                            />
                          </Link>
                          <div className="flex-1 content ms-3">
                            <Link
                              to={`/detail/${product.category_id}/${product.product_id}`}
                              className="text-dark h6"
                            >
                              {product.product_name}
                            </Link>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              {product.product_price.toLocaleString()}원
                            </h6>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={9} md={8} xs={12} className="mt-5 pt-2 mt-sm-0 pt-sm-0">
              <Row className="align-items-center">
                <Col lg={8} md={7}>
                  <div className="section-title">
                    <h5 className="mb-0">총 {products.length} 개의 상품</h5>
                  </div>
                </Col>

                <Col lg={4} md={5} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <div className="form custom-form">
                    <div className="mb-0">
                      <select
                        className="form-select form-control"
                        id="Sortbylist-job"
                        onChange={handleSortChange}
                        value={sortOption}
                      >
                        <option>등록순</option>
                        <option>인기순</option>
                        <option>최신순</option>
                        <option>낮은 가격순</option>
                        <option>높은 가격순</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                {products.map((product, key) => (
                  <Col key={key} lg={4} md={6} xs={12} className="mt-4 pt-2">
                    <Card className="shop-list border-0 position-relative">
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
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <Link
                              to="#"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              {userInfo ? (
                                <Heart
                                  className="icons"
                                  onClick={() =>
                                    wishConfirm(
                                      userInfo.email,
                                      product.product_id
                                    )
                                  }
                                />
                              ) : null}
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
                        <h6 className="text-dark small fst-italic mb-0 mt-1">
                          {product.product_price.toLocaleString()}원
                        </h6>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CategoryList;
