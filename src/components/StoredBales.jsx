import React, { useState } from "react";
import StackEditor from "./StackEditor";

const StoredBales = ({ stacks }) => {
  const [currentStack, setStack] = useState(Array(12));
  const [code, setCode] = useState(Array(3));

  const handleInput = event => {
    const { value, id } = event.target;
    const newCode = [...code];
    const index = id[id.length - 1];
    newCode[index] = value;
    setCode(newCode);
    moveFocus(id);
  };

  const moveFocus = id => {
    const idSansIndex = id.slice(0, id.length - 1);
    let newIndex = id.slice(id.length - 1);
    console.log("ID: ", id);
    console.log("ID Sans Index: ", idSansIndex);
    console.log("New Index: ", newIndex);
    console.log("Test function", newIndex + 1);
    if (newIndex < 2) {
      newIndex += 1;
      document.getElementById(`${idSansIndex}${newIndex}`).focus();
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

      <button onClick={() => retrieveStack(code)}>Retreive Stack</button>
      <StackEditor stack={currentStack} />
    </div>
  );
};

export default StoredBales;
