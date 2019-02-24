import React from 'react';
/*
   TODO: * Plan layout for page
         * Add estimated weight of container
*/
const ContainerOverview = ({container}) => {
  const flatContainer = container.flat(1)
  console.log(flatContainer)
  const baleCount = flatContainer.reduce((tallyObj, bale) => {
    if (!tallyObj[bale.code]) {
      tallyObj[bale.code] = 1
    } else if (!!tallyObj[bale.code]) {
      tallyObj[bale.code] += 1
    }
    return tallyObj
  },{})
  const baleCountArray = Object.entries(baleCount)
  console.log(baleCount)
  
  return (
    <div>
      <h1>Container Overview</h1>
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
    </div>
  );
};

export default ContainerOverview;