import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
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
import { UserPlus, Users } from "react-feather";

import imgbg from "../assets/images/account/bg.png";
import profile from "../assets/images/client/05.jpg";

const widgetsData = [
  {
    id: 1,
    icon: "uil uil-dashboard",
    className: "navbar-item account-menu px-0",
    title: "검수 관리",
    link: "/admin",
  },
  {
    id: 2,
    icon: "uil uil-transaction",
    className: "navbar-item account-menu px-0 mt-2",
    title: "물품 관리",
    link: "/admin/products",
  },
  {
    id: 3,
    icon: "uil uil-comment",
    className: "navbar-item account-menu px-0 mt-2",
    title: "리뷰 관리",
    link: "/admin/review",
  },
];

const AdminLayout = () => {
  return (
    <>
      <section
        className="bg-profile d-table w-100 bg-primary"
        style={{ background: `url(${imgbg}) center center` }}
      >
        <Container>
          <Row>
            <Col lg="12">
              <Card
                className="public-profile border-0 rounded shadow"
                style={{ zIndex: "1" }}
              >
                <CardBody>
                  <Row className="align-items-center">
                    <Col lg="2" md="3" className="text-md-start text-center">
                      <img
                        src={profile}
                        className="avatar avatar-large rounded-circle shadow d-block mx-auto"
                        alt=""
                      />
                    </Col>

                    <Col lg="10" md="9">
                      <Row className="align-items-end">
                        <Col
                          md="7"
                          className="text-md-start text-center mt-4 mt-sm-0"
                        >
                          <h3 className="title mb-0">Krista Joseph</h3>
                          <small className="text-muted h6 me-2">
                            환영합니다.
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* 왼쪽 바*/}
      <section className="section mt-60">
        <Container className="mt-lg-3">
          <Row>
            <Col lg="4" md="6" xs="12" className="d-lg-block d-none">
              <div className="sidebar sticky-bar p-4 rounded shadow">
                <div className="widget">
                  <h5 className="widget-title">Total</h5>
                  <div className="row mt-4">
                    <div className="col-6 text-center">
                      <UserPlus className="fea icon-ex-md text-primary mb-1" />
                      <h5 className="mb-0">2588</h5>
                      <p className="text-muted mb-0">등록된 물품 수</p>
                    </div>

                    <div className="col-6 text-center">
                      <Users className="fea icon-ex-md text-primary mb-1" />
                      <h5 className="mb-0">454</h5>
                      <p className="text-muted mb-0">회원 수</p>
                    </div>
                  </div>
                </div>
                <div className="widget mt-4 pt-2">
                  <h5 className="widget-title">Projects :</h5>
                  <div className="progress-box mt-4">
                    <h6 className="title text-muted">Progress</h6>
                    <Progress
                      value={50}
                      color="primary"
                      barClassName="position-relative"
                    >
                      <div className="progress-value d-block text-muted h6">
                        24 / 48
                      </div>
                    </Progress>
                  </div>
                </div>

                <div className="widget mt-4">
                  <ul
                    className="list-unstyled sidebar-nav mb-0"
                    id="navmenu-nav"
                  >
                    {widgetsData.map((widget, index) => (
                      <li className="mb-2" key={index}>
                        <Link
                          to={widget.link}
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className={widget.icon}></i>
                          </span>
                          <h6 className="mb-0 ms-2">{widget.title}</h6>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="8" md="7" xs="12">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminLayout;
