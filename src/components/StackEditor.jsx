import React, { Component } from 'react';

class StackEditor extends Component {
  render() {
    const { bale, stack, position, mark, context } = this.props
    
    const stackStyle = {
      height: '70%',
      width: '70%'
    }
// TODO: Stack size should be changable(Refactor using DRY)
    return (
             
        <div className="stack-editor"  style={context === "preview" ? stackStyle : null}>      
          <div className={position === 0 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-1" onClick={() => this.handleClick(0)}>{stack[0] ? stack[0].code: null}</div>
          <div className={position === 1 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-2" onClick={() => this.handleClick(1)}>{stack[1] ? stack[1].code: null}</div>
          <div className={position === 2 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-3" onClick={() => this.handleClick(2)}>{stack[2] ? stack[2].code: null}</div>
          <div className={position === 3 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-4" onClick={() => this.handleClick(3)}>{stack[3] ? stack[3].code: null}</div>
          <div className={position === 4 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-5" onClick={() => this.handleClick(4)}>{stack[4] ? stack[4].code: null}</div>
          <div className={position === 5 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-6" onClick={() => this.handleClick(5)}>{stack[5] ? stack[5].code: null}</div>
          <div className={position === 6 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-7" onClick={() => this.handleClick(6)}>{stack[6] ? stack[6].code: null}</div>
          <div className={position === 7 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-8" onClick={() => this.handleClick(7)}>{stack[7] ? stack[7].code: null}</div>
          <div className={position === 8 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-9" onClick={() => this.handleClick(8)}>{stack[8] ? stack[8].code: null}</div>
          <div className={position === 9 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-10" onClick={() => this.handleClick(9)}>{stack[9] ? stack[9].code: null}</div>
          <div className={position === 10 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-11" onClick={() => this.handleClick(10)}>{stack[10] ? stack[10].code: null}</div>
          <div className={position === 11 ? "stack-editor__bale--selected" : "stack-editor__bale"} id="stack-editor__bale-12" onClick={() => this.handleClick(11)}>{stack[11] ? stack[11].code: null}</div>
        </div>
        
      
    );
  }

  handleClick = (stackPosition) => {
    const { context, mark } = this.props
    if (context === 'editor') mark(stackPosition)
  }
}

export default StackEditor;