import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Mail, Phone, MapPin } from "react-feather";

const TransactionProductTab = ({ userInfo }) => {
  return (
    <TabPane className="show fade bg-white shadow rounded p-4" tabId="5">
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

            <tr>
              <th scope="row">8007</th>
              <td>4th November 2020</td>
              <td className="text-muted">Processing</td>
              <td>
                $ 800 <span className="text-muted">for 1item</span>
              </td>
              <td>
                <Link to="#" className="text-primary">
                  View <i className="uil uil-arrow-right"></i>
                </Link>
              </td>
            </tr>

            <tr>
              <th scope="row">8008</th>
              <td>4th November 2020</td>
              <td className="text-danger">Canceled</td>
              <td>
                $ 800 <span className="text-muted">for 1item</span>
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
    </TabPane>
  );
};

export default TransactionProductTab;
