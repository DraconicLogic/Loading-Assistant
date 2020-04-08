import React, { useState, useEffect } from "react";
import * as api from "../api.js";
import App from "../App.js";
import * as utils from "../utils.js";
import CircularProgress from "@material-ui/core/CircularProgress";

console.log("PROCESS.ENV: ", process.env);
console.log("GLOBAL VAR: ", process.env.REACT_APP_API_URL);
console.log("ENV: ", process.env.NODE_ENV);

const SplashScreen = (props) => {
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
      const timer = setTimeout(() => {
        setView(1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [storedStacks]);

  const displayView = (viewIndex) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = (
          <div id="splash">
            <h2>Nnenna Textiles</h2>
            <h1>Container Loading Assistant</h1>

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
            <p hidden={savedContainer ? false : true}>
              There seems to be Container loading in progress.
            </p>
            <div hidden={!loading}>
              <CircularProgress />

              <p>
                {storedStacks ? Object.keys(storedStacks).length : null} Stacks
                Retrieved
              </p>
            </div>
          </div>
        );
        break;
      case 1:
        view = (
          <App
            storedStacks={storedStacks}
            savedContainer={savedContainer}
            date={date}
          />
        );
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>;
    }
    return view;
  };

  const startApp = async (event) => {
    setLoading(true);
    console.log(event.target.value);
    const { value } = event.target;

    if (value === "new") setSavedContainer(null);

    let newStoredStacks = {};

    const stacks = await api.getStacks();
    console.log(stacks);
    if (stacks.length > 0) {
      newStoredStacks = stacks.reduce((stackObject, stack) => {
        stackObject[stack.stackId] = stack.content;
        return stackObject;
      }, {});
    }
    setStoredStacks(newStoredStacks);
  };

  return displayView(view);
};

export default SplashScreen;
