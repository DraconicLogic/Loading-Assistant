import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';

class App extends Component {
  state = {
    container: [["AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC"]],
    containerOverview: false,
  }
  render() {
    const { container, containerOverview } = this.state
      return (
        

        <div id="App">
          <h1>Stack Builder</h1>
          <button onClick={this.toggleContainerOverview}>Container Overview</button>
            {!containerOverview ? 
            <ProductList add={this.addToContainer} container={container}/> : 
            <ContainerOverview container={container}/>
            }
            
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

  toggleContainerOverview = () => {
    const { containerOverview } = this.state
    this.setState({
      containerOverview: !containerOverview
    })
  }
}

export default App;
