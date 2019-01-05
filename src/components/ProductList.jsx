import React, { Component, Fragment } from 'react';
import products from '../products.json';
import ProductButton from './ProductButton.jsx';
import StackEditor from './StackEditor.jsx';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

class ProductList extends Component {
  state = {
    selected: '',
    currentStack: []
  }

  render() {
    const { add } = this.props
    const { selected, currentStack } = this.state
    const productCodes = Object.keys(products)
    const smallBales = productCodes.filter((product) => {
      if (products[product].baleSize === 'small') {
        return product
      }
    })
    const bigBales = productCodes.filter((product) => {
    if (products[product].baleSize === 'big') {
      return product
    }
  })
    return (
      <Fragment>
        <div id="product-list">
          <div>Tabs: Small - Big - Giant</div>
          <div>Top 5 Bales</div>
          <div id='product-buttons'>
          {smallBales.map((bale) => {
            return <ProductButton selector={this.selectFromList} product={bale} selected={selected} />
          })}
          </div>
        </div>
        <StackEditor 
        bale={selected} 
        stack={currentStack} 
        handleContainer={this.handleAddContainer}
        clear={this.clearStack}/>
      </Fragment>  
    );
  }

  selectFromList = (event) => {
    const { value } = event.target
    const { selected } = this.state
    if (value === selected) {
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

  addToStack = (baleCode) => {
    const {currentStack} = this.state

    if (currentStack.length < 12) {
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
    const { currentStack } = this.state
    this.setState({
      currentStack: []
    })
  }

}

export default ProductList;
