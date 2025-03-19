import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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

const ProductPayment = ({}) => {
  const { userInfo, setUserInfo } = useUser(); // 전역 상태 사용

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
          <Row>
            <Col md={5} lg={4} className="order-md-last">
              <Card className="rounded shadow p-4 border-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h5 mb-0">Your cart</span>
                  <Badge color="primary" className="rounded-pill">
                    3
                  </Badge>
                </div>
                <ul className="list-group mb-3 border">
                  <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                    <div>
                      <h6 className="my-0">Product name</h6>
                      <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$12</span>
                  </li>
                  <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                    <div>
                      <h6 className="my-0">Second product</h6>
                      <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$8</span>
                  </li>
                  <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                    <div>
                      <h6 className="my-0">Third item</h6>
                      <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$5</span>
                  </li>
                  <li className="d-flex justify-content-between bg-light p-3 border-bottom">
                    <div className="text-success">
                      <h6 className="my-0">Promo code</h6>
                      <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                  </li>
                  <li className="d-flex justify-content-between p-3">
                    <span>Total (USD)</span>
                    <strong>$20</strong>
                  </li>
                </ul>

                <Form>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                    />
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
                </Form>
              </Card>
            </Col>

            <Col md={7} lg={8}>
              <Card className="rounded shadow p-4 border-0">
                <h4 className="mb-3">Billing address</h4>
                <Form>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Label htmlFor="firstName" className="form-label">
                        First name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                      />
                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col sm={6}>
                      <Label htmlFor="lastName" className="form-label">
                        Last name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col className="col-12">
                      <Label htmlFor="username" className="form-label">
                        Username
                      </Label>
                      <div className="input-group has-validation">
                        <span className="input-group-text bg-light text-muted border">
                          @
                        </span>
                        <Input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Username"
                          name="username"
                        />

                        <FormFeedback type="invalid"></FormFeedback>
                      </div>
                    </Col>

                    <Col className="col-12">
                      <Label htmlFor="email" className="form-label">
                        Email <span className="text-muted">(Optional)</span>
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                        name="email"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col className="col-12">
                      <Label htmlFor="address" className="form-label">
                        Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        name="address"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col className="col-12">
                      <Label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                        name="address2"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col md={5}>
                      <Label htmlFor="country" className="form-label">
                        Country
                      </Label>
                      <select className="form-select form-control" id="country">
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </select>
                    </Col>

                    <Col md={4}>
                      <Label htmlFor="state" className="form-label">
                        State
                      </Label>
                      <select className="form-select form-control" id="state">
                        <option value="">Choose...</option>
                        <option>California</option>
                      </select>
                    </Col>

                    <Col md={3}>
                      <Label htmlFor="zip" className="form-label">
                        Zip
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder=""
                        name="zip"
                      />
                    </Col>
                  </Row>

                  <div className="form-check mt-4 pt-4 border-top">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="same-address"
                    />
                    <Label className="form-check-label" htmlFor="same-address">
                      Shipping address is the same as my billing address
                    </Label>
                  </div>

                  <div className="form-check">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="save-info"
                    />
                    <Label className="form-check-label" htmlFor="save-info">
                      Save this information for next time
                    </Label>
                  </div>

                  <h4 className="mb-3 mt-4 pt-4 border-top">Payment</h4>

                  <div className="my-3">
                    <div className="form-check">
                      <Input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                      />
                      <Label className="form-check-label" htmlFor="credit">
                        Credit card
                      </Label>
                    </div>
                    <div className="form-check">
                      <Input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                      />
                      <Label className="form-check-label" htmlFor="debit">
                        Debit card
                      </Label>
                    </div>
                    <div className="form-check">
                      <Input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                      />
                      <Label className="form-check-label" htmlFor="paypal">
                        PayPal
                      </Label>
                    </div>
                  </div>

                  <Row className="gy-3">
                    <Col md={6}>
                      <Label htmlFor="cc-name" className="form-label">
                        Name on card
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder=""
                        name="cc_name"
                      />

                      <FormFeedback type="invalid"></FormFeedback>

                      <small className="text-muted">
                        Full name as displayed on card
                      </small>
                    </Col>

                    <Col md={6}>
                      <Label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder=""
                        name="cc_number"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col md={3} className="mb-3">
                      <Label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder=""
                        name="cc_expiration"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>

                    <Col md={3} className="mb-3">
                      <Label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder=""
                        name="cc_cvv"
                      />

                      <FormFeedback type="invalid"></FormFeedback>
                    </Col>
                  </Row>

                  <Button
                    color="primary"
                    className="w-100 btn btn-primary"
                    type="submit"
                  >
                    Continue to checkout
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default ProductPayment;
