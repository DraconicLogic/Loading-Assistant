import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';

class App extends Component {
  state = {
    container: [],
    containerOverview: false,
  }
  render() {
    return (
      

      <div id="App">
        <h1>Stack Builder</h1>
          <ProductList add={this.addToContainer}/>
      </div>
    );
  }
  addToContainer = (stack) => {
    const { container } = this.state
    const modifiedContainer = [...container]
    modifiedContainer.push(stack)
    this.setState({
      container: modifiedContainer
    })
  }
}

export default App;
