import React, { useState } from "react";
import PropTypes from "prop-types";

const ContainerSealForm = ({ update, finish, containerDetails }) => {
  const { containerNumber, sealNumber } = containerDetails;
  const [container, setContainerNumber] = useState("");
  const [seal, setSealNumber] = useState("");

  const handleForm = (event) => {
    const { value, name } = event.target;
    if (name === "container") setContainerNumber(value);
    if (name === "seal") setSealNumber(value);
  };

  const checkContainerSealNum = () => {
    let bool = false;
    if (containerNumber && sealNumber) bool = true;
    return bool;
  };

  const handleSubmit = () => {
    if (container && seal) {
      const details = {
        containerNumber: checkContainerSealNum() ? "" : container,
        sealNumber: checkContainerSealNum() ? "" : seal,
      };
      update(details);
    } else {
      alert("Please fill in BOTH Container Number and Seal Number");
    }
  };

  const handleFinish = (containerDetails) => {
    if (containerNumber && sealNumber) {
      finish(containerDetails);
    } else {
      alert(
        "Please fill in BOTH Container Number and Seal Number and save them before Finishing the container"
      );
    }
  };

  const renderInput = (name) => {
    if (checkContainerSealNum()) {
      return <span id={ name === "container" ? "container-seal-section__container-input" : "container-seal-section__seal-input"}>{name === "container" ? containerNumber : sealNumber}</span>;
    } else {
      return <input type="text" name={name} onChange={handleForm}></input>;
    }
  };
  // Fix styling when input field is changed to p tag
  return (
    <div id="container-seal-section">
      <label id="container-seal-section__container-label" htmlFor="container">Container Number: </label>{" "}
      {renderInput("container")}
      
      <label id="container-seal__seal-label" htmlFor="seal">Seal Number: </label> {renderInput("seal")}
     
      <button id="container-seal-section__save-button" onClick={handleSubmit}>
        {checkContainerSealNum() ? "Edit" : "Save"}
      </button>
      <button id="container-seal-section__finish-button" onClick={() => handleFinish(containerDetails)}>
        <h3>FINISH</h3>
      </button>
    </div>
  );
};

ContainerSealForm.propTypes = {
  containerDetails: PropTypes.shape({
    containerNumber: PropTypes.string.isRequired,
    sealNumber: PropTypes.string.isRequired,
  }),
  update: PropTypes.func,
  finish: PropTypes.func,
};

export default ContainerSealForm;
