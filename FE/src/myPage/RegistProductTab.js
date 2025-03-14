import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  Input,
  Label,
  TabPane,
} from "reactstrap";
import { MessageCircle, ShoppingCart, CreditCard } from "react-feather";

const RegistProductTab = ({ userInfo }) => {
  const [imagePreviews, setImagePreviews] = useState([]); // 미리보기 이미지 저장
  const maxImages = 3; // 최대 업로드 수 제한
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리
  const [sizeOption, setSizeOption] = useState([]); // 해당 카테고리의 사이즈
  const [productName, setProductName] = useState(""); // 폼 처리 (상품명)
  const [productPrice, setProductPrice] = useState(""); // 폼 처리 (상품 금액)
  const [productCategory, setProductCategory] = useState(""); // 폼 처리 (상품 카테고리)
  const [productSize, setProductSize] = useState(""); // 폼 처리 (상품 사이즈)
  const [productDescription, setProductDescription] = useState(""); // 폼 처리 (상세설명)
  const [productImage, setProductImage] = useState([]); // 폼 처리 (상품 사진진)

  // 파일 선택 처리 ~~
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = [...imagePreviews]; // 기존 파일 + 새 파일 합치기

    if (totalFiles.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
      return;
    }
    setProductImage((prev) => [...prev, ...files]); // 실제 파일 추가

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]); // 미리보기
      };
      reader.readAsDataURL(file);
    });

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        totalFiles.push(reader.result); // 미리보기 추가
        if (totalFiles.length <= maxImages) {
          setImagePreviews([...totalFiles]); // 최대 제한 이하일 때만 반영
        }
      };

      reader.readAsDataURL(file); // 파일 읽기
    });
  };

  // 이미지 삭제 처리
  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = productImage.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    setProductImage(updatedFiles);
  };

  // ~~ 파일 선택 처리

  // 카테고리 선택 시 사이즈 ~~

  const sizeList = {
    의류: ["XS", "S", "M", "L", "XL", "XXL"],
    신발: ["220", "230", "240", "250", "260", "270", "280"],
    가방: ["Small", "Medium", "Large"],
    액세서리: ["Free"],
    패션잡화: ["Free"],
    라이프스타일: ["Free"],
  };

  const handleCategoryList = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected); // 선택한 카테고리 저장
    setSizeOption(sizeList[selected] || []); // 사이즈 옵션 업데이트
  };

  // ~~ 카테고리 선택 시 사이즈

  // 판매 등록하기 ~~
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName); // 상품명
    formData.append("productPrice", productPrice); // 상품가격
    formData.append("productCategory", productCategory); // 상품카테고리
    formData.append("productSize", productSize); // 상품사이즈
    formData.append("productDescription", productDescription); // 상품설명
    formData.append("email", userInfo.email);
    productImage.forEach((file) => {
      formData.append("productImage[]", file); // 배열 형태로 보내기
    });

    // DTO 에 맞춰 꼭 명칭 변경해주기!
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/regist",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert(response.data);
        // 초기화 작업
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductSize("");
        setProductDescription("");
        setImagePreviews([]);
        setProductImage([]);
      } else {
        alert("판매 등록 실패");
      }
    } catch (error) {
      console.log("판매 등록 실패", error);
      formData.forEach((value, key) => {
        if (value instanceof File) {
          console.log("파일:", key, value.name);
        } else {
          console.log("값:", key, value);
        }
      });
      alert("서버 오류");
    }
  };

  // ~~ 판매 등록하기

  return (
    <TabPane tabId="4">
      <div className="table-responsive bg-white shadow rounded">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={7}>
              <Form className=" p-4" onSubmit={handleSubmit}>
                <Row>
                  <Row>
                    <Col md="12">
                      <div className="mb-3">
                        <Label className="form-label">
                          상품 명 <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <ShoppingCart className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control ps-5"
                          placeholder="상품명을 입력해주세요."
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <div className="mb-3">
                        <Label className="form-label">
                          상품 금액 <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <CreditCard className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          name="number"
                          id="number"
                          type="number"
                          className="form-control ps-5"
                          placeholder="금액을 입력해주세요."
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                  </Row>

                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">상품 카테고리</Label>{" "}
                      <span className="text-danger">*</span>
                      <select
                        className="form-control custom-select"
                        id="Sortbylist-Shop"
                        onChange={handleCategoryList} // 카테고리 선택 시 호출
                      >
                        <option value="">선택해주세요</option>
                        <option value="의류">의류</option>
                        <option value="신발">신발</option>
                        <option value="가방">가방</option>
                        <option value="액세서리">액세서리</option>
                        <option value="패션잡화">패션잡화</option>
                        <option value="라이프스타일">라이프스타일</option>
                      </select>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">사이즈</Label>{" "}
                      <span className="text-danger"></span>
                      <select
                        className="form-control custom-select"
                        id="Sortbylist-Shop"
                        disabled={!selectedCategory} // 카테고리 안 고르면 비활성화
                        value={productSize} // 선택된 값 표시
                        onChange={(e) => setProductSize(e.target.value)} // 사이즈 값 저장
                      >
                        <option value="">선택해주세요</option>
                        {sizeOption.map((size, key) => {
                          return (
                            <option key={key} value={size}>
                              {size}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="mb-3">
                      <Label className="form-label">상세설명 </Label>
                      <div className="form-icon position-relative">
                        <i>
                          <MessageCircle className="fea icon-sm icons" />
                        </i>
                      </div>
                      <textarea
                        name="comments"
                        id="comments"
                        rows="4"
                        className="form-control ps-5"
                        placeholder="해당 상품에 대해 설명해주세요."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </Col>
                  <Col md="12">
                    {/* 파일등록 */}
                    <div className="mb-3">
                      <Label className="form-label">사진 올리기</Label>{" "}
                      <span className="text-danger">*</span>
                      <Input
                        type="file"
                        className="form-control"
                        id="fileupload"
                        multiple
                        onChange={handleFileChange}
                        disabled={imagePreviews.length >= maxImages} // 3장 다 올리면 비활성화
                      />
                      <small className="text-muted">
                        (최대 {maxImages}장까지 업로드 가능합니다.)
                      </small>
                    </div>
                    {/* 파일등록 */}

                    {/* 미리보기 */}
                    <div
                      className="image-preview-container"
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            width: "100px",
                            height: "100px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #ddd",
                          }}
                        >
                          <img
                            src={preview}
                            alt={`preview-${index}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {/* 삭제 버튼 */}
                          <button
                            onClick={() => handleDeleteImage(index)}
                            style={{
                              position: "absolute",
                              top: "2px",
                              right: "2px",
                              background: "rgba(0,0,0,0.6)",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* 미리보기기 */}
                  </Col>
                  <Col md="12">
                    <div className="mb-3"></div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <input
                      type="submit"
                      id="submit"
                      name="send"
                      className="submitBnt btn btn-primary"
                      value="등록하기"
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </TabPane>
  );
};

export default RegistProductTab;
