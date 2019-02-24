import React, { Component, Fragment } from 'react';
import products from '../products.json';
import ProductButton from './ProductButton.jsx';
import StackEditor from './StackEditor.jsx';
import Tab from './Tab.jsx';
import ContainerPreview from './ContainerPreview.jsx';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

class ProductList extends Component {
  state = {
    selected: '',
    stackPosition: null,
    currentStack: [],
    productSize: 'small'
  }

  render() {
    const { add, container } = this.props
    const { selected, stackPosition, currentStack, productSize } = this.state
    const productCodes = Object.keys(products)
    const smallBales = productCodes.filter((product) => {
      if (products[product].baleSize === productSize) {
        return product
      }
    })
    return (
      <Fragment>
        <div id="product-list">
          {/* <div className="tab">
            <button className="tab-links" onClick={this.displayProducts} value="small">Small</button>
            <button className="tab-links" onClick={this.displayProducts} value="big">Big</button>
            <button className="tab-links" onClick={this.displayProducts} value="giant">Giant</button>
          </div> */}
          <Tab displayProducts={this.displayProducts}/>
          <div id='product-buttons'>
          {smallBales.map((bale) => {
            return <ProductButton selector={this.selectFromList} product={bale} selected={selected} />
          })}
          </div>
        </div>
        <ContainerPreview container={container}/>
        <div id="stack-section"> 
          <StackEditor 
          bale={selected} 
          stack={currentStack} 
          position={stackPosition}
          mark={this.markPosition}
          context="editor"/>
          <div id="stack-options">
            <button onClick={this.handleAddContainer}>Add to container</button>
            <button onClick={this.clearStack}>Clear Stack</button>
        </div>
        </div>
        
        
      </Fragment>  
    );
  }

  selectFromList = (event) => {
    const { value } = event.target
    const { selected, stackPosition } = this.state
    if (value === selected || stackPosition !== null) {
      this.addToStack(value)
      this.setState({
        selected : ""
      })
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
      this.addToStack(selected)
    } else if (stackPosition === marker) marker = null
    this.setState({
      stackPosition: marker
    })
  }

  displayProducts = (size) => {
    this.setState({
      productSize: size
    })
  }

  addToStack = (baleCode) => {
    const {currentStack, stackPosition} = this.state

    if (stackPosition !== null) {
      const newStack = [...currentStack]
      newStack[stackPosition] = products[baleCode]
      this.setState({
        currentStack: newStack,
        stackPosition: null
      })
    } else if (currentStack.length < 12) {
      const newStack = [...currentStack]
      newStack.push(products[baleCode])
      this.setState({
      currentStack: newStack
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

}

export default ProductList;
