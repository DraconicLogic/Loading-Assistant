import React, { useState, useEffect } from "react";
import * as api from "../../api.js";
import App from "../../App.js";
import * as utils from "../../utils.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import  logo from "../../assets/kinrich-logo-200.png"
import  footer from "../../assets/kinrich-footer-250.png"

const SplashScreen = (props) => {
  const { view, storedStacks} = props
  console.log("CHILDREN: ", props.children)
  const [started, setStarted] = useState(false)
  
  function handleStart(event) {
    setStarted(true)
  }

  const display = (
<div id="splash" className={started ? "fade-out" : null}>
            <div id="splash-center">
              <img id="splash-center__kinrich-logo" src={logo} alt="Kinrich Logo" />
              <h1 id="App-title">Loading Assistant</h1>
            </div>
            <div id="splash-bottom">
              <div id="splash-bottom__buttons">
                <button onClick={handleStart} value="new">
                Start New Container
              </button>
              {/* <button
                disabled={savedContainer ? false : true}
                onClick={startApp}
                value="continue"
              >
                Continue Container
              </button> */}

              </div>
              <div id='splash-bottom__information'>
                  <p
                  //  hidden={savedContainer ? false : true}
                  >
                There seems to be Container loading in progress.
              </p>
              <div 
              // hidden={!loading}
              >
                <br />
                {/* <CircularProgress /> */}

                <p>
                  {storedStacks ? Object.keys(storedStacks).length : null} Stacks
                  Retrieved
                </p>
              </div>
            
            </div>
            <span id="splash-bottom__version">Ver 2.0.0</span>
            <img id="splash-bottom__kinrich-footer" src={footer} alt="Kinrich Logo Footer" />
            </div>

            
          </div>
  )

  return (
    started ? props.children : display
  )
  
  {
  // const [storedStacks, setStoredStacks] = useState(null);
  // const [view, setView] = useState(0);
  // const [date, setDate] = useState("");
  // const [savedContainer, setSavedContainer] = useState(null);
  // const [loading, setLoading] = useState(false);

  

  // useEffect(() => {
  //   if (!localStorage.getItem(utils.getDate())) {
  //     const date = utils.getDate();
  //     setDate(date);
  //   } else {
  //     const currentContainer = JSON.parse(
  //       localStorage.getItem(utils.getDate())
  //     );
  //     setSavedContainer(currentContainer);
  //   }
  // }, []);

  // useEffect(loadStackData, [])

  // function loadStackData () {
  //   // check local storage
  //   const localData = localStorage.getItem("stacks")
  //   // if there is local storage data put stacks into state and have app ready to run
  //   if(localData) {
  //     setStoredStacks(utils.convertStacksToStateFormat(localData))
  //   } else {
  //     api.getStacks()
  //     .then((stacks) => {
  //       setStoredStacks(utils.convertStacksToStateFormat(stacks))
  //     })
  //     .catch((error) => console.error(error))
  //   }
  //   return;
  //   // else retrieve stacks from remote db
  // }
  


  

  // useEffect(() => {
  //   if (storedStacks) {
  //     setView(1);
  //   }
  // }, [storedStacks]);

  // const displayView = (viewIndex) => {
  //   let view;
  //   switch (viewIndex) {
  //     case 0:
  //       view = (
          
  //       );
  //       break;
  //     case 1:
  //       view = (
  //         <div className={viewIndex === 1 ? "fade-in" : null}>
  //           <App
  //             storedStacks={storedStacks}
  //             savedContainer={savedContainer}
  //             date={date}
  //           />
  //         </div>
  //       );
  //       break;
  //     default:
  //       view = <h1>500 - Something's gone horribly wrong</h1>;
  //   }
  //   return view;
  // };

  // const checkMemoryStacks = () => {
  //   if (localStorage.getItem("stacks")) {
      
  //     return true
  //   } else {
  //     return false
  //   } 
  // }

  // const startApp = async (event) => {
  // // 
  //   setView(1 )
  //   // setLoading(true);
  //   // const { value } = event.target;

  //   // if (value === "new") setSavedContainer(null);



  //   // let newStoredStacks = {};
  //   // let stacks;
    
  //   // if (checkMemoryStacks) {
      
  //   //   stacks = JSON.parse(
  //   //     localStorage.getItem("stacks")
  //   //   )
  //   //   console.log("Local Storage Stacks", stacks)
  //   // } else {
  //   //   stacks = await api.getStacks();
  //   // }



    
  //   // if (stacks.length > 0) {
  //   //   newStoredStacks = stacks.reduce((stackObject, stack) => {
  //   //     const {content, date, stackId} = stack
  //   //     stackObject[stack.stackId] = {content, date, stackId};
  //   //     return stackObject;
  //   //   }, {});
  //   // }
  //   // console.log("Transform Stacks: ", newStoredStacks)
  //   // setStoredStacks(newStoredStacks);
  // };

  // return displayView(view);
}
};

export default SplashScreen;
