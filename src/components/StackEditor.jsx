import React, { Component } from 'react';

class StackEditor extends Component {
  
  render() {
    const { bale, add, stack } = this.props
    console.log(stack)
    return (
      <div id="stack-section">
        <div id="stack-editor">
          <div className="stack-editor__bale" id="bale-1"onClick={() => add(bale)}></div>
          <div className="stack-editor__bale" id="bale-2"></div>
          <div className="stack-editor__bale" id="bale-3"></div>
          <div className="stack-editor__bale" id="bale-4"></div>
          <div className="stack-editor__bale" id="bale-5"></div>
          <div className="stack-editor__bale" id="bale-6"></div>
          <div className="stack-editor__bale" id="bale-7"></div>
          <div className="stack-editor__bale" id="bale-8"></div>
          <div className="stack-editor__bale" id="bale-9"></div>
          <div className="stack-editor__bale" id="bale-10"></div>
          <div className="stack-editor__bale" id="bale-11"></div>
          <div className="stack-editor__bale" id="bale-12"></div>
        </div>
        <div id="stack-options">
          Stack Options
        </div>
      </div>
    );
  }

}

export default StackEditor;