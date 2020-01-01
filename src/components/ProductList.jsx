import React, { Component } from "react";
import products from "../products/products.json";
import ProductButton from "./ProductButton.jsx";
import StackEditor from "./StackEditor.jsx";
import * as utils from "../utils.js";
import StackSize from "./StackSize.jsx";
import { generateUniqueCode } from "../recallidGenerator.js";
import CancelIcon from "@material-ui/icons/Cancel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";

class ProductList extends Component {
  state = {
    stackPosition: 0,
    currentStack: Array(12)
  };

  componentDidUpdate(prevProps, prevState) {
    // Initial stackPosition doesn't act as intended
  }

  render() {
    const { stackPosition, currentStack } = this.state;
    const productCodes = Object.keys(products);

    const bales = productCodes.sort();

    return (
      <div id="product-list" className="App__view">
        <div id="product-list__buttons">
          {bales.map(bale => {
            return (
              <ProductButton add={this.addToStack} product={bale} key={bale} />
            );
          })}
        </div>
        <div id="stack-section">
          <StackSize size={this.toggleStackSize} />
          <span id="cancel-button">
            <CancelIcon />
          </span>

          <StackEditor
            stack={currentStack}
            position={stackPosition}
            mark={this.markPosition}
            context="editor"
          />
          <div id="stack-options--1">
            <button
              className="stack-options__button"
              onClick={this.handleAddToDB}
            >
              <SaveSharpIcon>Save for Later</SaveSharpIcon>
            </button>
          </div>
          <div id="stack-options--2">
            <button
              className="stack-options__button"
              onClick={this.handleAddContainer}
            >
              <LocalShippingIcon />
            </button>
            {/* <button onClick={this.clearStack}>Clear</button> */}
          </div>
        </div>
      </div>
    );
  }

  markPosition = marker => {
    // const { stackPosition } = this.state;
    this.setState({
      stackPosition: marker
    });
  };

  displayProducts = size => {
    this.setState({
      productSize: size
    });
  };

  addToStack = baleCode => {
    const { currentStack, stackPosition } = this.state;

    if (currentStack.length <= 12) {
      const newStack = [...currentStack];
      newStack[stackPosition] = baleCode;
      this.setState(
        {
          currentStack: newStack
        },
        () => this.highlightNextPosition()
      );
    }
  };

  highlightNextPosition = () => {
    const { currentStack } = this.state;
    const emptyPosition = utils.findEmptyPosition(currentStack);
    this.setState({
      stackPosition: emptyPosition
    });
  };

  handleAddContainer = () => {
    const { add } = this.props;
    const { currentStack } = this.state;

    let isStackFilled = true;
    for (let i = 0; i < currentStack.length; i++) {
      if (currentStack[i] === undefined) {
        isStackFilled = false;
      }
    }

    if (isStackFilled) {
      add(currentStack);
      this.clearStack();
    } else {
      alert("Please fill in the stack");
    }
  };

  clearStack = () => {
    const { currentStack } = this.state;
    this.setState({
      currentStack: Array(currentStack.length),
      stackPosition: 0
    });
  };

  toggleStackSize = size => {
    this.setState({
      currentStack: Array(size)
    });
  };

  handleAddToDB = () => {
    const { currentStack } = this.state;
    const { addStackToDB, storedStacks } = this.props;
    let isStackFilled = true;
    for (let i = 0; i < currentStack.length; i++) {
      if (currentStack[i] === undefined) {
        isStackFilled = false;
      }
    }
    if (isStackFilled) {
      const stackObj = {
        recallid: generateUniqueCode(storedStacks),
        content: currentStack,
        date: utils.getDate()
      };
      addStackToDB(stackObj);
      this.clearStack();
    } else {
      alert("Please fill in the stack");
    }
  };
}

export default ProductList;
