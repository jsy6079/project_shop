import React from "react";
import { NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useUser } from "../userContext";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { userInfo, setUserInfo, fetchUserInfo } = useUser(); // 전역 상태 사용
  const menus = [
    { id: "1", icon: "uil-user", label: "계정 관리" },
    { id: "2", icon: "uil-heart", label: "찜 목록" },
    { id: "3", icon: "uil-credit-card", label: "마일리지" },
    { id: "4", icon: "uil-store", label: "판매물품 등록" },
    { id: "5", icon: "uil-transaction", label: "진행중인 거래" },
    { id: "6", icon: "uil-clipboard-notes", label: "구매/판매 이력" },
    { id: "7", icon: "uil-clipboard-notes", label: "관리자 문의" },
  ];

  return (
    <ul className="nav nav-pills nav-justified flex-column rounded shadow p-3 mb-0">
      {menus.map((menu) => (
        <NavItem key={menu.id}>
          <NavLink
            className={classnames({ active: activeTab === menu.id }, "rounded")}
            onClick={() => setActiveTab(menu.id)}
          >
            <div className="text-start py-1 px-3">
              <h6 className="mb-0">
                <i
                  className={`uil ${menu.icon} h5 align-middle me-2 mb-0 me-2`}
                />

                {menu.label}
              </h6>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </ul>
  );
};

export default Sidebar;
