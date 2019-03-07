import React, { Component, Fragment } from 'react';
import products from '../products.json';
import ProductButton from './ProductButton.jsx';
import StackEditor from './StackEditor.jsx';
import Tab from './Tab.jsx';
import ContainerPreview from './ContainerPreview.jsx';
import * as utils from '../utils.js'
import StackSize from './StackSize.jsx';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

class ProductList extends Component {
  state = {
    selected: '',
    stackPosition: null,
    currentStack: Array(12),
    productSize: 'small',
    previewVisable: false
  }

  render() {
    const { add, container } = this.props
    const { selected, stackPosition, currentStack, productSize, previewVisable } = this.state
    const productCodes = Object.keys(products)
    const bales = productCodes.filter((product) => {
      if (products[product].baleSize === productSize) {
        return product
      }
    })
    return (
      <Fragment>
        <div id="product-list">
          <Tab displayProducts={this.displayProducts}/>
          <div id='product-buttons'>
          {bales.map((bale) => {
            return <ProductButton selector={this.selectFromList} product={bale} selected={selected} />
          })}
          </div>
        </div>
        <ContainerPreview container={container} visable={previewVisable}/>
        <div id="stack-section"> 
          <StackSize size={this.toggleStackSize}/>
          <StackEditor 
          bale={selected} 
          stack={currentStack} 
          position={stackPosition}
          mark={this.markPosition}
          context="editor"/>
          <div id="stack-options">
            <button onClick={this.handleAddContainer}>Add to container</button>
            <button onClick={this.clearStack}>Clear Stack</button>
            <button onClick={this.togglePreview}>{previewVisable ? "Hide Preview" : "Show Preview"}</button>
        </div>
        </div>
        
        
      </Fragment>  
    );
  }

  selectFromList = (event) => {
    const { value } = event.target
    const { selected, stackPosition, currentStack } = this.state
    
    if (value === selected) {
      const emptyPosition = utils.findEmptyPosition(currentStack)
      this.addToStack(value, emptyPosition )
    } else if (stackPosition) {
      this.addToStack(value, stackPosition)
    } else {
      this.setState({
        selected: value
      })
    }
  }

  insertIntoStack = () => {

  }

  markPosition = (marker) => {
    const { stackPosition, selected } = this.state
 
    if (selected) {
      //This block adds a bale to the stack if a product button is already clicked
      this.addToStack(selected, marker)
      this.setState({
        stackPosition: null
      })

    } else {
      // the if statment below removes the marker if the same stack position is clicked again
        if (stackPosition === marker) marker = null
        // console.log(marker, 'MARKER')
        this.setState({
          stackPosition: marker
        })
      }

    
  }

  displayProducts = (size) => {
    this.setState({
      productSize: size
    })
  }

  addToStack = (baleCode, position) => {
    const {currentStack } = this.state
    
    if (currentStack.length <= 12) {
      const newStack = [...currentStack]
      newStack[position] = products[baleCode]
      console.log(newStack,'new stack')
      this.setState({
        currentStack: newStack,
        selected: '',
        stackPosition: null
      })
    }
  }

  handleAddContainer = () => {
    const { add } = this.props
    const { currentStack } = this.state
    add(currentStack)
    this.clearStack()
  }

  clearStack = () => {
    this.setState({
      currentStack: []
    })
  }

  togglePreview = () => {
    const { previewVisable } =  this.state
    this.setState({
      previewVisable: !previewVisable
    })
  }

  toggleStackSize = (size) => {
    this.setState({
      currentStack: Array(size)
    })
  }
}

export default ProductList;
