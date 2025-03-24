import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUser } from "../userContext";
import {
  Container,
  Row,
  Col,
  Input,
  Form,
  Label,
  Card,
  Badge,
  Button,
  FormFeedback,
} from "reactstrap";
import { User, Phone, MapPin } from "react-feather";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const ProductPayment = ({}) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const { productId } = useParams(); // URL에서 productId 가져오기
  const [products, setProducts] = useState([]); // 상품

  // 현재 금액과 마일리지 금액 비교
  const product = products.length > 0 ? products[0] : null;
  const productPrice = product?.product_price || 0;
  const userMileage = userInfo?.money || 0;

  const compare = userMileage < productPrice;

  // 전화번호, 주소 변경
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 전화번호, 주소 수정
  const handleProductSave = async () => {
    if (!userInfo.phone.trim()) {
      alert("전화번호를 입력해 주세요.");
      return;
    }

    if (!userInfo.username.trim()) {
      alert("수취인을 입력해 주세요.");
      return;
    }

    if (!userInfo.address.trim()) {
      alert("주소를 입력해 주세요.");
      return;
    }

    const formData = {
      productId: product.product_id,
      productName: product.product_name,
      productStatus: product.product_status,
      buyerEmail: userInfo.email,
      transactionName: userInfo.username,
      transactionPhone: userInfo.phone,
      transactionAddress: userInfo.address,
      sellerEmail: product.user_email,
      buyerMoney: userInfo.money,
      productPrice: product.product_price,
    };

    try {
      const response = await axios.post(
        ApiUrl + "/api/product/payment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data);
      fetchUserInfo();
    } catch (error) {
      if (error.response && error.response.data) {
        alert("알 수 없는 요청입니다.");
        return;
      }
      alert("알 수 없는 요청입니다.");
    }
  };

  // 상세보기 API + 리뷰 email 값 호출
  useEffect(() => {
    if (productId) {
      axios
        .get(ApiUrl + `/api/product/detail/${productId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("API 호출 중 에러 발생:", error);
        });
    }
  }, [productId]);

  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <Container>
          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">결제 페이지</li>
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
          <Col>
            <Card className="rounded shadow p-4 border-0">
              <h4 className="mb-3">배송 정보</h4>

              <Form>
                {products.map((products, key) => (
                  <div key={key}>
                    <Row className="g-3">
                      <Col sm={6}>
                        <Label htmlFor="firstName" className="form-label">
                          수취인<span className="text-danger"> *</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <User className="fea icon-sm icons" />
                          <input
                            name="username"
                            id="username"
                            type="text"
                            className="form-control ps-5"
                            value={userInfo.username}
                            onChange={handleChange}
                            maxLength={10}
                            required
                          />
                        </div>
                        <FormFeedback type="invalid"></FormFeedback>
                      </Col>

                      <Col sm={6}>
                        <Label htmlFor="lastName" className="form-label">
                          전화 번호<span className="text-danger"> *</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <Phone className="fea icon-sm icons" />
                          <input
                            name="phone"
                            id="phone"
                            type="text"
                            className="form-control ps-5"
                            value={userInfo.phone}
                            onChange={handleChange}
                            maxLength={13}
                            required
                          />
                        </div>
                        <FormFeedback type="invalid"></FormFeedback>
                      </Col>

                      <Col className="col-12">
                        <Label htmlFor="address" className="form-label">
                          주소<span className="text-danger"> *</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <MapPin className="fea icon-sm icons" />
                          <input
                            name="address"
                            id="address"
                            type="text"
                            className="form-control ps-5"
                            value={userInfo.address}
                            onChange={handleChange}
                            maxLength={100}
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="form-check mt-4 pt-4 border-top">
                      <Label
                        className="form-check-label"
                        htmlFor="same-address"
                      >
                        📢 구매 요청 전 필독사항
                      </Label>
                    </div>

                    <div className="form-check">
                      <Label className="form-check-label" htmlFor="save-info">
                        ✔️ 본 상품은 중개 거래 방식으로, 구매 요청 후 바로
                        발송되지 않습니다.
                      </Label>
                    </div>
                    <div className="form-check">
                      <Label className="form-check-label" htmlFor="save-info">
                        ✔️ 상품 검수 및 발송에는 최대 5일 정도 소요될 수
                        있습니다.
                      </Label>
                    </div>
                    <div className="form-check">
                      <Label className="form-check-label" htmlFor="save-info">
                        ✔️ 검수 과정에서 가품 판정이 되거나 상품 상태가 기준에
                        미치지 못할 경우, 주문이 취소될 수 있으며 구매된
                        마일리지는 환불됩니다.
                      </Label>
                    </div>
                    <div className="form-check">
                      <Label className="form-check-label" htmlFor="save-info">
                        ✔️ 판매자가 상품을 검수 센터로 보내면 검수 및 배송
                        절차가 시작되므로 취소가 불가능합니다.
                      </Label>
                    </div>

                    <h4 className="mb-3 mt-4 pt-4 border-top">결제 정보</h4>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-dark mb-0">
                        해당 상품 금액 :{" "}
                        <span className="text-primary">
                          {products.product_price.toLocaleString()}
                        </span>
                        <span className="text-dark"> 원</span>
                      </h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-dark mb-0">
                        현재 보유 마일리지 :{" "}
                        <span className="text-primary">
                          {userInfo.money.toLocaleString()}
                        </span>
                        <span className="text-dark"> 원</span>
                      </h5>
                    </div>
                    {compare && (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-danger mb-0">
                          금액이 부족합니다. 내 정보 페이지에서 마일리지를
                          충전해주세요.
                        </h6>
                      </div>
                    )}
                    <Button
                      color="primary"
                      className="w-100 btn btn-primary"
                      type="button"
                      onClick={handleProductSave}
                    >
                      구매 요청하기
                    </Button>
                  </div>
                ))}
              </Form>
            </Card>
          </Col>
        </Container>
      </section>
    </>
  );
};
export default ProductPayment;
