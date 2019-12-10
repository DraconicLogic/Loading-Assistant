import React, { useState, useEffect } from "react";
import * as api from "../api.js";

const SplashScreen = props => {
  const [storedStacks, setStoredStacks] = useState(null);
  const [view, setView] = useState(0);

  useEffect(() => {
    async function getStacksOnStartup() {
      let newStoredStacks = {};
      const stacks = await api.getStacks();
      if (stacks.length > 0) {
        newStoredStacks = stacks.reduce((stackObject, stack) => {
          stackObject[stack.recallid] = stack.content;
          return stackObject;
        }, {});
      }

      return newStoredStacks;
    }

    setStoredStacks(getStacksOnStartup());
  }, []);

  console.log(props);

  const displayView = (viewIndex, mainApp) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = (
          <div id="splash">
            <h2>Nnenna Textiles</h2>
            <h1>Loading Assistant</h1>

            <button onClick={startApp}>Start New Container</button>
            <button>Continue Container</button>
          </div>
        );
        break;
      case 1:
        view = mainApp;
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>;
    }
    return view;
  };

  const startApp = () => {
    setView(1);
  };

  return displayView(view, props.children);
};

export default SplashScreen;
