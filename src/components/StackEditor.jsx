import React, { Component } from 'react';

class StackEditor extends Component {

  render() {
    const { bale, stack } = this.props
    console.log(stack)
    return (
      <div id="stack-section">
        <div id="stack-editor">
          <div className="stack-editor__bale" id="bale-1">{stack[0] ? stack[0].code: null}</div>
          <div className="stack-editor__bale" id="bale-2">{stack[1] ? stack[1].code: null}</div>
          <div className="stack-editor__bale" id="bale-3">{stack[2] ? stack[2].code: null}</div>
          <div className="stack-editor__bale" id="bale-4">{stack[3] ? stack[3].code: null}</div>
          <div className="stack-editor__bale" id="bale-5">{stack[4] ? stack[4].code: null}</div>
          <div className="stack-editor__bale" id="bale-6">{stack[5] ? stack[5].code: null}</div>
          <div className="stack-editor__bale" id="bale-7">{stack[6] ? stack[6].code: null}</div>
          <div className="stack-editor__bale" id="bale-8">{stack[7] ? stack[7].code: null}</div>
          <div className="stack-editor__bale" id="bale-9">{stack[8] ? stack[8].code: null}</div>
          <div className="stack-editor__bale" id="bale-10">{stack[9] ? stack[9].code: null}</div>
          <div className="stack-editor__bale" id="bale-11">{stack[10] ? stack[10].code: null}</div>
          <div className="stack-editor__bale" id="bale-12">{stack[11] ? stack[11].code: null}</div>
        </div>
        <div id="stack-options">
          Stack Options
        </div>
      </div>
    );
  }

}

export default StackEditor;