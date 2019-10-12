import React, { useState } from "react";

const ContainerSealForm = ({ update, containerDetails }) => {
  const { containerNumber, sealNumber } = containerDetails;
  const [container, setContainerNumber] = useState("");
  const [seal, setSealNumber] = useState("");

  const handleForm = event => {
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
        sealNumber: checkContainerSealNum() ? "" : seal
      };
      update(details);
    } else {
      alert("Please fill in BOTH Container Number and Seal Number");
    }
  };

  const renderInput = name => {
    if (checkContainerSealNum()) {
      return <p>{name === "container" ? containerNumber : sealNumber}</p>;
    } else {
      return <input type="text" name={name} onChange={handleForm}></input>;
    }
  };
  // Fix styling when input field is changed to p tag
  return (
    <div id="container-seal-section">
      <label htmlFor="container">Container Number</label>
      {renderInput("container")}

      <label htmlFor="seal">Seal Number</label>
      {renderInput("seal")}

      <button onClick={handleSubmit}>
        {checkContainerSealNum() ? "Edit" : "Save"}
      </button>
    </div>
  );
};

export default ContainerSealForm;
