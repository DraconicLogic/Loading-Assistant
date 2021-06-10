import React, { useState, useEffect } from "react";
import * as api from "../../api.js";
import App from "../../App.js";
import * as utils from "../../utils.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import  logo from "../../assets/kinrich-logo-200.png"
import  footer from "../../assets/kinrich-footer-250.png"

const SplashScreen = () => {
  const [storedStacks, setStoredStacks] = useState(null);
  const [view, setView] = useState(0);
  const [date, setDate] = useState("");
  const [savedContainer, setSavedContainer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(utils.getDate())) {
      const date = utils.getDate();
      setDate(date);
    } else {
      const currentContainer = JSON.parse(
        localStorage.getItem(utils.getDate())
      );
      setSavedContainer(currentContainer);
    }
  }, []);

  useEffect(() => {
    if (storedStacks) {
      setView(1);
    }
  }, [storedStacks]);

  const displayView = (viewIndex) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = (
          <div id="splash" className={storedStacks ? "fade-out" : null}>
            <div id="splash-center">
              <img id="splash-center__kinrich-logo" src={logo} alt="Kinrich Logo" />
              <h1 id="App-title">Loading Assistant</h1>
            </div>
            <div id="splash-bottom">
              <div id="splash-bottom__buttons">
                <button onClick={startApp} value="new">
                Start New Container
              </button>
              <button
                disabled={savedContainer ? false : true}
                onClick={startApp}
                value="continue"
              >
                Continue Container
              </button>

              </div>
              <div id='splash-bottom__information'>
                  <p hidden={savedContainer ? false : true}>
                There seems to be Container loading in progress.
              </p>
              <div hidden={!loading}>
                <br />
                <CircularProgress />

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
        );
        break;
      case 1:
        view = (
          <div className={viewIndex === 1 ? "fade-in" : null}>
            <App
              storedStacks={storedStacks}
              savedContainer={savedContainer}
              date={date}
            />
          </div>
        );
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>;
    }
    return view;
  };

  const startApp = async (event) => {
    setLoading(true);
    const { value } = event.target;

    if (value === "new") setSavedContainer(null);

    let newStoredStacks = {};

    const stacks = await api.getStacks();

    console.log("getStacks() ",stacks)
    if (stacks.length > 0) {
      newStoredStacks = stacks.reduce((stackObject, stack) => {
        const {content, date, stackId} = stack
        stackObject[stack.stackId] = {content, date, stackId};
        return stackObject;
      }, {});
    }
    console.log("Transform Stacks: ", newStoredStacks)
    setStoredStacks(newStoredStacks);
  };

  return displayView(view);
};

export default SplashScreen;
