import React, { useState } from "react";
import BeerItem from "./BeerItem";
import PropTypes from "prop-types";

const BeerColumn = ({
  listedBrewers,
  beersData,
  beersCol,
  setBeersCol,
  numOfDisplayed,
  setSelectedImg,
  appSettings,
  beersFromStorage,
  beersColId,
  darkMode,
}) => {
  const [showColBrewersList, setShowColBrewersList] = useState(false);

  const { sortBy } = appSettings;

  const filterByBrewer = (unfilteredData, selected) => {
    let filtered = unfilteredData.filter((beer) => beer.brewer === selected);
    return filtered;
  };

  const limitDisplayedBeers = (filteredBeers, limit) => {
    let limitedBeers = filteredBeers.slice(0, limit);
    return limitedBeers;
  };

  const sortingBeers = (listOfBeers, sortValue) => {
    if (sortValue === "name") {
      return listOfBeers.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortValue === "price") {
      return listOfBeers.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (sortValue === "type") {
      return listOfBeers.sort((a, b) => (a.type > b.type ? 1 : -1));
    } else {
      return listOfBeers;
    }
  };

  const fetchColumnBeers = (rawBeersData, selectedBrewer) => {
    let displayed;
    let filteredBeers = filterByBrewer(rawBeersData, selectedBrewer);
    let limitedForDisplay = limitDisplayedBeers(filteredBeers, numOfDisplayed);
    displayed = limitedForDisplay;
    let sorted = sortingBeers(displayed, sortBy);
    displayed = sorted;
    return displayed;
  };

  // Saving column's beers in the localstorage after each selection
  const saveBeersInStorage = (beers) => {
    if (beersColId === "col-one-id") {
      localStorage.setItem(
        "userBeers",
        JSON.stringify({ ...beersFromStorage, storedColOne: beers })
      );
    } else if (beersColId === "col-two-id") {
      localStorage.setItem(
        "userBeers",
        JSON.stringify({ ...beersFromStorage, storedColTwo: beers })
      );
    } else if (beersColId === "col-three-id") {
      localStorage.setItem(
        "userBeers",
        JSON.stringify({ ...beersFromStorage, storedColThree: beers })
      );
    }
  };

  return (
    <>
      <div
        className={`column ${
          (beersCol.length > 5 && "scrolling") || "noscrolling"
        }`}
      >
        <div className="column__dropdown">
          <button
            className={`column__dropdown-button ${
              darkMode
                ? "dark-mode-column-dropdown-btn"
                : "light-mode-column-dropdown-btn"
            }`}
            onClick={() => setShowColBrewersList(!showColBrewersList)}
          >
            {showColBrewersList ? (
              <i className="fas fa-times fa-1x"></i>
            ) : (
              <i className="fas fa-caret-down fa-2x"></i>
            )}
          </button>
        </div>

        <div
          className={`column__brewer-list-container ${beersColId} ${
            showColBrewersList ? "show" : "hidden"
          }`}
        >
          <ul className="brewer-list">
            {listedBrewers.map((brewer, index) => (
              <li
                key={index}
                onClick={() => {
                  let displayedBeers = fetchColumnBeers(beersData, brewer);
                  setTimeout(() => {
                    saveBeersInStorage(displayedBeers);
                  }, 200);
                  setBeersCol(displayedBeers);

                  setTimeout(() => {
                    setShowColBrewersList(!showColBrewersList);
                  }, 100);
                }}
              >
                {brewer}
              </li>
            ))}
          </ul>
        </div>
        {beersCol.length > 0 && (
          <div className="column__beer-list-container ">
            <ul className="beer-list">
              {beersCol.map((beer) => (
                <BeerItem
                  beer={beer}
                  setSelectedImg={setSelectedImg}
                  darkMode={darkMode}
                  key={beer.beer_id}
                />
              ))}
            </ul>
            {/* <button onClick={() => {
              loadMore()
            }}></button> */}
          </div>
        )}
      </div>
    </>
  );
};

BeerColumn.propTypes = {
  beersData: PropTypes.array.isRequired,
  listedBrewers: PropTypes.array.isRequired,
  numOfDisplayed: PropTypes.number.isRequired,
  beersCol: PropTypes.array.isRequired,
  setBeersCol: PropTypes.func.isRequired,
  setSelectedImg: PropTypes.func.isRequired,
  appSettings: PropTypes.object.isRequired,
  beersFromStorage: PropTypes.object,
  setBeersFromStorage: PropTypes.func.isRequired,
  beersColId: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
};

export default BeerColumn;
