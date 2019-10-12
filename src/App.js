import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import ProductListTab from "./components/ProductListTab.jsx";
import * as utils from './utils.js'
import StoredBales from './components/StoredBales.jsx';
import { ThemeProvider } from '@material-ui/styles'
import storedStacks from './stacks.json'
// import testData from './testData.json'

const theme = {
  background: '1D8549'
}

class App extends Component {
  state = {
    date: '',
    containerNumber: '',
    sealNumber: '',
    // TODO: change "container" to "content"
    container: [],
    containerOverview: false,
    view: 1,
    storedStacks
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


  downloadStacks = () => {
    //download saved stack an put into state
  }

  handleViews = (event) => {
    const { value } = event.target
    this.changeView(Number(value))
  }

  changeView = (view) => {
    this.setState({
      view
    })
  }

  displayView = (viewIndex, container) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = <StoredBales stacks={this.state.storedStacks} add={this.addToContainer}/>
        break;
      case 1:
        view = <ProductList add={this.addToContainer} container={container} />
        break;
      case 2:
        view = <ContainerOverview 
        containerDetails={this.state} 
        overview={this.toggleContainerOverview} 
        finish={this.finishContainer}
        update={this.updateContainerAndSeal}/>
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>
    }
    return view
  }

  render() {
    const { container, containerOverview, view } = this.state
      return (
        

        <div id="App">
         
          <ProductListTab changeView={this.changeView} />

          {this.displayView(view, container)}
            {/* {!containerOverview ? 
            <ProductList add={this.addToContainer} container={container} overview={this.toggleContainerOverview}/> : 
            <ContainerOverview 
            containerDetails={this.state} 
            overview={this.toggleContainerOverview} 
            finish={this.finishContainer}
            update={this.updateContainerAndSeal}/>
            } */}
            
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
