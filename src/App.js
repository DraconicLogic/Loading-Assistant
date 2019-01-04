import React, { Component, Fragment } from 'react';
import ProductList from './components/ProductList.jsx'
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
          <ProductList/>
      </div>
    );
  }
}

export default App;
