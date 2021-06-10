import React, { Component } from 'react';
import ProductList from './components/ProductList/ProductList/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview/ContainerOverview/ContainerOverview.jsx';
import ProductListTab from "./components/AppTab/AppTab.jsx";
import StoredBales from './components/StoredBales/StoredBales/StoredBales.jsx';
import * as api from "./api.js"
import ResponseModal from './components/Modal/ResponseModal.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, Snackbar } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";
import PeekModal from './components/Modal/PeekModal.jsx';
import LoadingModal from './components/Modal/LoadingModal.jsx';
import PropTypes from 'prop-types'


// TODO: Apply theme colours for APp here at the top level
// const theme = {background: '1D8549'}
// ----------------------------------------------------------
class App extends Component {
  state = this.props.savedContainer || {
    date: this.props.date || '',
    containerNumber: '',
    sealNumber: '',
    containerContent: [],
    view: 0,
    storedStacks: this.props.storedStacks,
    response: null,
    usedCodes: [],
    menuStatus: false,
    peekStatus: false,
    noticeStatus: false
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

  toggleNotice = (newNoticeStatus) => {

    this.setState({
      noticeStatus: newNoticeStatus
    })
  }

  addToContainer = (stack) => {
    const newContent = [...this.state.containerContent]
    newContent.push(stack)
    this.setState({
      containerContent: newContent
    }, () => {
      this.saveProgress()
    })
  }

  removeFromContainer = (deleteId) => {
    const {containerContent, usedCodes} = this.state
    const newContent = [...containerContent]
    const newCodes = new Set([...usedCodes])
    newCodes.delete(deleteId)

    const stackIndex = newContent.findIndex((stack) => {
      return stack.stackId === deleteId;
    });

    newContent.splice(stackIndex, 1)
    
    this.setState({
      containerContent: newContent,
      usedCodes: newCodes
    })
  }

  addStackToDB = async (stack) => {
    console.log("Stack before DB: ", stack)
    document.getElementById('loading-modal').style.display = 'initial'
    const {stackId, content, date} = await api.saveStackToDB(stack)
    const newStoredStacks = {...this.state.storedStacks}
    newStoredStacks[stackId] = {stackId, content, date}
    console.log("newStack.date: ", date)
    this.setState({
      response: {stackId, content, date},
      storedStacks: newStoredStacks
    }, () => document.getElementById('loading-modal').style.display = 'none')
  }

  addContainerToDB = async (container) => {
    document.getElementById('loading-modal').style.display = 'initial'
    const { noticeStatus, usedCodes } = this.state
    const { response, storedStacks, view, ...rest} = container
    api.saveContainerToDB(rest)
    .then(() => {
      console.log("Saved Container")
      api.cleanupStackIDs(usedCodes)
      .then((deleteReport) => {
        console.log("Stack IDs released -> ", deleteReport)
      })
      
    })
    .catch((error) => console.error(error))
    
    this.toggleNotice(!noticeStatus)
    document.getElementById('loading-modal').style.display = 'none'
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

  displayView = (viewIndex, container) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = <ProductList 
        addToContainer={this.addToContainer} 
        addStackToDB={this.addStackToDB}
        storedStacks={this.state.storedStacks}
        />
        break;
        case 1:
          view = <StoredBales 
          stacks={this.state.storedStacks} 
          add={this.addToContainer}
          saveUsedCode={this.saveUsedCode}
          usedCodes={this.state.usedCodes}
          />
          break;
      case 2:
        view = <ContainerOverview 
        containerDetails={this.state} 
        update={this.updateContainerAndSeal}
        finish={this.addContainerToDB}
        remove={this.removeFromContainer}
        />
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>
    }
    return view
  }

  render() {
    const { containerContent, view, response, storedStacks, date, menuStatus, peekStatus, noticeStatus } = this.state
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
          <Snackbar 
            open={noticeStatus}
            autoHideDuration={10000}
            message="Container Completed - Email Sent"
            onClose={() => this.toggleNotice(!noticeStatus)}
          />

          
        </div>
      );
    
  }
  

}

App.propTypes = {
  storedStacks: PropTypes.object,
  savedContainer: PropTypes.object,
  date: PropTypes.string
}

export default App;