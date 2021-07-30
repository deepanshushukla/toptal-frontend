import React from "react";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import qs from "query-string";

import RangeFilter from "./RangeFilter";
import DropdownFilter from "./DropdownFilter";

//components
import { DROPDOWN, RANGE, filterConfig } from "../../constants/filterConfig";

import "./index.scss";

const Filters = ({ selectedFilter, fetchDataFromFilter }) => {
  const history = useHistory();
  const location = useLocation();
  const replaceHistory = (params) => {
    history.replace({
      pathname: location.pathname,
      search: qs.stringify(params),
      state: location.pathname,
    });
  };
  const onFilterSelect = (key, value) => {
    let filterParams = { ...selectedFilter, [key]: value };
    replaceHistory(filterParams);
    fetchDataFromFilter(filterParams);
  };
  const clearAllFilter = () => {
    replaceHistory({});
    fetchDataFromFilter({});
  };
  return (
    <>
      <div className="filtersConatiner">
        {filterConfig.map((item) => {
          if (item.type === DROPDOWN) {
            return (
              <DropdownFilter
                {...item}
                key={item.dataKey}
                selectedFilter={selectedFilter}
                onFilterSelect={onFilterSelect}
              />
            );
          }
          if (item.type === RANGE) {
            return (
              <RangeFilter
                  key={item.dataKey}
                  {...item}
                selectedFilter={selectedFilter}
                onFilterSelect={onFilterSelect}
              />
            );
          }
        })}
        {Object.keys(selectedFilter).length ? (
          <Button
            type="link"
            onClick={clearAllFilter}
            icon={<CloseCircleOutlined />}
          >
            Clear All Filters
          </Button>
        ) : null}
      </div>
    </>
  );
};
export default Filters;
