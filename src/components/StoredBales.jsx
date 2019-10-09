import React, { useState, useEffect } from "react";
import StackEditor from "./StackEditor";

const StoredBales = ({ stacks }) => {
  const [currentStack, setStack] = useState(Array(12));
  const [code, setCode] = useState(Array(3));

  useEffect(() => {
    startFocus();
  }, []);

  const handleInput = event => {
    const { value, id } = event.target;
    const newCode = [...code];
    const index = id[id.length - 1];
    newCode[index] = value;
    setCode(newCode);
    moveFocus(id);
  };

  const startFocus = () => {
    document.getElementById("three-digit-code__0").focus();
  };

  const moveFocus = id => {
    const idSansIndex = id.slice(0, id.length - 1);
    let index = Number(id.slice(id.length - 1));
    console.log("ID: ", id);
    console.log("ID Sans Index: ", idSansIndex);
    console.log("New Index: ", index);
    console.log("Test function", index + 1);
    if (index < 2) {
      index += 1;
      document.getElementById(`${idSansIndex}${index}`).focus();
    } else if (index === 2) {
      document.getElementById(`retrive-stack`).focus();
    }
  };

  const retrieveStack = codeArray => {
    const formattedCode = codeArray.join("");
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
          id="three-digit-code__0"
          className="code-input"
          type="number"
          maxLength="2"
        />
        <input
          id="three-digit-code__1"
          className="code-input"
          type="number"
          maxLength="2"
        />
        <input
          id="three-digit-code__2"
          className="code-input"
          type="number"
          maxLength="2"
        />
      </div>

      <button id="retrive-stack" onClick={() => retrieveStack(code)}>
        Retreive Stack
      </button>
      <div id="stack-section">
        <StackEditor stack={currentStack} />
        <div id="stack-options">
          <button
          // onClick={this.handleAddContainer}
          >
            Add to container
          </button>
          <button
          //  onClick={this.clearStack}
          >
            Clear Stack
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoredBales;
