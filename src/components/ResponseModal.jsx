import React from "react";

const ResponseModal = ({ response, close }) => {
  console.log(response);
  console.log(close);
  const handleClose = () => {
    close();
  };

  return (
    <div id="response-modal">
      <div id="reponse-modal__content">
        {response.content.map(item => {
          return <h4>{item}</h4>;
        })}
        <span onClick={handleClose}>
          <h1>X</h1>
        </span>
      </div>
    </div>
  );
};

export default ResponseModal;
