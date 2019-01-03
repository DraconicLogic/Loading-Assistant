import React, { Component } from 'react';

class Stack extends Component {
  state = {
    bales: {

    }
  }
  render() {
    return (
      <div id="stack-section">
        <div id="stack-editor">
          <div className="stack-editor__bale" id="bale-one"></div>
          <div className="stack-editor__bale" id="bale-two"></div>
          <div className="stack-editor__bale" id="bale-three"></div>
          <div className="stack-editor__bale" id="bale-four"></div>
          <div className="stack-editor__bale" id="bale-five"></div>
          <div className="stack-editor__bale" id="bale-six"></div>
          <div className="stack-editor__bale" id="bale-seven"></div>
          <div className="stack-editor__bale" id="bale-eight"></div>
          <div className="stack-editor__bale" id="bale-nine"></div>
          <div className="stack-editor__bale" id="bale-ten"></div>
          <div className="stack-editor__bale" id="bale-eleven"></div>
          <div className="stack-editor__bale" id="bale-twelve"></div>
        </div>
        <div id="stack-options">
          Stack Options
        </div>
      </div>
    );
  }
}

export default Stack;