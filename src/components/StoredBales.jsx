import React, { useState, useEffect } from "react";
import StackEditor from "./StackEditor";

const StoredBales = ({ stacks, add }) => {
  const [currentStack, setStack] = useState(Array(12));
  const [code, setCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: ""
  });

  useEffect(() => {
    startFocus();
  }, []);

  const handleInput = event => {
    const { value, id } = event.target;
    const newCode = { ...code };
    console.log("Before auto remove: ", newCode);
    if (newCode[id]) newCode[id] = null;
    numInput.current.innerHTML = "";
    console.log("After auto remove: ", newCode);
    console.log("Before input: ", newCode);
    newCode[id] = value;
    console.log("After input: ", newCode);
    setCode(newCode);
    moveFocus(id);
  };

  const handleOnFocus = event => {
    console.log("HANDLE ON FOCUS", event.target);
  };

  const startFocus = () => {
    document.getElementById("firstDigit").focus();
  };

  // Doesnt work
  const clearFields = () => {
    const fields = document.getElementsByClassName("code-input");
    console.log("Fields: ", fields);
    for (let i = 0; i < fields.length; i++) {
      fields[i].innerText = "";
    }
  };

  let numInput = React.createRef();

  const moveFocus = id => {
    let nextElement;
    switch (id) {
      case "firstDigit":
        nextElement = "secondDigit";
        break;
      case "secondDigit":
        nextElement = "thirdDigit";
        break;
      case "thirdDigit":
        nextElement = "retrive-stack";
        break;
      default:
    }
    document.getElementById(nextElement).focus();
  };

  const clearStack = () => {
    setStack(Array(12));
  };

  const handleAddToContainer = () => {
    add(currentStack);
    clearStack();
    startFocus();
  };

  const retrieveStack = ({ firstDigit, secondDigit, thirdDigit }) => {
    const formattedCode = firstDigit + secondDigit + thirdDigit;
    if (stacks[formattedCode]) {
      setStack(stacks[formattedCode]);
    } else {
      alert(
        `The stack: ${formattedCode} does not appear to be in the database`
      );
    }
  };

  return (
    <div>
      <h1>STORED</h1>
      <div onChange={handleInput} id="three-digit-code">
        <input
          id="firstDigit"
          className="code-input"
          type="number"
          maxLength="1"
          value={code.firstDigit}
          ref={numInput}
          onFocus={handleOnFocus}
        />

        <input
          id="secondDigit"
          className="code-input"
          type="number"
          maxLength="1"
          ref={numInput}
        />
        <input
          id="thirdDigit"
          className="code-input"
          type="number"
          maxLength="1"
          value={code.thirdDigit}
          ref={numInput}
        />
      </div>

      <button id="retrive-stack" onClick={() => retrieveStack(code)}>
        Retreive Stack
      </button>
      <button onClick={() => clearFields()}>CLEAR FIELDS</button>
      <div id="stack-section">
        <StackEditor stack={currentStack} />
        <div id="stack-options">
          <button onClick={handleAddToContainer}>Add to container</button>
          <button onClick={() => clearStack()}>Clear Stack</button>
        </div>
      </div>
    </div>
  );
};

export default StoredBales;
