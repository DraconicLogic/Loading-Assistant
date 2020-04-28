import React from "react";
import products from "../products/products.json";
import PropTypes from "prop-types";

const StatusBar = ({ content, date }) => {
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

  return (
    <div id="status-bar">
      <span className="status-bar__item">Row: {rowNumber + 1}</span>
      <span className="status-bar__item">Bales: {totalBales}</span>
      <span
        className="status-bar__item"
        style={netWeight > 26000 ? overWeightStyle : null}
      >
        Weight: {netWeight}kg
      </span>
      <span className="status-bar__item">Date: {date}</span>
    </div>
  );
};

StatusBar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.string,
};

export default StatusBar;
