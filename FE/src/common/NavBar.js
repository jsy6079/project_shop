import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  Modal,
  ModalBody,
} from "reactstrap";
import { ShoppingCart, Heart, User } from "react-feather";

//import images
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import logoMoa from "../assets/images/logo-moa.png";
import shop1 from "../assets/images/shop/product/s-1.jpg";
import shop2 from "../assets/images/shop/product/s-2.jpg";
import shop3 from "../assets/images/shop/product/s-3.jpg";

//Import Icons

function NavBar(props) {
  const [dropdownOpenShop, setDropdownOpenShop] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdownShop = () => {
    setDropdownOpenShop(!dropdownOpenShop);
  };

  const toggleWishlistModal = () => {
    setWishlistModal((prevState) => !prevState);
  };

  const toggleDropdownIsOpen = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const scrollNavigation = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const topNav = document.getElementById("topnav");
    const settingBtn = document.querySelector(".settingbtn");
    if (top > 80) {
      topNav.classList.add("nav-sticky");
      settingBtn.classList.add("btn-primary");
    } else {
      topNav?.classList.remove("nav-sticky");
      settingBtn?.classList.add("btn-primary");
      settingBtn?.classList.remove("btn-soft-primary");
    }
  };

  const isToggleMenu = () => {
    const isToggle = document.getElementById("isToggle");
    isToggle.classList.toggle("open");
    const isOpen = document.getElementById("navigation");
    if (isOpen.style.display === "block") {
      isOpen.style.display = "none";
    } else {
      isOpen.style.display = "block";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    initMenu();
    document.body.classList = "";
    window.addEventListener("scroll", scrollNavigation, true);
    return () => {
      window.removeEventListener("scroll", scrollNavigation, true);
    };
  }, [props.type]);

  const initMenu = () => {
    activateMenu();
  };

  const activateMenu = () => {
    const menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      let matchingMenuItem = null;
      for (let idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        const immediateParent = matchingMenuItem.closest("li");
        if (immediateParent) {
          immediateParent.classList.add("active");
        }
        const parent = matchingMenuItem.closest(".parent-menu-item");
        if (parent) {
          parent.classList.add("active");
          const parentOfParent = parent.closest(".parent-menu-item-sub");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          } else {
            const parentOfParent = parent.closest(".parent-menu-item-sub");
            if (parentOfParent) {
              parentOfParent.classList.add("active");
            }
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <Link className="logo" to="/">
            <img src={logoMoa} height="40" className="logo-light-mode" alt="" />
            <img src={logoMoa} height="40" className="logo-dark-mode" alt="" />
          </Link>

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                to="#"
                className="navbar-toggle"
                id="isToggle"
                onClick={isToggleMenu}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            <li className="list-inline-item mb-0 pe-1">
              <Link
                to="#"
                className="btn btn-icon btn-pills btn-primary"
                color="primary"
                onClick={toggleWishlistModal}
              >
                <Heart className="icons" />
              </Link>
            </li>
            <li className="list-inline-item mb-0">
              <Dropdown
                color="primary"
                isOpen={dropdownIsOpen}
                toggle={toggleDropdownIsOpen}
              >
                <DropdownToggle
                  type="button"
                  color="primary"
                  id="buyButton"
                  className="btn btn-icon btn-pills settingbtn"
                >
                  <User className="icons" />
                </DropdownToggle>
                <DropdownMenu
                  direction="start"
                  className="dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-3"
                  style={{ width: "200px" }}
                >
                  <Link className="dropdown-item" to="#">
                    <i className="uil uil-user align-middle me-1"></i> Account
                  </Link>
                  <Link className="dropdown-item" to="#">
                    <i className="uil uil-clipboard-notes align-middle me-1"></i>{" "}
                    Order History
                  </Link>
                  <Link className="dropdown-item" to="#">
                    <i className="uil uil-arrow-circle-down align-middle me-1"></i>{" "}
                    Download
                  </Link>
                  <div className="dropdown-divider my-3 border-top"></div>
                  <Link className="dropdown-item" to="#">
                    <i className="uil uil-sign-out-alt align-middle me-1"></i>{" "}
                    Logout
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>

          <div id="navigation">
            <ul className="navigation-menu">
              <li>
                <Link to="/category/1" className="sub-menu-item">
                  의류
                </Link>
              </li>

              <li>
                <Link to="/category/2" className="sub-menu-item">
                  {" "}
                  신발
                </Link>
              </li>

              <li>
                <Link to="/category/3" className="sub-menu-item">
                  {" "}
                  가방
                </Link>
              </li>

              <li>
                <Link to="/category/4" className="sub-menu-item">
                  {" "}
                  액세서리
                </Link>
              </li>
              <li>
                <Link to="/category/5" className="sub-menu-item">
                  {" "}
                  패션 잡화
                </Link>
              </li>
              <li>
                <Link to="/category/6" className="sub-menu-item">
                  {" "}
                  라이프 스타일
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Modal
        isOpen={wishlistModal}
        tabIndex="-1"
        centered
        contentClassName="rounded shadow-lg border-0 overflow-hidden"
        toggle={toggleWishlistModal}
      >
        <ModalBody className="py-5">
          <div className="text-center">
            <div
              className="icon d-flex align-items-center justify-content-center bg-soft-danger rounded-circle mx-auto"
              style={{ height: "95px", width: "95px" }}
            >
              <h1 className="mb-0">
                <i className="uil uil-heart-break align-middle"></i>
              </h1>
            </div>
            <div className="mt-4">
              <h4>Your wishlist is empty.</h4>
              <p className="text-muted">
                Create your first wishlist request...
              </p>
              <div className="mt-4">
                <Link to="#" className="btn btn-outline-primary">
                  + Create new wishlist
                </Link>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default NavBar;
