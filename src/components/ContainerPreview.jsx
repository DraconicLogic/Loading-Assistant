import React, { useState } from "react";
import StackEditor from "./StackEditor";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ContainerPreview = ({ container }) => {
  const [currentRow, setCurrentRow] = useState(0);
  const context = "preview";
  console.log(container);
  const rows = [];
  let workingRow = [];

  for (let i = 0; i < container.length; i++) {
    if (workingRow.length < 6) {
      workingRow.push(container[i].content);
    } else if (workingRow.length === 6) {
      rows.push(workingRow);
      workingRow = [];
      workingRow.push(container[i].content);
    }
  }
  console.log(rows);
  if (workingRow.length > 0) rows.push(workingRow);

  const handleNavigation = event => {
    const { value } = event.target;
    if (value === "left") {
      if (currentRow !== 0) setCurrentRow(currentRow - 1);
    }
    if (value === "right") {
      if (currentRow < rows.length - 1) setCurrentRow(currentRow + 1);
    }
  };

  return (
    <div id="container-preview">
      <h3 id="container-preview__row-header">{`ROW ${currentRow + 1}`}</h3>
      <button
        id="container-preview__left-button"
        value="left"
        onClick={handleNavigation}
        disabled={currentRow === 0}
      >
        <ArrowBackIosIcon />
      </button>
      <div className="container-preview__row">
        {rows.length > 0
          ? rows[currentRow].map((stack, index) => {
              return (
                <span className="container-preview__stack" key={index}>
                  <StackEditor stack={stack} context={context} />
                </span>
              );
            })
          : null}
      </div>
      <button
        id="container-preview__right-button"
        value="right"
        onClick={handleNavigation}
        disabled={currentRow + 1 === rows.length}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default ContainerPreview;
