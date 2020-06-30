import React, { useState } from "react";
import products from "../products/products.json";
import PropTypes from "prop-types";
import { Popover } from "@material-ui/core";

const StatusBar = ({ content, date }) => {
  const [extraInfo, setExtraInfo] = useState(false);

  const flattenedContent = content
    .reduce((flattened, stackObj) => {
      flattened.push(stackObj.stackContent);
      return flattened;
    }, [])
    .flat(1);
  console.log(flattenedContent);
  const rowNumber = Math.floor(content.length / 6);

  const totalBales = flattenedContent.length;

  const netWeight = flattenedContent.reduce((weight, item) => {
    return (weight += products[item].size);
  }, 0);

  const overWeightStyle = {
    color: "red",
  };

  const toggleExtraInfo = () => {
    setExtraInfo(!extraInfo);
  };

  return (
    <div id="status-bar">
      <span className="status-bar__item">Row: {rowNumber + 1}</span>
      <span className="status-bar__item">Bales: {totalBales}</span>
      <span
        onClick={toggleExtraInfo}
        className="status-bar__item"
        id="status-bar__weight"
        style={netWeight > 26500 ? overWeightStyle : null}
      >
        Weight: {netWeight}kg
      </span>
      <Popover
        open={extraInfo}
        anchorEl={document.getElementById("status-bar__weight")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={toggleExtraInfo}
      >
        Space Remaining: {26500 - netWeight}kg
      </Popover>
      <span className="status-bar__item">Date: {date}</span>
    </div>
  );
};

StatusBar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.string,
};

export default StatusBar;
