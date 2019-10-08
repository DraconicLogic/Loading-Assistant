import React, { useState } from "react";
import StackEditor from "./StackEditor";

const StoredBales = ({ stacks }) => {
  const [stack, setStack] = useState(Array(12));
  const [code, setCode] = useState(Array(3));

  const handleInput = event => {
    const { value, id } = event.target;
    console.log("STORED BALES VALUE", value);
    console.log("STORED BALES ID", id);
    const newCode = [...code];
    const index = id[id.length - 1];
    newCode[index] = value;
    setCode(newCode);
  };

  const retrieveStack = codeArray => {
    const formattedCode = codeArray.join("");
    console.log("FORMATTED CODE: ", formattedCode);
    console.log("CODE ARRAY: ", codeArray);
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
      <StackEditor stack={stack} />
    </div>
  );
};

export default StoredBales;
