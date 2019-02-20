import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container}) => {
  
  return (
    <div id="container-preview">
    Container Preview
      {container.map((stack) => {
        return <StackEditor stack={stack} context="preview"/>
      })}
    </div>
  );
};

export default ContainerPreview ;