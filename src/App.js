import React, { useState, useEffect } from 'react';
import './App.css';

import SplashScreen from './views/SplashScreen/SplashScreen.jsx'
import * as data from "./services/data.js"
import * as utils from "./utils/utils.js"
import ResponseModal from './components/Modal/ResponseModal.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';

import { Snackbar } from '@material-ui/core';


import PropTypes from 'prop-types'

import DisplayView from './components/DisplayView/DisplayView.jsx';

function App () {
  const [date, setDate] = useState("")
  const [savedStacks, setSavedStacks] = useState({})
  const [containerNumber, setContainerNumber] = useState("")
  const [sealNumber, setSealNumber] = useState("")
  const [containerContent, setContainerContent] = useState([])
  const [containerComplete, setContainerComplete] = useState(false)
  const [response, setResponse] = useState(null)
  
  
  const [noticeStatus, setNoticeStatus] = useState(false)
  const [dataSynced, setDataSynced] = useState(null)
  const [initialStartup, setInitialStartup] = useState(false)


  useEffect(() => {
		(async function () {
			console.log("Running Startup...");
      const {date, stacks} =  await data.startUp()
			setSavedStacks(stacks);
			setDate(date);
      setInitialStartup(true)
		})();
	}, []); 

  useEffect(() => {
    data.saveState({
      date,
      containerContent,
    })
  })

  function toggleNotice (newNoticeStatus) {
    setNoticeStatus(newNoticeStatus)
  }

  function handleAddToContainer (stack) {
    //TODO: change name to handlehandleAddToContainer
    if (!containerComplete) {
      const newContent = [...containerContent]
      newContent.push(stack)
      setContainerContent(newContent)
    } else {
      alert("The Container is compete. No more stacks can be added")
    }
  }

  

  function handleRemoveFromContainer (deleteId) {
    if (!containerComplete) {
      const newContent = [...containerContent]
      console.log("Container Content Copy: ", newContent)
      const index = newContent.findIndex((stack) => {
        return stack.stackId === deleteId
      })
      newContent.splice(index, 1)
      setContainerContent(newContent)
      
    } else {
      alert("The Container is compete. No more stacks can be removed")
    }
  }

  function handleSaveStack (stack) {
    const {stackId, content, date} = stack
    const newSavedStacks = {...savedStacks}
    newSavedStacks[stackId] = {stackId, content, date}
    setResponse(stack)
    setSavedStacks(newSavedStacks)
    data.saveStackData(stack)

  }

  async function handleCleanup(finishedContainer){
    console.log("handling cleanup")
    console.log(finishedContainer)
    const newSavedStacks = {...savedStacks}      
    const usedIds = utils.listIDs(finishedContainer.containerContent)
    console.log("usedIds: ", usedIds)
    usedIds.forEach((stackId) => {
      delete newSavedStacks[stackId]
    })
    setSavedStacks(newSavedStacks)
    const deletedStacks = await data.cleanupStackIDs(usedIds)
    console.log("Stacks Deleted: ", deletedStacks)
  }
  
  function handleSaveContainer  (container) {
    console.log("Saving Container:", container)
    container.date = date
    setContainerComplete(true)
    data.saveContainerData(container)
    .then((savedContainer) => {
      console.log("SavedContainer", savedContainer)
      handleCleanup(savedContainer)
      toggleNotice(!noticeStatus)
    })
    // Complete container. If no effect delete this. 
    // document.getElementById('loading-modal').style.display = 'none'
  }

  function closeModal () {
    setResponse(null)
  }

  function updateContainerAndSeal ({containerNumber, sealNumber}) {
    setContainerNumber(containerNumber)
    setSealNumber(sealNumber)
  }

      return (    
        <div id="App">
          <SplashScreen 
           savedStacks={savedStacks}
           initialStartup={initialStartup}
           stacksSetter={setSavedStacks}
           dataSyncedSetter={setDataSynced}
           >
            <div id="main" className="fade-in"> 

            
          

           
          {!!response && <ResponseModal response={response} close={closeModal} />}
          
          
          <DisplayView 
          
          handleAddToContainer={handleAddToContainer}
          handleSaveStack={handleSaveStack}
          savedStacks={savedStacks}
          containerContent={containerContent}
          containerNumber={containerNumber}
          sealNumber={sealNumber}
          updateContainerAndSeal={updateContainerAndSeal}
          handleSaveContainer={handleSaveContainer}
          handleRemoveFromContainer={handleRemoveFromContainer}
          />
          
          <StatusBar content={containerContent} date={date} synced={dataSynced}/>
          {/* TODO: remove snackbar. use  */}
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