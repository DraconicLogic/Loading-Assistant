import React, { useState, useEffect } from "react";
import StackEditor from "../../StackEditor";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";
import CancelIcon from "@material-ui/icons/Cancel";

const ContainerPreview = ({ container, remove }) => {

  const [rows, setRows] = useState([[]]);
  const [currentRow, setCurrentRow] = useState(0);
  const [selectedStack, setSelectedStack] = useState(null);
  
  useEffect(() => {
    setRows(createRows(container));
  }, [])

  useEffect(() => {
    setCurrentRow((rows.length) - 1);
  }, [rows])



  const createRows = (container) => {
    const rows = [];
    let workingRow = [];

    for (let i = 0; i < container.length; i++) {
      if (workingRow.length < 6) {
        workingRow.push(container[i]);
      } else if (workingRow.length === 6) {
        rows.push(workingRow);
        workingRow = [];
        workingRow.push(container[i]);
      }
    }
    if (workingRow.length > 0) rows.push(workingRow);
    return rows;
  };

  const handleNavigation = (event) => {
    const { value } = event.target;
    if (value === "left") {
      if (currentRow !== 0) setCurrentRow(currentRow - 1);
    }
    if (value === "right") {
      if (currentRow < rows.length - 1) setCurrentRow(currentRow + 1);
    }
  };

  const handleSelect = (index) => {
    if (selectedStack === null) {
      setSelectedStack(index);
    } else if (selectedStack !== index) {
      setSelectedStack(index);
    } else {
      setSelectedStack(null);
    }
  };

  const handleRemove = (stackId) => {
    remove(stackId);
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
                <span
                  className={
                    index !== selectedStack
                      ? "container-preview__stack"
                      : "container-preview__stack--selected"
                  }
                  // consider changing key to stack.stackId
                  key={index}
                  id={`container-preview__stack-${index + 1}`}
                  onClick={() => handleSelect(index)}
                >
                  <StackEditor stack={stack.stackContent} context="preview" />
                  {index === selectedStack && (
                    <span id="container-preview__stack--hidden button">
                      <CancelIcon
                        style={{ float: "right" }}
                        onClick={() => handleRemove(stack.stackId)}
                      />
                      <span
                        style={{
                          float: "left",
                          backgroundColor: "white",
                          border: "black",
                          zIndex: "1",
                        }}
                      >
                        {stack.stackId}
                      </span>
                    </span>
                  )}
                </span>
              );
            })
          : null}
      </div>
      <button
        id="container-preview__right-button"
        value="right"
        onClick={handleNavigation}
        disabled={rows.length === 0 || currentRow + 1 === rows.length}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

ContainerPreview.propTypes = {
  container: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContainerPreview;
