import React from 'react';
import ProductList from '../ProductList/ProductList/ProductList.jsx'
import StoredBales from '../StoredBales/StoredBales/StoredBales.jsx';
import ContainerOverview from '../ContainerOverview/ContainerOverview/ContainerOverview.jsx';

const DisplayView = ({
  view, 
  addToContainer,
  addStack,
  savedStacks,
  usedCodes,
  saveUsedCode,
  containerContent,
  containerNumber,
  sealNumber,
  updateContainerAndSeal,
  addContainerToDB,
  removeFromContainer

}) => {
  
    let screen;
    switch (view) {
      case 0:
        screen = <ProductList 
        addToContainer={addToContainer} 
        addStack={addStack}
        savedStacks={savedStacks}
        />
        break;
        case 1:
          screen = <StoredBales 
          stacks={savedStacks} 
          add={addToContainer}
          saveUsedCode={saveUsedCode}
          usedCodes={usedCodes}
          />
          break;
      case 2:
        screen = <ContainerOverview 
        containerDetails={{containerContent, containerNumber, sealNumber}} 
        update={updateContainerAndSeal}
        finish={addContainerToDB}
        remove={removeFromContainer}
        />
        break;
      default:
        screen = <h1>500 - Something's gone horribly wrong</h1>
    }
    return screen

  
};

export default DisplayView;