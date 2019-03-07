import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container, visable}) => {
  
  return (
    <div id={visable ? "container-preview" : "container-preview--hidden"}>
      {container.map((stack) => {
        return (
          <span>
            <StackEditor stack={stack} context="preview"/>
          </span>
        )
      })}
    </div>
  );
};

export default ContainerPreview ;