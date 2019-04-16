import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import * as utils from './utils.js'
// import testData from './testData.json'


class App extends Component {
  state = {
    date: '',
    containerNumber: '',
    sealNumber: '',
    container: [],
    containerOverview: false,
  }

  componentDidMount () {
    if (!localStorage.getItem(utils.getDate())) {
      const date = utils.getDate()
      this.setState({
        date
      })
    } else {
      const currentContainer = JSON.parse(localStorage.getItem(utils.getDate())) 
      this.setState(currentContainer)
    }
  }

  render() {
    const { container, containerOverview } = this.state
      return (
        

        <div id="App">
            {!containerOverview ? 
            <ProductList add={this.addToContainer} container={container} overview={this.toggleContainerOverview}/> : 
            <ContainerOverview 
            containerDetails={this.state} 
            overview={this.toggleContainerOverview} 
            finish={this.finishContainer}
            update={this.updateContainerAndSeal}/>
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
    }, () => {
      this.saveProgress()
    })
  }

  toggleContainerOverview = () => {
    const { containerOverview } = this.state
    this.setState({
      containerOverview: !containerOverview
    })
  }

  saveProgress = () => {
    const { date } = this.state
    localStorage.setItem(date, JSON.stringify(this.state))
  }

  finishContainer = () => {
    const { sealNumber, containerNumber } = this.state
    if (sealNumber && containerNumber) {
      utils.saveContainer(this.state)
      localStorage.clear()
    } else {
      alert("Please fill in BOTH Container Number and Seal Number")
    }
  }

  updateContainerAndSeal = ({containerNumber, sealNumber}) => {
    console.log('APP__UPDATE CONTAINER')
    this.setState({
      containerNumber,
      sealNumber
    })
  }

}

export default App;
