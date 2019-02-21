import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container}) => {
  
  return (
    <div id="container-preview">
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