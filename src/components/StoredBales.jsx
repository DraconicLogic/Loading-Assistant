import React, { useState, useEffect } from "react";
import StackEditor from "./StackEditor";
import CancelIcon from "@material-ui/icons/Cancel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import findEmptyPosition from "../utils.js";

const StoredBales = ({ stacks, add, saveUsedCode }) => {
  const [currentStack, setStack] = useState(Array(12));
  // rename to Stack ID
  const [code, setCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: ""
  });
  const [isStackEmpty, setIsStackEmpty] = useState(true);

  useEffect(() => {
    startFocus();
  }, []);

  useEffect(() => {
    checkID(code);
  }, [code]);

  const handleInput = event => {
    const { value, id } = event.target;
    const newCode = { ...code };

    if (newCode[id]) newCode[id] = null;

    newCode[id] = value;

    setCode(newCode);
    if (id !== "thirdDigit") moveFocus(id);
  };

  const checkID = code => {
    if (!!code.firstDigit && !!code.secondDigit && !!code.thirdDigit) {
      retrieveStack(code, stacks);
    }
  };

  const startFocus = () => {
    document.getElementById("firstDigit").focus();
  };

  const clearFields = () => {
    document.getElementById("recallid-input").reset();
    setCode({
      firstDigit: "",
      secondDigit: "",
      thirdDigit: ""
    });
  };

  const moveFocus = id => {
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

  const handleAddToContainer = () => {
    add(currentStack);
    setIsStackEmpty(true);
    clearStack();
    clearFields();
    startFocus();
  };

  const retrieveStack = ({ firstDigit, secondDigit, thirdDigit }, stacks) => {
    const formattedCode = firstDigit + secondDigit + thirdDigit;
    if (stacks[formattedCode]) {
      setStack(stacks[formattedCode]);
      saveUsedCode(formattedCode);
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
      <div>
        <h3>Please enter 3 digit Stack ID</h3>
        <form onChange={handleInput} id="recallid-input">
          <input
            id="firstDigit"
            className="code-input"
            type="tel"
            maxLength="1"
          />

          <input
            id="secondDigit"
            className="code-input"
            type="tel"
            maxLength="1"
          />
          <input
            id="thirdDigit"
            className="code-input"
            type="tel"
            maxLength="1"
          />
        </form>
        <div>
          <CancelIcon
            onClick={() => {
              clearFields();
              clearStack();
            }}
          />
        </div>
      </div>

      <div id="stack-section">
        <StackEditor stack={currentStack} />
        <div id="stack-options--2">
          <button
            className="stack-options__button"
            onClick={handleAddToContainer}
            disabled={isStackEmpty}
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

export default StoredBales;
