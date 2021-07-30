import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'
import "antd/dist/antd.css";
import { Button, Input, Alert } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import useOutsideClickAlert from "../../../hooks/useOutsideClickAlert";
import { allowOnlyNumber } from "../../../helpers/allowOnlyNumber";
import "./index.scss";

const RangeFilter = ({
  placeHolder,
  onFilterSelect,
  selectedFilter,
  dataKey,
  labelFormatter,
}) => {
  let min, max;
  if (selectedFilter && selectedFilter[dataKey]) {
    [min, max] = selectedFilter[dataKey].split(",");
  }
  const [visible, setVisible] = useState(false);
  const [minInput, setMinInput] = useState(min !== undefined ? min : "");
  const [maxInput, setMaxInput] = useState(max !== undefined ? max : "");
  const [error, setError] = useState();
  const wrapperRef = useRef(null);
  useOutsideClickAlert(wrapperRef ,(hasClickedOut) => {
    if (hasClickedOut) {
      setVisible(false);
    }
  });

  useEffect(() => {
    if (!selectedFilter[dataKey]) {
      setMinInput("");
      setMaxInput("");
      setError("");
    }
  }, [selectedFilter]);
  const toggleOverlay = () => {
    setError("");
    setVisible(!visible);
  };
  const onSubmit = () => {
    if (!minInput) {
      setError("Min Value is not defined");
      return;
    }
    if (!maxInput) {
      setError("Max Value is not defined");
      return;
    }
    if (+maxInput < +minInput) {
      setError("Max should be greater than Min");
      return;
    }
    onFilterSelect(dataKey, `${minInput},${maxInput}`);
    toggleOverlay();
  };
  const onInputChange = ({ target: { name, value } }) => {
    setError("");
    if (name === "min") {
      setMinInput(value);
    }
    if (name === "max") {
      setMaxInput(value);
    }
  };
  return (
    <div className="rangeFilterConatiner" ref={wrapperRef}>
      <Button onClick={toggleOverlay}>
        {selectedFilter && selectedFilter[dataKey] && (min || max)
          ? labelFormatter(selectedFilter[dataKey])
          : `${placeHolder}`}
        {visible ? <UpOutlined /> : <DownOutlined />}
      </Button>
      {visible && (
        <div className="rangeOverlay">
          <h4>{placeHolder}</h4>
          {error && <Alert message={error} type="error" showIcon />}
          <Input.Group compact>
            <Input
              style={{ width: 100, textAlign: "center" }}
              name="min"
              value={minInput}
              onChange={onInputChange}
              onKeyPress={allowOnlyNumber}
              placeholder="Minimum"
            />
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: "none",
              }}
              placeholder="-"
              disabled
            />
            <Input
              className="site-input-right"
              name="max"
              value={maxInput}
              onKeyPress={allowOnlyNumber}
              onChange={onInputChange}
              style={{
                width: 100,
                textAlign: "center",
              }}
              placeholder="Maximum"
            />
          </Input.Group>
          <Button type="primary" onClick={onSubmit}>
            Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default RangeFilter;

RangeFilter.propTypes = {
  dataKey: PropTypes.string.isRequired,
  labelFormatter: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  selectedFilter: PropTypes.object.isRequired
};

RangeFilter.defaultProps = {
  dataKey: '',
  labelFormatter: ()=>{},
  onFilterSelect: ()=>{},
  placeHolder: '',
  selectedFilter: {},
};