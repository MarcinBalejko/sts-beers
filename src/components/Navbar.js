import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ showOptions, setShowOptions, darkMode }) => {
  return (
    <>
      <nav
        className={`navbar ${darkMode ? "dark-mode" : "light-mode"}`}
        style={{
          borderBottom: darkMode ? "1px solid violet" : "1px solid orange",
          color: darkMode ? "#19a2c1" : "#333",
        }}
      >
        <div className="navbar__content">
          <h1>BeerSTS</h1>
          <button
            className={`navbar__content__options-btn ${
              darkMode ? "dark-mode" : "light-mode"
            }`}
            style={{ color: darkMode ? "#19a2c1" : "#333" }}
            onClick={() => setShowOptions(!showOptions)}
          >
            <i className="fas fa-bars fa-2x"></i>
          </button>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  showOptions: PropTypes.bool.isRequired,
  setShowOptions: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default Navbar;
