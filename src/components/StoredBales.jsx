import React, { useState, useEffect } from "react";
import StackEditor from "./StackEditor";
import CancelIcon from "@material-ui/icons/Cancel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PropTypes from "prop-types";
import StackIDHistory from "./StackIDHistory";

const StoredBales = ({ stacks, add, saveUsedCode, usedCodes }) => {
  const [currentStack, setStack] = useState(Array(12));
  // rename to Stack ID
  const [code, setCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
  });
  const [isStackEmpty, setIsStackEmpty] = useState(true);

  useEffect(() => {
    startFocus();
  }, []);

  useEffect(() => {
    checkID(code);
  }, [code]);

  const handleInput = (event) => {
    const { value, id } = event.target;
    const newCode = { ...code };

    if (newCode[id]) newCode[id] = null;

    newCode[id] = value;

    setCode(newCode);
    if (id !== "thirdDigit") moveFocus(id);
  };

  const checkID = (code) => {
    if (!!code.firstDigit && !!code.secondDigit && !!code.thirdDigit) {
      retrieveStack(code, stacks);
    }
  };

  const startFocus = () => {
    document.getElementById("firstDigit").focus();
  };

  const clearFields = () => {
    document.getElementById("stackId-input").reset();
    setCode({
      firstDigit: "",
      secondDigit: "",
      thirdDigit: "",
    });
  };

  const moveFocus = (id) => {
    let nextElement;
    switch (id) {
      case "firstDigit":
        nextElement = "secondDigit";
        break;
      case "secondDigit":
        nextElement = "thirdDigit";
        break;

      default:
    }
    document.getElementById(nextElement).focus();
  };

  const clearStack = () => {
    setStack(Array(12));
    setIsStackEmpty(true);
  };

  const handleAddToContainer = ({ firstDigit, secondDigit, thirdDigit }) => {
    const formattedCode = firstDigit + secondDigit + thirdDigit;
    saveUsedCode(formattedCode);
    add(currentStack);
    setIsStackEmpty(true);
    clearStack();
    clearFields();
    startFocus();
  };

  const retrieveStack = ({ firstDigit, secondDigit, thirdDigit }, stacks) => {
    const usedCodesSet = new Set(usedCodes);
    const formattedCode = firstDigit + secondDigit + thirdDigit;
    if (usedCodesSet.has(formattedCode)) {
      alert(`Stack ${formattedCode} has already being loaded`);
    } else if (stacks[formattedCode]) {
      setStack(stacks[formattedCode]);
      setIsStackEmpty(false);
    } else {
      alert(
        `The stack: ${formattedCode} does not appear to be in the database`
      );
      clearFields();
    }
  };

  return (
    <div id="stored-bales" className="App__view">
      <div id="stored-bales__top">
        <form
          onInput={handleInput}
          id="stackId-input"
          data-testid="stackID-input"
        >
          <h3>Please enter 3 digit Stack ID</h3>
          <input
            id="firstDigit"
            className="code-input"
            type="tel"
            maxLength="1"
            data-testid="stackID_1"
          />

          <input
            id="secondDigit"
            className="code-input"
            type="tel"
            maxLength="1"
            data-testid="stackID_2"
          />
          <input
            id="thirdDigit"
            className="code-input"
            type="tel"
            maxLength="1"
            data-testid="stackID_3"
          />
          <span style={{ marginLeft: "10px" }}>
            <CancelIcon
              onClick={() => {
                clearFields();
                clearStack();
              }}
            />
          </span>
        </form>
        <StackIDHistory usedCodes={usedCodes} />
      </div>

      <div id="stack-section">
        <StackEditor stack={currentStack} />
        <div id="stack-options--2">
          <button
            className="stack-options__button"
            onClick={() => handleAddToContainer(code)}
            disabled={isStackEmpty}
            data-testid="add-to-container"
          >
            <LocalShippingIcon />
          </button>
        </div>
        <div id="stack-options--1"></div>
        <span id="cancel-button">
          <CancelIcon onClick={() => clearStack()} />
        </span>
      </div>
    </div>
  );
};

StoredBales.propTypes = {
  stacks: PropTypes.object.isRequired,
  add: PropTypes.func,
  saveUsedCode: PropTypes.func,
};

export default StoredBales;
