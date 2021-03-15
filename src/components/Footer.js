import React from "react";
import PropTypes from "prop-types";

const Footer = ({ darkMode }) => {
  return (
    <>
      <div
        className={`footer-container ${
          darkMode ? "dark-mode-footer" : "light-mode-footer"
        }`}
      ></div>
    </>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool,
};

export default Footer;
