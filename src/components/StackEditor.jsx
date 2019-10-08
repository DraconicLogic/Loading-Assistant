import React, { Component } from "react";

class StackEditor extends Component {
  render() {
    const { stack, position, context } = this.props;
    const stackStyle = {
      height: "70%",
      width: "70%"
    };

    const fillStack = [];
    for (let i = 0; i < stack.length; i++) {
      fillStack.push("");
    }
    return (
      <div
        className="stack-editor"
        style={context === "preview" ? stackStyle : null}
      >
        {fillStack.map((bale, index) => {
          return (
            <div
              className={
                position === index
                  ? "stack-editor__bale--selected"
                  : "stack-editor__bale"
              }
              id={`stack-editor__bale-${index + 1}`}
              onClick={() => this.handleClick(index)}
              key={index}
            >
              {stack[index] ? stack[index] : null}
            </div>
          );
        })}
      </div>
    );
  }

  handleClick = stackPosition => {
    const { context, mark } = this.props;
    if (context === "editor") mark(stackPosition);
  };
}

export default StackEditor;

/* -------------------------- Refactor to function -------------------------- */

// import React from 'react';

// const StackEditor = () => {
//   return (
//     <div>

//     </div>
//   );
// };

// export default StackEditor;
