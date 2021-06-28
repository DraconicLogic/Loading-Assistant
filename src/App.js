import React, { Component, useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview/ContainerOverview/ContainerOverview.jsx';
import ProductListTab from "./components/AppTab/AppTab.jsx";
import StoredBales from './components/StoredBales/StoredBales/StoredBales.jsx';
import SplashScreen from './components/SplashScreen/SplashScreen.jsx'
import * as api from "./api.js"
import * as utils from "./utils.js"
import ResponseModal from './components/Modal/ResponseModal.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, Snackbar } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";
import PeekModal from './components/Modal/PeekModal.jsx';
import LoadingModal from './components/Modal/LoadingModal.jsx';
import dayjs from "dayjs"
import PropTypes from 'prop-types'

function App () {
  const [storedStacks, setStoredStacks] = useState({})
  const [date, setDate] = useState("")
  const [containerNumber, setContainerNumber] = useState("")
  const [sealNumber, setSealNumber] = useState("")
  const [containerContent, setContainerContent] = useState([])
  const [containerComplete, setContainerComplete] = useState(false)
  const [view, setView] = useState(0)
  const [response, setResponse] = useState(null)
  const [usedCodes, setUsedCodes] = useState([])
  const [menuStatus, setMenuStatus] = useState(false)
  const [peekStatus, setPeekStatus] = useState(false)
  const [noticeStatus, setNoticeStatus] = useState(false)
  const [dataSynced, setDataSynced] = useState(null)
  const [products, setProducts] =  useState({})
   
  useEffect(loadStackData, [])
  useEffect(getDate,[])
  useEffect(getProducts, [])

  useEffect(cacheContainer, [containerContent])
  useEffect(saveState,[containerContent])

  useEffect(saveContainerData, [containerComplete])

  useEffect(saveStackData, [storedStacks])

  function getProducts () {
    const items = JSON.parse(localStorage.getItem("products")) || api.getProducts()
    setProducts(items)
  }

  function saveStackData () {
    localStorage.setItem("stacks", JSON.stringify(utils.convertStacksToStorageFormat(storedStacks)))
  }

  function saveContainerData () {
    const containers = JSON.parse(localStorage.getItem("containers")) || {}
    containers[dayjs(date).format('DD/MM/YYYY')] = {containerNumber, sealNumber,date, containerContent}
    localStorage.setItem("containers", JSON.stringify(containers))
  }

  function saveState () {
    const currentState = {
      date,
      containerContent,
      usedCodes,
      containerNumber,
      sealNumber
    }
    const savedStates = JSON.parse(localStorage.getItem('savedStates')) || {}
    savedStates[dayjs(currentState.date).format('DD/MM/YYYY')] = currentState
    localStorage.setItem("saveStates", JSON.stringify(savedStates))
  }

  function getDate () {
    setDate(Date())
  }

  function loadStackData () {
    if (localStorage.getItem("stacks")) {
      const localData = JSON.parse(localStorage.getItem("stacks"))
      setStoredStacks(
        utils.convertStacksToStateFormat(localData)
      )

    } else {
      api.getStacks()
      .then((stacks) => {
        if (stacks) {
          setStoredStacks(
            utils.convertStacksToStateFormat(stacks)
          )
        }
      })
      .catch((error) => console.error(error))
    }
    return;
  }

  function toggleNotice (newNoticeStatus) {
    setNoticeStatus(newNoticeStatus)
  }

  function addToContainer (stack) {
    const newContent = [...containerContent]
    newContent.push(stack)
    setContainerContent(newContent)
  }

  function removeFromContainer (deleteId) {
    const newContent = [...containerContent]
    const newCodes = new Set([...usedCodes])
    newCodes.delete(deleteId)
    const stackIndex = newContent.findIndex((stack) => {
      return stack.stackId === deleteId;
    });
    newContent.splice(stackIndex, 1)
    setContainerContent(newContent)
    setUsedCodes(newCodes)
  }

  function addStackToDB (stack) {
    const {stackId, content, date} = stack
    const newStoredStacks = {...storedStacks}
    newStoredStacks[stackId] = {stackId, content, date}
    setResponse(stack)
    setStoredStacks(newStoredStacks)
  }
  
  function addContainerToDB  (container) {
    const { response, storedStacks, view, ...rest} = container
    setContainerComplete(true)

    api.saveContainerToDB(rest)
    .then(() => {
      console.log("Saved Container")
      api.cleanupStackIDs(usedCodes)
      .then((deleteReport) => {
        console.log("Stack IDs released -> ", deleteReport)
      })
      
    })
    .catch((error) => console.error(error))
    
    toggleNotice(!noticeStatus)
    document.getElementById('loading-modal').style.display = 'none'
  }

  function cacheContainer () {
    const currentContainer = {
      [dayjs(date).format('DD/MM/YYYY')]: containerContent}

    localStorage.setItem("currentContainer", JSON.stringify(currentContainer))
  }

  function closeModal () {
    setResponse(null)
  }

  function saveUsedCode (code) {
    const newUsedCodes = [...usedCodes]
    newUsedCodes.push(code)
    setUsedCodes(newUsedCodes)
  }

  function updateContainerAndSeal ({containerNumber, sealNumber}) {
    setContainerNumber(containerNumber)
    setSealNumber(sealNumber)
  }

  function toggleMenu () {
    setMenuStatus(!menuStatus)
  }

  function togglePeek() {
    setPeekStatus(!peekStatus)
  }

  function displayView (viewIndex, container) {
    let screen;
    switch (viewIndex) {
      case 0:
        screen = <ProductList 
        addToContainer={addToContainer} 
        addStackToDB={addStackToDB}
        storedStacks={storedStacks}
        />
        break;
        case 1:
          screen = <StoredBales 
          stacks={storedStacks} 
          add={addToContainer}
          saveUsedCode={saveUsedCode}
          usedCodes={usedCodes}
          />
          break;
      case 2:
        screen = <ContainerOverview 
        containerDetails={{containerContent, containerNumber, sealNumber}} 
        update={updateContainerAndSeal}
        finish={addContainerToDB}
        remove={removeFromContainer}
        />
        break;
      default:
        screen = <h1>500 - Something's gone horribly wrong. Contact Kingsley</h1>
    }
    return screen
  }

      return (    
        <div id="App">
          <SplashScreen setView={setView} 
        view={view}
        storedStacks={storedStacks}>
          <div id="main" className="fade-in"> 
             <Drawer open={menuStatus}>
            <CancelIcon onClick={toggleMenu}/>
            <List>
              <ListItem button onClick={() => {
                togglePeek()
                toggleMenu()
              }} >
                <ListItemText primary={"Check Imported Stacks"}/>
              </ListItem>
            </List>
          </Drawer>
          <LoadingModal />
          {peekStatus && <PeekModal storedStacks={storedStacks} togglePeek={togglePeek}/>}
          {!!response && <ResponseModal response={response} close={closeModal} />}
          <ProductListTab setView={setView} toggleMenu={toggleMenu} />
          {displayView(view, containerContent)} 
          <StatusBar content={containerContent} date={date} synced={dataSynced}/>
          <Snackbar 
            open={noticeStatus}
            autoHideDuration={10000}
            message="Container Completed"
            onClose={() => toggleNotice(!noticeStatus)}
          />
          </div>
         
        </SplashScreen>
        </div>
      );
}

App.propTypes = {
  storedStacks: PropTypes.object,
  savedContainer: PropTypes.object,
  date: PropTypes.string
}

export default App;