import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import ProductListTab from "./components/ProductListTab.jsx";
import StoredBales from './components/StoredBales.jsx';
import * as api from "./api.js"
import ResponseModal from './components/ResponseModal.jsx';
import StatusBar from './components/StatusBar.jsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, Snackbar } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";
import PeekModal from './components/PeekModal.jsx';
import LoadingModal from './components/LoadingModal.jsx';
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
    view: 1,
    storedStacks: this.props.storedStacks,
    response: null,
    usedCodes: [],
    menuStatus: false,
    peekStatus: false,
    noticeStatus: false
  }

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

  toggleNotice = (newNoticeStatus) => {

    this.setState({
      noticeStatus: newNoticeStatus
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
        usedCodes={this.state.usedCodes}
        />
        break;
      case 1:
        view = <ProductList 
        addToContainer={this.addToContainer} 
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
  addToContainer = (stack) => {
    console.log('ADDING TO CONTAINER: ', stack)
    const newContent = [...this.state.containerContent]
    newContent.push({stackContent: stack})
    this.setState({
      containerContent: newContent
    }, () => {
      this.saveProgress()
    })
  }

  addStackToDB = async (stack) => {
    document.getElementById('loading-modal').style.display = 'initial'
    const {stackId, content, date} = await api.saveStackToDB(stack)
    console.log("RETURNED STACK FROM DB", stackId, content, date)
    const newStoredStacks = {...this.state.storedStacks}
    newStoredStacks[stackId] = content

    this.setState({
      response: {stackId, content, date},
      storedStacks: newStoredStacks
    }, () => document.getElementById('loading-modal').style.display = 'none')
  }

  addContainerToDB = async (container) => {
    const { noticeStatus } = this.state
    const { response, storedStacks, view, ...rest} = container
    console.log(rest)
    const returned = await api.saveContainerToDB(rest) 
    this.toggleNotice(!noticeStatus)
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

App.propTypes = {
  storedStacks: PropTypes.object,
  savedContainer: PropTypes.object,
  date: PropTypes.string
}

export default App;