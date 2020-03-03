import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import ProductListTab from "./components/ProductListTab.jsx";
import * as utils from './utils.js'
import StoredBales from './components/StoredBales.jsx';
import * as api from "./api.js"
import ResponseModal from './components/ResponseModal.jsx';
import StatusBar from './components/StatusBar.jsx';
import sendEmailToBoss from './email.js';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";
import PeekModal from './components/PeekModal.jsx';
import LoadingModal from './components/LoadingModal.jsx';


// TODO: Apply theme colours for APp here at the top level
// const theme = {background: '1D8549'}
// ----------------------------------------------------------
class App extends Component {
  state = this.props.savedContainer || {
    date: this.props.date || '',
    containerNumber: '',
    sealNumber: '',
    containerContent: [],
    view: 1,
    storedStacks: this.props.storedStacks,
    response: null,
    usedCodes: [],
    menuStatus: false,
    peekStatus: false
  }

  finishContainer = (container) => {
    this.addContainerToDB(container)
    sendEmailToBoss(container)
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
    console.log(process)
    const { containerContent, view, response, storedStacks, date, menuStatus, peekStatus } = this.state
    console.log(this.state)
    console.log(storedStacks)
      return (    
        <div id="App">
          <Drawer open={menuStatus}>
            <CancelIcon onClick={this.toggleMenu}/>
            <List>
              <ListItem button onClick={() => {
                this.togglePeek()
                this.toggleMenu()
              }} >
                <ListItemText primary={"Check Imported Stacks"}/>
              </ListItem>
            </List>
          </Drawer>
          <LoadingModal />
          {peekStatus && <PeekModal storedStacks={storedStacks} togglePeek={this.togglePeek}/>}
          {!!response && <ResponseModal response={response} close={this.closeModal} />}
          <ProductListTab changeView={this.changeView} toggleMenu={this.toggleMenu} />
          {this.displayView(view, containerContent)} 
          <StatusBar content={containerContent} date={date}/>
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
    document.getElementById('loading-modal').style.display = 'initial'
    const {recallid, content, date} = await api.saveStackToDB(stack)
    console.log("RETURNED STACK FROM DB", recallid, content, date)
    const newStoredStacks = {...this.state.storedStacks}
    newStoredStacks[recallid] = content

    this.setState({
      response: {recallid, content, date},
      storedStacks: newStoredStacks
    }, () => document.getElementById('loading-modal').style.display = 'none')
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

  toggleMenu = () => {
    const {menuStatus} = this.state
    this.setState({
      menuStatus: !menuStatus
    })
  }

  togglePeek = () => {
    const { peekStatus } = this.state
    this.setState({
      peekStatus: !peekStatus
      

    })
  }

}

export default App;