import React, { Component, Fragment } from "react";
import products from "../products/products.json";
import ProductButton from "./ProductButton.jsx";
import StackEditor from "./StackEditor.jsx";
// import Tab from "./Tab.jsx";
import ContainerPreview from "./ContainerPreview.jsx";
import * as utils from "../utils.js";
import StackSize from "./StackSize.jsx";
import ProductListTab from "./ProductListTab.jsx";
import { generateUniqueCode } from "../recallidGenerator.js";

// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';

// import Typography from '@material-ui/core/Typography';

class ProductList extends Component {
  state = {
    selected: "",
    stackPosition: null,
    currentStack: Array(12),

    previewVisable: false,
    workingStack: null
  };

  render() {
    const { container, overview } = this.props;
    const {
      selected,
      stackPosition,
      currentStack,
      productSize,
      previewVisable,
      workingStack
    } = this.state;
    const productCodes = Object.keys(products);
    // eslint-disable-next-line
    const bales = productCodes.sort();

    return (
      <div id="product-list" className="App__view">
        <div id="product-list__buttons">
          {bales.map(bale => {
            return (
              <ProductButton
                selector={this.selectFromList}
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

  selectFromList = event => {
    const { value } = event.target;
    const { selected, stackPosition, currentStack } = this.state;
    if (value === selected) {
      const emptyPosition = utils.findEmptyPosition(currentStack);
      this.addToStack(value, emptyPosition);
    } else if (stackPosition) {
      this.addToStack(value, stackPosition);
    } else {
      this.setState({
        selected: value
      });
    }
  };

  markPosition = marker => {
    const { stackPosition, selected } = this.state;
    if (selected) {
      //This block adds a bale to the stack if a product button is already clicked
      this.addToStack(selected, marker);
      this.setState({
        stackPosition: null
      });
    } else {
      // the if statment below removes the marker if the same stack position is clicked again
      if (stackPosition === marker) marker = null;
      this.setState({
        stackPosition: marker
      });
    }
  };

  displayProducts = size => {
    this.setState({
      productSize: size
    });
  };

  addToStack = (baleCode, position) => {
    const { currentStack } = this.state;

    if (currentStack.length <= 12) {
      const newStack = [...currentStack];
      newStack[position] = baleCode;
      this.setState({
        currentStack: newStack,
        selected: "",
        stackPosition: null
      });
    }
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
