import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container, visable, currentStack, select, working}) => {
  const context = "preview"
  
  return (
    <div id={visable ? "container-preview" : "container-preview--hidden"}>
      {container.map((stack, index) => {
        return (
            <span className={working === index ? "container-preview__stack--selected" : "container-preview__stack"} key={index} onclick={() => select(index)}>
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