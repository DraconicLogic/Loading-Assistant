import React, { Component } from 'react';
import products from '../products.json';
import ProductButton from './ProductButton.jsx';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

class ProductList extends Component {
  state = {

  }
  render() {
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
      <div>
        Product List
        <div>Tabs: Small - Big - Giant</div>
        <div id='product-buttons'>
        {smallBales.map((bale) => {
          return <ProductButton product={bale}/>
        })}
        Product buttons</div>
      </div>
    );
  }
}

export default ProductList;
