import PropTypes from 'prop-types'
import React from "react";
import "./index.scss";
const Header = ({ left, right, title }) => {
  return (
    <div className="header">
      <div className="header__title item">
        <p className="header__title"> {title}</p>
      </div>
      <div className="header__rest item">
        <div className="header__rest--left">{left}</div>
        <div className="header__rest--right">{right}</div>
      </div>
    </div>
  );
};
Header.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
  title: PropTypes.string.isRequired
};
export default Header;
