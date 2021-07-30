import React from "react";
import { Divider, Space } from "antd";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

const ApartmentSummary = ({ apartment }) => {
  return (
    <Space direction="vertical">
      <section>{apartment.apartmentName}</section>
      <section className="apartmentDetail">
        <span>
          <span className="title">Price:</span> &#x20b9;
          {apartment.pricePerMonth}
        </span>
        <Divider type="vertical" />
        <span>
          <span className="title">Area in Sqft:</span> {apartment.floorAreaSize}
        </span>
        <Divider type="vertical" />
        <span>{apartment.numberOfRooms} BHK</span>
        <Divider type="vertical" />
        <span>
          <span className="title">Available for rent : </span>{" "}
          {apartment.isRented ? (
            <CloseCircleTwoTone twoToneColor="#ff0000" />
          ) : (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          )}
        </span>
      </section>
    </Space>
  );
};

export default ApartmentSummary;
