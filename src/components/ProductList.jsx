import React, { Component } from "react";
import products from "../products/products.json";
import ProductButton from "./ProductButton.jsx";
import StackEditor from "./StackEditor.jsx";
import * as utils from "../utils.js";
import StackSize from "./StackSize.jsx";
import { generateUniqueCode } from "../recallidGenerator.js";

class ProductList extends Component {
  state = {
    selected: "",
    stackPosition: 0,
    currentStack: Array(12),

    previewVisable: false,
    workingStack: null
  };

  componentDidUpdate(prevProps, prevState) {
    // Initial stackPosition doesn't act as intended
  }

  render() {
    const {
      selected,
      stackPosition,
      currentStack,
      previewVisable
    } = this.state;
    const productCodes = Object.keys(products);

    const bales = productCodes.sort();

    return (
      <div id="product-list" className="App__view">
        <div id="product-list__buttons">
          {bales.map(bale => {
            return (
              <ProductButton
                add={this.addToStack}
                product={bale}
                selected={selected}
                key={bale}
              />
            );
          })}
        </div>
        <div id="stack-section">
          <StackSize size={this.toggleStackSize} />
          <StackEditor
            bale={selected}
            stack={currentStack}
            position={stackPosition}
            mark={this.markPosition}
            context="editor"
          />
          <div id="stack-options">
            <button onClick={this.handleAddToDB}>Add to database</button>
            <button onClick={this.handleAddContainer}>Add to container</button>
            <button onClick={this.clearStack}>Clear Stack</button>
            <button onClick={this.togglePreview}>
              {previewVisable ? "Hide Preview" : "Show Preview"}
            </button>
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
    add(currentStack);
    this.clearStack();
  };

  clearStack = () => {
    const { currentStack } = this.state;
    this.setState({
      currentStack: Array(currentStack.length)
    });
  };

  togglePreview = () => {
    const { previewVisable } = this.state;
    this.setState({
      previewVisable: !previewVisable
    });
  };

  toggleStackSize = size => {
    this.setState({
      currentStack: Array(size)
    });
  };

  selectStack = stack => {
    console.log(stack);
    this.setState({
      workingStack: stack
    });
  };

  handleAddToDB = () => {
    const { currentStack } = this.state;
    const { addStackToDB, storedStacks } = this.props;
    const stackObj = {
      recallid: generateUniqueCode(storedStacks),
      content: currentStack,
      date: utils.getDate()
    };
    addStackToDB(stackObj);
    this.clearStack();
  };
}

export default ProductList;
