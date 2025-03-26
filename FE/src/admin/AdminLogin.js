import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { ArrowLeft } from "react-feather";
import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        ApiUrl + "/api/admin/login",
        {
          adminUserEmail: email,
          adminUserPassword: pw,
        },
        { withCredentials: true }
      );

      alert("로그인 성공");
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data);
    }
  };

  return (
    <>
      <div className="back-to-home">
        <Link to="/" className="back-button btn btn-icon btn-primary">
          <i>
            <ArrowLeft className="icons" />
          </i>
        </Link>
      </div>
      <section className="bg-home d-flex align-items-center position-relative">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="form-signin p-4 bg-white rounded shadow">
                <form onSubmit={handleLogin}>
                  <Link to="/">
                    {/* <img
                      src={logoIcon}
                      className="avatar avatar-small mb-4 d-block mx-auto"
                      alt=""
                    /> */}
                  </Link>
                  <h5 className="mb-3 text-center">관리자 전용 로그인</h5>

                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">ID</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="mb-3"></div>
                    <p className="forgot-pass mb-0"></p>
                  </div>

                  <button className="btn btn-primary w-100" type="submit">
                    로그인
                  </button>

                  <p className="mb-0 text-muted mt-3 text-center">
                    ©{new Date().getFullYear()} Moa
                  </p>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Adminlogin;
