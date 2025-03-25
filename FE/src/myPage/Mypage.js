import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AccountTab from "./AccountTab";
import WishlistTab from "./WishListTab";
import MileageTab from "./MileageTab";
import RegistProductTab from "./RegistProductTab";
import TransactionProductTab from "./TransactionProductTab";
import HistoryTab from "./HistoryTab";
import { Container, Row, Col, TabContent } from "reactstrap";
import { useUser } from "../userContext";
import { useSearchParams } from "react-router-dom";

const AccountManagement = ({}) => {
  const { userInfo, setUserInfo } = useUser(); // 전역 상태 사용
  // const [activeTab, setActiveTab] = useState("1");
  const [defaultHistoryTab, setDefaultHistoryTab] = useState("home"); // 기본 구매 탭
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "1";
  const [activeTab, setActiveTab] = useState(tabParam);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const reviewGrade = (score) => {
    if (score <= 20) return "실버";
    if (score <= 40) return "골드";
    if (score <= 60) return "플래티넘";
    return "VIP";
  };

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <Container>
          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">내 정보</li>{" "}
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
          {/* 상단 유저 정보 */}
          <Row className="align-items-end">
            <Col md={4}>
              <div className="d-flex align-items-center">
                <img
                  src={userInfo.imgUrl}
                  className="avatar avatar-md-md rounded-circle"
                  alt=""
                />
                <div className="ms-3">
                  <h6 className="text-muted mb-0">반갑습니다,😊 </h6>
                  <h5 className="mb-0">{userInfo.username} 님</h5>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mt-4 pt-2">
              <Sidebar activeTab={activeTab} setActiveTab={toggleTab} />
            </Col>

            <Col md={8} xs={12} className="mt-4 pt-2">
              <TabContent activeTab={activeTab}>
                {activeTab === "1" && (
                  <AccountTab
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    reviewGrade={reviewGrade}
                  />
                )}
                {activeTab === "2" && <WishlistTab userInfo={userInfo} />}
                {activeTab === "3" && (
                  <MileageTab userInfo={userInfo} setUserInfo={setUserInfo} />
                )}
                {activeTab === "4" && (
                  <RegistProductTab
                    userInfo={userInfo}
                    setActiveTab={setActiveTab}
                    setDefaultHistoryTab={setDefaultHistoryTab}
                  />
                )}
                {activeTab === "5" && (
                  <TransactionProductTab userInfo={userInfo} />
                )}
                {activeTab === "6" && (
                  <HistoryTab
                    userInfo={userInfo}
                    defaultInnerTab={defaultHistoryTab}
                  />
                )}
              </TabContent>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AccountManagement;
