import React, { Component, Fragment } from 'react';
import ProductList from './components/ProductList.jsx'
import Stack from './components/Stack.jsx'
import './App.css';

class App extends Component {
  state = {
    container: [],
    containerOverview: false,
    stack: []
  }
  render() {
    return (
      

      <div id="App">
        <h1>Stack Builder</h1>
        <Fragment>
          <ProductList/>
        </Fragment>
        <Fragment>
          <Stack/>
        </Fragment>
      </div>
    );
  }
}

export default App;
