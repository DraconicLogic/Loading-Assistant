import React from 'react';

const StackSize = ({size}) => {
   
  return (
    <div>
      <button onClick={() => size(12)}>12</button>
      <button onClick={() => size(9)}>9</button>
      <button onClick={() => size(6)}>6</button>
      <button onClick={() => size(3)}>3</button>
      <button onClick={() => size(1)}>1</button>
    </div>
     
    
  );
  
};

export default StackSize;