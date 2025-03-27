import axios from "axios";
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

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const ReviewPage = () => {
  const [reviewList, setReviewList] = useState([]);
  const [reviewPage, setReviewPage] = useState(0); // 리뷰 목록 페이지
  const [reviewTotalPages, setReviewTotalPages] = useState(1); // 리뷰 전체 페이지 수

  // 리뷰 목록 불러오기 (삭제 요청된 것 만)
  const fetchReviewList = async (pageNumber) => {
    try {
      const response = await axios.get(
        ApiUrl + `/api/admin/review/confirm?page=${pageNumber}&size=5`,
        {
          withCredentials: true,
        }
      );
      setReviewList(response.data.content);
      setReviewTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("리뷰 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 리뷰 승인 요청
  const requestPermitReview = async (review_id) => {
    const isCofirm = window.confirm("해당 리뷰 삭제 요청을 승인하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/review/delete/permit/${review_id}`,
          { review_id },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchReviewList(reviewPage);
        } else {
          alert("리뷰 삭제 승인이 실패했습니다.");
        }
      } catch (error) {
        console.log("리뷰 삭제 승인 요청 실패", error);
        alert("알 수 없는 오류입니다.");
      }
    }
  };

  // 리뷰 거부 요청
  const requestRejectReview = async (review_id) => {
    const isCofirm = window.confirm("해당 리뷰 삭제 요청을 반려하시겠습니까?");

    if (isCofirm) {
      try {
        const response = await axios.put(
          ApiUrl + `/api/admin/review/delete/reject/${review_id}`,
          { review_id },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data);
          fetchReviewList(reviewPage);
        } else {
          alert("리뷰 삭제 반려가 실패했습니다.");
        }
      } catch (error) {
        console.log("리뷰 반려 요청 실패", error);
        alert("알 수 없는 오류입니다.");
      }
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

  useEffect(() => {
    {
      fetchReviewList(reviewPage);
    }
  }, [reviewPage]);

  return (
    <>
      <div className="border-bottom pb-4">
        <h5>📝 리뷰 관리</h5>
        <p className="text-muted mb-0">
          판매자에 의해 신고 된 부적절한 내용이나 허위 리뷰에 대해 검토 및
          삭제를 관리합니다.
        </p>
      </div>

      <div className="border-bottom pb-4">
        <Row>
          <Col md="12" className="mt-4">
            <div className="table-responsive bg-white shadow rounded">
              <Table className="mb-0 table-center table-nowrap">
                <thead>
                  <tr>
                    <th scope="col" className="border-bottom">
                      판매자
                    </th>
                    <th scope="col" className="border-bottom">
                      구매자
                    </th>
                    <th scope="col" className="border-bottom">
                      리뷰 내용
                    </th>
                    <th scope="col" className="border-bottom"></th>
                    <th scope="col" className="border-bottom"></th>
                  </tr>
                </thead>
                {reviewList.map((review, key) => (
                  <tbody key={key}>
                    <tr>
                      <th scope="row">{review.seller_name}</th>
                      <td>{review.buyer_name}</td>
                      <td>
                        <Link
                          to={`/detail/${review.category_id}/${review.product_id}`}
                          target="_blank"
                        >
                          {review.review_text.length > 15
                            ? review.review_text.substring(0, 15) + "..."
                            : review.review_text}
                        </Link>
                      </td>
                      <td>
                        {review.review_status !== "삭제승인" &&
                        review.review_status !== "삭제반려" ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              requestPermitReview(review.review_id)
                            }
                          >
                            승인
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>
                        {review.review_status !== "삭제승인" &&
                        review.review_status !== "삭제반려" ? (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              requestRejectReview(review.review_id)
                            }
                          >
                            반려
                          </button>
                        ) : (
                          <p className="text-muted mb-0">처리완료</p>
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
                      setReviewPage(
                        (reviewCurrentGroup - 1) * reviewPageGroupSize
                      );
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ReviewPage;
