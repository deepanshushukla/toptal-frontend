import React, { useState } from "react";
import PropTypes from 'prop-types'
import "antd/dist/antd.css";
import { Select } from "antd";
import "./index.scss";

const { Option } = Select;

const DropdownFilter = ({
  placeHolder,
  values,
  dataKey,
  selectedFilter,
  onFilterSelect,
}) => {
  const onDropDownChange = (value = undefined) => {
    onFilterSelect(dataKey, value);
  };
  return (
    <div>
      <Select
        allowClear
        style={{ width: 200 }}
        placeholder={<span className={"blackText"}>{placeHolder}</span>}
        value={
          selectedFilter[dataKey] !== undefined
            ? Number(selectedFilter[dataKey])
            : undefined
        }
        onChange={onDropDownChange}
        onClear={onDropDownChange}
      >
        {values.map(({ value, label }) => {
          return (
            <Option key={value} value={value}>
              {label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

DropdownFilter.propTypes = {
  dataKey: PropTypes.string.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  selectedFilter: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired
};

export default DropdownFilter;
