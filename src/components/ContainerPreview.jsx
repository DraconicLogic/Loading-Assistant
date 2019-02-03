import React from 'react';
import StackEditor from './StackEditor';

const ContainerPreview = ({container}) => {
  
  return (
    <div id="container-preview">
    Container Preview
      {container.map((stack) => {
        return <StackEditor stack={stack} style="height: 10px width: 40px"/>
      })}
    </div>
  );
};

export default ContainerPreview;