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

const MileageTab = ({ userInfo }) => {
  return (
    <TabPane className="show fade bg-white shadow rounded p-4" tabId="3">
      <div className="table-responsive bg-white shadow rounded">
        <Table className="table mb-0 table-center table-nowrap">
          <thead>
            <tr>
              <th scope="col" className="border-bottom">
                Product Name
              </th>
              <th scope="col" className="border-bottom">
                Description
              </th>
              <th scope="col" className="border-bottom">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Quick heal</th>
              <td className="text-muted">
                It is said that song composers of the past <br /> used dummy
                texts as lyrics when writing <br /> melodies in order to have a
                'ready-made' <br /> text to sing with the melody.
              </td>
              <td className="text-success">Downloaded</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </TabPane>
  );
};

export default MileageTab;
