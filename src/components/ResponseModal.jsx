import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import StackEditor from "./StackEditor";

const ResponseModal = ({ response, close }) => {
  console.log(response);

  const handleClose = () => {
    const options = {
      title: "Close Stack ID Box",
      message:
        "Have you written the ID on the stack?\b It is difficult to retrieve the code if you do not",
      buttons: [
        {
          label: "Yes",
          onClick: () => close(),
        },
        {
          label: "No",
        },
      ],
      childrenElement: () => <div />,

      closeOnEscape: true,
      closeOnClickOutside: true,
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    };

    confirmAlert(options);
  };

  return (
    <div id="response-modal">
      <div id="response-modal__content">
        <span id="response-modal__close" onClick={handleClose}>
          <h1>X</h1>
        </span>
        <p>
          Here is the ID for the stack. Please make sure you write it clearly on
          the bale
        </p>
        <h1>{response.stackId ? response.stackId : null}</h1>
        <StackEditor stack={response.content} context="preview" />
      </div>
    </div>
  );
};

export default ResponseModal;
