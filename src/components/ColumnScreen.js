import React, { useState, useEffect } from "react";
import BeerColumn from "./BeerColumn";
import PropTypes from "prop-types";

const ColumnScreen = ({
  beersData,
  listedBrewers,
  numOfDisplayed,
  setSelectedImg,
  appSettings,
  beersFromStorage,
  darkMode,
}) => {
  const [beersColOne, setBeersColOne] = useState([]);
  const [beersColTwo, setBeersColTwo] = useState([]);
  const [beersColThree, setBeersColThree] = useState([]);

  //Populating beer columns with localStorage data (on new selection)
  useEffect(() => {
    if (beersFromStorage) {
      setBeersColOne(beersFromStorage.storedColOne);
      setBeersColTwo(beersFromStorage.storedColTwo);
      setBeersColThree(beersFromStorage.storedColThree);
    }
  }, [beersFromStorage]);

  return (
    <>
      <div className="col-container">
        <BeerColumn
          beersData={beersData}
          numOfDisplayed={numOfDisplayed}
          listedBrewers={listedBrewers}
          beersCol={beersColOne}
          setBeersCol={setBeersColOne}
          setSelectedImg={setSelectedImg}
          appSettings={appSettings}
          beersFromStorage={beersFromStorage}
          darkMode={darkMode}
          beersColId={"col-one-id"}
        />

        <BeerColumn
          beersData={beersData}
          numOfDisplayed={numOfDisplayed}
          listedBrewers={listedBrewers}
          beersCol={beersColTwo}
          setBeersCol={setBeersColTwo}
          setSelectedImg={setSelectedImg}
          appSettings={appSettings}
          beersFromStorage={beersFromStorage}
          darkMode={darkMode}
          beersColId={"col-two-id"}
        />

        <BeerColumn
          beersData={beersData}
          numOfDisplayed={numOfDisplayed}
          listedBrewers={listedBrewers}
          beersCol={beersColThree}
          setBeersCol={setBeersColThree}
          setSelectedImg={setSelectedImg}
          appSettings={appSettings}
          beersFromStorage={beersFromStorage}
          darkMode={darkMode}
          beersColId={"col-three-id"}
        />
      </div>
    </>
  );
};

ColumnScreen.propTypes = {
  beersData: PropTypes.array.isRequired,
  listedBrewers: PropTypes.array.isRequired,
  showBrewerList: PropTypes.bool.isRequired,
  setShowBrewerList: PropTypes.func.isRequired,
  numOfDisplayed: PropTypes.number.isRequired,
  setSelectedImg: PropTypes.func.isRequired,
  appSettings: PropTypes.object.isRequired,
  beersFromStorage: PropTypes.object.isRequired,
  setBeersFromStorage: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default ColumnScreen;
