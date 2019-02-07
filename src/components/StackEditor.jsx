import React, { Component } from 'react';

class StackEditor extends Component {
  render() {
    const { bale, stack, position, handleContainer, clear, mark } = this.props
    return (
      <div id="stack-section">        
        <div id="stack-editor">      
          <div className={position === 0 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-1" onClick={() => mark(0)}>{stack[0] ? stack[0].code: null}</div>
          <div className={position === 1 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-2" onClick={() => mark(1)}>{stack[1] ? stack[1].code: null}</div>
          <div className={position === 2 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-3" onClick={() => mark(2)}>{stack[2] ? stack[2].code: null}</div>
          <div className={position === 3 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-4" onClick={() => mark(3)}>{stack[3] ? stack[3].code: null}</div>
          <div className={position === 4 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-5" onClick={() => mark(4)}>{stack[4] ? stack[4].code: null}</div>
          <div className={position === 5 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-6" onClick={() => mark(5)}>{stack[5] ? stack[5].code: null}</div>
          <div className={position === 6 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-7" onClick={() => mark(6)}>{stack[6] ? stack[6].code: null}</div>
          <div className={position === 7 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-8" onClick={() => mark(7)}>{stack[7] ? stack[7].code: null}</div>
          <div className={position === 8 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-9" onClick={() => mark(8)}>{stack[8] ? stack[8].code: null}</div>
          <div className={position === 9 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-10" onClick={() => mark(9)}>{stack[9] ? stack[9].code: null}</div>
          <div className={position === 10 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-11" onClick={() => mark(10)}>{stack[10] ? stack[10].code: null}</div>
          <div className={position === 11 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-12" onClick={() => mark(11)}>{stack[11] ? stack[11].code: null}</div>
        </div>
        <div id="stack-options">
          <button onClick={handleContainer}>Add to container</button>
          <button onClick={clear}>Clear Stack</button>
        </div>
      </div>
    );
  }
}

export default StackEditor;