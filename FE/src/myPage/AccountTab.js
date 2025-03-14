import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import { Mail, Phone, MapPin } from "react-feather";

const AccountTab = ({ userInfo, setUserInfo, reviewGrade }) => {
  const [viewProducts, setViewProducts] = useState([]); // 리뷰
  const [reviewPage, setReviewPage] = useState(0); // 리뷰 목록 페이지
  const [reviewTotalPages, setReviewTotalPages] = useState(1); // 리뷰 전체 페이지 수

  // 점수에 따른 거래 등급 부여
  function reviewGrade(score) {
    if (score >= 0 && score <= 20) {
      return "실버";
    } else if (score >= 21 && score <= 40) {
      return "골드";
    } else if (score >= 41 && score <= 60) {
      return "플래티넘";
    } else if (score >= 61 && score <= 80) {
      return "VIP";
    }
  }

  // 전화번호, 주소 변경
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 전화번호, 주소 수정
  const handleSave = async () => {
    if (!userInfo.phone.trim()) {
      alert("전화번호를 입력해 주세요.");
      return;
    }

    if (!userInfo.address.trim()) {
      alert("주소를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/update",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("수정 실패:", error);
      console.log(userInfo);
      alert("서버오류");
    }
  };

  // 리뷰 페이징
  const reviewPageGroupSize = 5;
  const reviewCurrentGroup = Math.floor(reviewPage / reviewPageGroupSize);
  const reviewStartPage = reviewCurrentGroup * reviewPageGroupSize;
  const reviewEndPage = Math.min(
    reviewStartPage + reviewPageGroupSize,
    reviewTotalPages
  );

  // 리뷰 목록 조회
  const fetchReviewList = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/review/view/${userInfo.email}?page=${pageNumber}&size=5`
      );
      setViewProducts(response.data.content);
      setReviewTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("리뷰 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 리뷰 삭제 요청 (관리자)
  const requestAdminReview = async (review_id) => {
    const isCofirm = window.confirm(
      "관리자에게 해당 리뷰를 삭제 요청하시겠습니까?"
    );

    if (isCofirm) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/review/request/${review_id}`,
          {
            review_id,
          }
        );

        if (response.status === 200) {
          alert(response.data);
        } else {
          alert("관리자 수정 요청 실패");
        }
      } catch (error) {
        console.log("관리자 수정 요청 실패", error);
        alert("서버 오류");
      }
    }
  };

  useEffect(() => {
    if (userInfo?.email) {
      fetchReviewList(reviewPage); // 리뷰 목록 페이지 변화 감지
    }
  }, [userInfo?.email, reviewPage]);

  return (
    <>
      <TabPane className="fade bg-white show p-4" tabId="1">
        <h6 className="text-dark">
          {userInfo.username} 회원님의 등급은{" "}
          <span className="text-info">{reviewGrade(userInfo.score)}</span>
          <span className="text-dark"> 등급 입니다.</span>
          <p className="text-secondary">리뷰 점수 : {userInfo.score}점</p>
        </h6>
        <h6 className="text-dark mb-0">
          내 마일리지 :<span className="text-primary"> {userInfo.money}</span>
          <span className="text-dark"> 원</span>
        </h6>
      </TabPane>

      <TabPane className="show fade bg-white  p-4" tabId="1">
        <Form>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Label className="form-label">이메일</Label>
                <div className="form-icon position-relative">
                  <Mail className="fea icon-sm icons" />
                  <input
                    name="email"
                    id="email"
                    type="text"
                    className="form-control ps-5"
                    defaultValue={userInfo.email}
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label className="form-label">전화번호</Label>
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
                  />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-3">
                <Label className="form-label">주소</Label>
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
                  />
                </div>
              </div>
            </Col>

            <div className="col-lg-12 mt-2 mb-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                변경사항 수정하기
              </button>
            </div>
          </Row>
        </Form>
      </TabPane>

      <TabPane className="show fade bg-white  p-4" tabId="1">
        <div className="table-responsive bg-white shadow rounded">
          <Table className="mb-0 table-center table-nowrap">
            <thead>
              <tr>
                <th scope="col" className="border-bottom">
                  리뷰 작성자
                </th>
                <th scope="col" className="border-bottom">
                  리뷰 내용
                </th>
                <th scope="col" className="border-bottom">
                  점수
                </th>
                <th scope="col" className="border-bottom"></th>
              </tr>
            </thead>
            {viewProducts.map((review, key) => (
              <tbody key={key}>
                <tr>
                  <th scope="row">{review.buyer_name}</th>
                  <td>
                    {review.review_text.length > 12
                      ? review.review_text.substring(0, 12) + "..."
                      : review.review_text}
                  </td>
                  <td className="text-warning">
                    {Array(review.review_score)
                      .fill()
                      .map((_, i) => (
                        <li key={i} className="list-inline-item">
                          <i className="mdi mdi-star"></i>
                        </li>
                      ))}
                    {Array(5 - review.review_score)
                      .fill()
                      .map((_, i) => (
                        <li key={`empty-${i}`} className="list-inline-item">
                          <i className="mdi mdi-star-outline"></i>{" "}
                        </li>
                      ))}
                  </td>
                  <td>
                    {review.review_request_delete === false ? (
                      <button
                        className="dropdown-item"
                        onClick={() => requestAdminReview(review.review_id)}
                      >
                        <i className="uil uil-multiply align-middle me-1"></i>
                      </button>
                    ) : (
                      <span class="badge bg-danger"> 검토 중 </span>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
        <div className="text-center mt-3">
          <Pagination className="d-inline-flex justify-content-center">
            <PaginationItem disabled={reviewCurrentGroup === 0}>
              <PaginationLink
                href="#"
                previous
                onClick={(e) => {
                  e.preventDefault();
                  setReviewPage((reviewCurrentGroup - 1) * reviewPageGroupSize);
                }}
              >
                이전
              </PaginationLink>
            </PaginationItem>

            {[...Array(reviewEndPage - reviewStartPage)].map((_, index) => (
              <PaginationItem
                key={reviewStartPage + index}
                active={reviewStartPage + index === reviewPage}
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setReviewPage(reviewStartPage + index);
                  }}
                >
                  {reviewStartPage + index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={reviewEndPage >= reviewTotalPages}>
              <PaginationLink
                href="#"
                next
                onClick={(e) => {
                  e.preventDefault();
                  setReviewPage(
                    reviewCurrentGroup * reviewPageGroupSize +
                      reviewPageGroupSize
                  );
                }}
              >
                다음
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </TabPane>
    </>
  );
};

export default AccountTab;
