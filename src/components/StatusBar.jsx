import React from "react";
import products from "../products/products.json";

const StatusBar = ({ content, date }) => {
  console.log(content);
  const flattenedContent = content
    .reduce((flattened, stackObj) => {
      flattened.push(stackObj.content);
      return flattened;
    }, [])
    .flat(1);

  const rowNumber = Math.floor(content.length / 6);

  const totalBales = flattenedContent.length;

  const netWeight = flattenedContent.reduce((weight, item) => {
    return (weight += products[item].size);
  }, 0);

  return (
    <div id="status-bar">
      <span className="status-bar__item">Row: {rowNumber + 1}</span>
      <span className="status-bar__item">Bales: {totalBales}</span>
      <span className="status-bar__item">Weight: {netWeight}kg</span>
      <span className="status-bar__item">Date: {date}</span>
    </div>
  );
};

export default StatusBar;
