import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const BeerItem = ({ beer, setSelectedImg, darkMode }) => {
  const assignModalImg = () => {
    setSelectedImg(beer.image_url);
  };
  return (
    <>
      <motion.li
        className={`beer ${darkMode ? "beer-dark-mode" : "beer-light-mode"}`}
        id="beeritem"
        layout
        whileHover={{ opacity: 0.8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={`beer__image-container ${
            darkMode ? "beer-dark-mode" : "beer-light-mode"
          }`}
          onClick={() => assignModalImg()}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="beer__image"
            src={beer.image_url}
            onError={(e) => {
              e.target.src = "../../images/alt-beer.png";
            }}
            alt="../../images/alt-beer.png"
          ></motion.img>
        </div>
        <motion.div
          className={`beer__info`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>{beer.name}</p>
          <p>{beer.type}</p>
          <p>${beer.price}</p>
        </motion.div>
      </motion.li>
    </>
  );
};

BeerItem.propTypes = {
  beer: PropTypes.object.isRequired,
  setSelectedImg: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default BeerItem;
