import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import ProductListTab from "./components/ProductListTab.jsx";
import * as utils from './utils.js'
import StoredBales from './components/StoredBales.jsx';
import * as api from "./api.js"
import ResponseModal from './components/ResponseModal.jsx';


// TODO: Apply theme colours for APp here at the top level
// const theme = {background: '1D8549'}
// ----------------------------------------------------------
class App extends Component {
  state = this.props.savedContainer || {
    date: '',
    containerNumber: '',
    sealNumber: '',
    containerContent: [],
    view: 1,
    storedStacks: this.props.storedStacks,
    response: null,
    usedCodes: []
  }

  async componentDidMount () {
    
   
    
  }

  checkForLoadingSession = () => {}

  finishContainer = (container) => {
    this.addContainerToDB(container)
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
        view = <StoredBales 
        stacks={this.state.storedStacks} 
        add={this.addToContainer}
        saveUsedCode={this.saveUsedCode}
        />
        break;
      case 1:
        view = <ProductList 
        add={this.addToContainer} 
        container={container} 
        addStackToDB={this.addStackToDB}
        storedStacks={this.state.storedStacks}
        />
        break;
      case 2:
        view = <ContainerOverview 
        containerDetails={this.state} 
        update={this.updateContainerAndSeal}
        finish={this.finishContainer}
        />
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>
    }
    return view
  }

  render() {
    const { containerContent, view, response, storedStacks } = this.state
    console.log(this.state)
    console.log(storedStacks)
      return (    
        <div id="App">

          {!!response && <ResponseModal response={response} close={this.closeModal} />}
          <ProductListTab changeView={this.changeView} />
          {this.displayView(view, containerContent)} 
        </div>
      );
    
  }
  addToContainer = (stack) => {
    console.log('ADDING TO CONTAINER: ', stack)
    const newContent = [...this.state.containerContent]
    newContent.push({content: stack})
    this.setState({
      containerContent: newContent
    }, () => {
      this.saveProgress()
    })
  }

  addStackToDB = async (stack) => {
    const {recallid, content, date} = await api.saveStackToDB(stack)
    console.log("RETURNED STACK FROM DB", recallid, content, date)
    const newStoredStacks = {...this.state.storedStacks}
    newStoredStacks[recallid] = content

    this.setState({
      response: {recallid, content, date},
      storedStacks: newStoredStacks
    })
  }

  addContainerToDB = async (container) => {
    const { response, storedStacks, view, ...rest} = container
    console.log(rest)
    const returned = await api.saveContainerToDB(rest) 
    console.log(returned )
  }

  saveProgress = () => {
    const { date } = this.state
    localStorage.setItem(date, JSON.stringify(this.state))
  }

  closeModal = () => {
    this.setState({
      response: null
    })
  }

  saveUsedCode = (code) => {
    const usedCodesCopy = [...this.state.usedCodes]
    usedCodesCopy.push(code)
    this.setState({
      usedCodes: usedCodesCopy
    })
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
