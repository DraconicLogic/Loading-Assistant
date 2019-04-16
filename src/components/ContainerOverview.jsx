import React from 'react';
import ContainerSealForm from './ContainerSealForm';
/*
   TODO: * Plan layout for page
         * Add estimated weight of container
*/
const ContainerOverview = ({containerDetails, overview, finish, update}) => {
  const { container } = containerDetails
 
  const flatContainer = container.flat(1)
  const baleCount = flatContainer.reduce((tallyObj, bale) => {
    if (!tallyObj[bale.code]) {
      tallyObj[bale.code] = 1
    } else if (!!tallyObj[bale.code]) {
      tallyObj[bale.code] += 1
    }
    return tallyObj
  },{})
  const baleCountArray = Object.entries(baleCount)
  console.log(container, 'RAW DATA')
  console.log(flatContainer, 'DATA FLATTENED')
  console.log(baleCount, 'BALE COUNT OBJECT')
  console.log(baleCountArray)
  
  return (
    <div>
      <h1>Container Overview</h1>
      <button onClick={overview}>Back To Editor</button>
      <ContainerSealForm update={update} containerDetails={containerDetails}/>
      <table>
        {baleCountArray.map((bale) => {
          return (
            <tr>
              <td>{bale[0]}</td>
              <td>{bale[1]}</td>
            </tr>
          )
        })}
      </table>
      <button onClick={finish}>CONTAINER FINISHED</button>
    </div>
  );
};

export default ContainerOverview;