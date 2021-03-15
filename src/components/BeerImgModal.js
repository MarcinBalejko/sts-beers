import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const BeerImgModal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        src={selectedImg}
        onError={(e) => {
          e.target.src = "../../images/alt-beer.png";
        }}
        alt="../../images/alt-beer.png"
      />
    </motion.div>
  );
};

BeerImgModal.propTypes = {
  selectedImg: PropTypes.string.isRequired,
  setSelectedImg: PropTypes.func.isRequired,
};

export default BeerImgModal;
