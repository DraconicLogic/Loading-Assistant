import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";

const PeekModal = ({ storedStacks, togglePeek }) => {
  const handleClose = (event) => {
    togglePeek();
  };
  console.log(storedStacks);
  return (
    <div id="peek-modal">
      <div id="peek-modal__content">
        <span style={{ float: "right" }}>
          <CancelIcon onClick={handleClose} />
        </span>
        {Object.entries(storedStacks).map((savedStack, index) => {
          console.log(savedStack);
          return (
            <p key={index}>
              <span style={{ "font-weight": "bold" }}>{savedStack[0]}</span> :{" "}
              {savedStack[1].map((product) => {
                return (
                  <span>
                    {product}
                    {", "}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    </div>
  );
};

PeekModal.propTypes = {
  storedStack: PropTypes.object,
  togglePeek: PropTypes.func,
};

export default PeekModal;
