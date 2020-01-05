import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";

const PeekModal = ({ storedStacks, togglePeek }) => {
  const handleClose = event => {
    togglePeek();
  };

  return (
    <div id="peek-modal">
      <div id="peek-modal__content">
        <CancelIcon onClick={handleClose} />
        {Object.entries(storedStacks).map(savedStack => {
          return <p>{savedStack[0]}</p>;
        })}
      </div>
    </div>
  );
};

export default PeekModal;
