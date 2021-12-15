import React, { useState, useEffect } from 'react';

import './App.css';

import ProductListTab from "./components/AppTab/AppTab.jsx";

import SplashScreen from './components/SplashScreen/SplashScreen.jsx'
import * as api from "./api.js"
import * as local from "./local.js"
import * as utils from "./utils.js"
import ResponseModal from './components/Modal/ResponseModal.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';



import { Snackbar } from '@material-ui/core';

import PeekModal from './components/Modal/PeekModal.jsx';
import LoadingModal from './components/Modal/LoadingModal.jsx';
import PropTypes from 'prop-types'
import Menu from './components/Menu/Menu.jsx';
import DisplayView from './components/DisplayView/DisplayView.jsx';

function App () {
  const [date, setDate] = useState("")
  const [savedStacks, setSavedStacks] = useState({})
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
  const [dataSynced, setDataSynced] = useState(true)
  const [products, setProducts] =  useState(null)
   

  useEffect(saveState)
  useEffect(sync, [date])

  function sync() {
    // TODO: need to finish implementing this function
    setDataSynced(null)
    switch(utils.syncData(savedStacks)) {
      
      default: setDataSynced(true)
    }
  }

  function saveStackData (newStack) {
    local.saveStackLocal(newStack)
    alert(`Stack ${newStack.stackId} saved locally`)

    api.saveStackDB(newStack)
    .then((stack) => {    
       alert(`Stack ${stack.stackId} has been saved in the DB`)
    }).catch((error) => {
      console.log("Save Stack DB error(App.js level)")
      console.error(error)
    })
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
    savedStates[currentState.date] = currentState
    localStorage.setItem("saveStates", JSON.stringify(savedStates))
  }

  function toggleNotice (newNoticeStatus) {
    setNoticeStatus(newNoticeStatus)
  }

  function addToContainer (stack) {
    if (!containerComplete) {
      const newContent = [...containerContent]
      newContent.push(stack)
      setContainerContent(newContent)
    }
    // if (containerComplete) then make alert. For why there no more adding stacks to container
  }

  function removeFromContainer (deleteId) {
    if (!containerComplete) {
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
  }

  function addStack (stack) {
    const {stackId, content, date} = stack
    const newSavedStacks = {...savedStacks}
    newSavedStacks[stackId] = {stackId, content, date}
    setResponse(stack)
    setSavedStacks(newSavedStacks)
    saveStackData(stack)

  }
  
  function addContainerToDB  (container) {
    // need to add functionallity to remove stacks loaded from state and local storage. Remove from should be reviewed at this time.
    
    console.log("Saving Container:", container)
    const { response, savedStacks, view, ...rest} = container
    setContainerComplete(true)
  
    alert("Container Saved locally")
    api.saveContainerToDB(rest)
    .then(() => {
      alert("Saved Container Remotely")
      api.cleanupStackIDs(usedCodes)
      .then((deleteReport) => {
        console.log("Stack IDs released -> ", deleteReport)
      })
      
    })
    .catch((error) => console.error(error))
    
    toggleNotice(!noticeStatus)
    document.getElementById('loading-modal').style.display = 'none'
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

      return (    
        <div id="App">
          <SplashScreen 
           savedStacks={savedStacks}
           setters={{setSavedStacks, setDate, setProducts}}
           >
          <div id="main" className="fade-in"> 

             <Menu 
             peekState={{peekStatus, setPeekStatus}}
             menuState={{menuStatus, setMenuStatus}}
             />

          <LoadingModal />

          {peekStatus && <PeekModal savedStacks={savedStacks} togglePeek={togglePeek}/>}
          
          {!!response && <ResponseModal response={response} close={closeModal} />}
          <ProductListTab setView={setView} toggleMenu={toggleMenu} />

          <DisplayView 
          view={view} 
          addToContainer={addToContainer}
          addStack={addStack}
          savedStacks={savedStacks}
          usedCodes={usedCodes}
          saveUsedCode={saveUsedCode}
          containerContent={containerContent}
          containerNumber={containerNumber}
          sealNumber={sealNumber}
          updateContainerAndSeal={updateContainerAndSeal}
          addContainerToDB={addContainerToDB}
          removeFromContainer={removeFromContainer}
          />

          <StatusBar content={containerContent} date={date} synced={dataSynced}/>
          <Snackbar 
            open={noticeStatus}
            autoHideDuration={10000}
            message="Container Completed - Email Sent"
            onClose={() => toggleNotice(!noticeStatus)}
          />
          </div>
         
        </SplashScreen>
        </div>
      );
}

App.propTypes = {
  savedStacks: PropTypes.object,
  savedContainer: PropTypes.object,
  date: PropTypes.string
}

export default App;