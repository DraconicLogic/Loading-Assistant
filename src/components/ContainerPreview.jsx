import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container, visable, currentStack}) => {
  const context = "preview"
  
  return (
    <div id={visable ? "container-preview" : "container-preview--hidden"}>
      {container.map((stack, index) => {
        return (
            <span key={index}>
              <StackEditor stack={stack} context={context}  />
            </span>
        )
      })}
      <span>
        <StackEditor stack={currentStack} context={context}/>
      </span>
    </div>
  );
};

export default ContainerPreview ;