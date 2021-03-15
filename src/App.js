import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sass/main.css";
import Navbar from "./components/Navbar";
import ColumnScreen from "./components/ColumnScreen";
import Options from "./components/Options";
import Modal from "./components/BeerImgModal";
import Footer from "./components/Footer";

const App = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [appSettings, setAppSettings] = useState({
    numberOfDisplayed: 15,
    darkMode: false,
    sortBy: "",
  });
  const [beersFromStorage, setBeersFromStorage] = useState({
    storedColOne: [],
    storedColTwo: [],
    storedColThree: [],
  });
  const [showOptions, setShowOptions] = useState(false);
  const [showBrewerList, setShowBrewerList] = useState(false);
  const [beersData, setBeersData] = useState([]);
  const [listedBrewers, setListedBrewers] = useState([]);

  const { numberOfDisplayed, darkMode } = appSettings;

  let brewersData = beersData.map((beer) => {
    return beer.brewer;
  });

  // Fetching brewers list (without duplicates)
  const fetchBrewers = () => {
    let uniqueBrewers = () => {
      return Array.from(new Set(brewersData));
    };
    setListedBrewers(uniqueBrewers());
  };

  // Fetching 'raw' beers data
  const fetchBeersData = async () => {
    try {
      const { data } = await axios.get(`/beers`);
      setBeersData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching user-specified settings from local storage (if any)
  const fetchSettingsFromStorage = () => {
    let localStorageData = JSON.parse(localStorage.getItem("userSettings"));
    if (localStorageData) {
      setAppSettings({ ...localStorageData });
    }
  };

  // Fetching user selected beers from local storage (if any)
  const fetchBeersFromStorage = () => {
    let localStorageBeersData = JSON.parse(localStorage.getItem("userBeers"));
    if (localStorageBeersData) {
      setBeersFromStorage({ ...localStorageBeersData });
    }
  };

  // Fetch settings from localstorage on start
  useEffect(() => {
    fetchSettingsFromStorage();
  }, []);

  // Fetch beers displayed in the columns from localStorage on start
  useEffect(() => {
    fetchBeersFromStorage();
  }, []);

  // Fetching all beer data on start
  useEffect(() => {
    fetchBeersData();
  }, []);

  // Fetching selected num of beers -> fetching brewers
  useEffect(() => {
    fetchBrewers();
  }, [beersData]);

  return (
    <>
      <div
        className={`main ${darkMode ? "dark-background" : "light-background"}`}
      >
        <Navbar
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          darkMode={darkMode}
        />
        {showOptions && (
          <Options
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            appSettings={appSettings}
            setAppSettings={setAppSettings}
          />
        )}

        <div
          className={`column-section ${
            darkMode ? "dark-background" : "light-background"
          }`}
        >
          <ColumnScreen
            beersData={beersData}
            listedBrewers={listedBrewers}
            showBrewerList={showBrewerList}
            setShowBrewerList={setShowBrewerList}
            numOfDisplayed={numberOfDisplayed}
            setSelectedImg={setSelectedImg}
            appSettings={appSettings}
            beersFromStorage={beersFromStorage}
            setBeersFromStorage={setBeersFromStorage}
            darkMode={darkMode}
          />
        </div>
        <Footer darkMode={darkMode} />
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </div>
    </>
  );
};

export default App;
