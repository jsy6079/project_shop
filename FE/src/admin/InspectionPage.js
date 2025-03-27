import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
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
import { Tabs, Tab } from "react-bootstrap";

const InspectionPage = () => {
  // 검수 전 리스트

  // 검수 중 리스트

  return (
    <>
      <div className="border-bottom pb-4">
        <h5>🔍 검수 관리</h5>
        <p className="text-muted mb-0">
          상품 등록 후 검수 절차를 진행하며, 검수 대기 → 검수 중 → 검수 완료의
          단계별 상태를 관리합니다.
        </p>
      </div>

      <div className="border-bottom pb-4">
        <Row>
          <Col md="12" className="mt-4">
            <TabPane className="show fade bg-white shadow rounded p-4">
              <Tabs
                defaultActiveKey="home1"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home1" title="검수 대기">
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
                            $ 320 <span className="text-muted">for 2items</span>
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
                </Tab>
                <Tab eventKey="home2" title="검수 중">
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
                            $ 320 <span className="text-muted">for 2items</span>
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
                </Tab>
                <Tab eventKey="home3" title="검수 완료">
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
                            $ 320 <span className="text-muted">for 2items</span>
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
                </Tab>
              </Tabs>
            </TabPane>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InspectionPage;
