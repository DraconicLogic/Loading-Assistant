import React from "react";
import ContainerSealForm from "./ContainerSealForm";
import products from "../products/products.json";
import ContainerPreview from "./ContainerPreview";
/*
   TODO: * Plan layout for page
         * Add estimated weight of container
*/
const ContainerOverview = ({ containerDetails, overview, finish, update }) => {
  const { container } = containerDetails;
  console.log("Container: ", container);
  const flatContainer = container.flat(1);

  const baleCount = flatContainer.reduce((tallyObj, bale) => {
    if (!tallyObj[bale]) {
      tallyObj[bale] = 1;
    } else if (!!tallyObj[bale]) {
      tallyObj[bale] += 1;
    }
    return tallyObj;
  }, {});

  const braCount = flatContainer.filter(bale => bale === "BRA");

  const containerWeight = flatContainer.reduce((netWeight, bale) => {
    return (netWeight += products[bale].size);
  }, 0);
  const baleCountArray = Object.entries(baleCount);

  const smallBales = flatContainer.filter(bale => {
    return products[bale].baleSize === "small";
  });

  const bigBales = flatContainer.filter(bale => {
    return products[bale].baleSize === "big";
  });

  return (
    <div>
      <div>
        <ContainerSealForm
          update={update}
          containerDetails={containerDetails}
        />
        <p>Estimated Weight: {containerWeight}</p>
        <p>BRA: {braCount.length}</p>
        <p>Small Bales: {smallBales.length}</p>
        <p>Big Bales: {bigBales.length}</p>
        <p>Total Bales: {flatContainer.length}</p>
        <button onClick={finish}>CONTAINER FINISHED</button>
      </div>
      <div className="App__view">
        <table>
          {baleCountArray.map((bale, index) => {
            return (
              <tbody>
                <tr key={index}>
                  <td>{bale[0]}</td>
                  <td>{bale[1]}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <ContainerPreview container={container} />
      </div>
    </div>
  );
};

export default ContainerOverview;
