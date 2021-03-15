import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// The sort-by, dark-mode and number of displayed elements settings work after
// clicking the confirm button and selecting new set of beers

const Options = ({
  showOptions,
  setShowOptions,
  appSettings,
  setAppSettings,
}) => {
  const [settingsData, setSettingsData] = useState({
    numberOfDisplayed: appSettings.numberOfDisplayed,
    darkMode: appSettings.darkMode,
    sortBy: appSettings.sortBy,
  });

  const { numberOfDisplayed, darkMode, sortBy } = settingsData;

  const onChange = (e) => {
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };

  const switchDarkMode = () => {
    let newMode = !darkMode;
    setSettingsData({ ...settingsData, darkMode: newMode });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newSettingsData = settingsData;
    setAppSettings({ ...newSettingsData });
    localStorage.setItem("userSettings", JSON.stringify(newSettingsData));
  };

  return (
    <>
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        className={`options-container ${
          appSettings.darkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="options-container__options-window">
          <div className="options-header">
            <h2>Settings</h2>
            <button
              className="close-options-btn"
              onClick={() => setShowOptions(!showOptions)}
            >
              <i
                className={` fas fa-times fa-1x ${
                  appSettings.darkMode ? "dark-mode" : "light-mode"
                }`}
              ></i>
            </button>
          </div>
          <hr />

          {/* Switch dark/light mode section starts here */}
          <div className={appSettings.darkMode ? "dark-mode" : "light-mode"}>
            <div className="change-mode-container">
              <span>{appSettings.darkMode ? "Dark" : "Light"} Mode</span>
              <div className="switch-container">
                <span
                  className="sun-icon"
                  style={{ color: appSettings.darkMode ? "grey" : "orange" }}
                >
                  ☀︎
                </span>
                <div className="switch-checkbox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={() => {
                        switchDarkMode();
                      }}
                    />
                    <span className="slider round"> </span>
                  </label>
                </div>
                <span
                  className="moon-icon"
                  style={{ color: appSettings.darkMode ? "#c96dfd" : "grey" }}
                >
                  ☽
                </span>
              </div>
            </div>
          </div>
          <hr />

          {/* Checklist starts here */}
          <div className="form-container">
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <h3 className="form-text">Number of elements</h3>
                <select
                  className={`${
                    appSettings.darkMode ? "dark-mode" : "light-mode"
                  }`}
                  name="numberOfDisplayed"
                  value={numberOfDisplayed}
                  onChange={(e) => onChange(e)}
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                  <option value={90}>90</option>
                </select>
              </div>
              <hr />

              <div className="form-group">
                <h3 className="form-text">Sort by</h3>
                <select
                  className={`${
                    appSettings.darkMode ? "dark-mode" : "light-mode"
                  }`}
                  name="sortBy"
                  value={sortBy}
                  onChange={(e) => onChange(e)}
                >
                  <option value="default">default</option>
                  <option value="name">name</option>
                  <option value="price">price</option>
                  <option value="type">type</option>
                </select>
              </div>
              <hr />
              <input
                value="Confirm"
                type="submit"
                className="confirm-settings-btn"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

Options.propTypes = {
  showOptions: PropTypes.bool.isRequired,
  setShowOptions: PropTypes.func.isRequired,
  appSettings: PropTypes.object.isRequired,
  setAppSettings: PropTypes.func.isRequired,
};

export default Options;
