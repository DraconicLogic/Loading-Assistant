import React from "react";

const StackIDHistory = ({ usedCodes }) => {
  const reversedUsedCodes = [...usedCodes].reverse();
  return (
    <ul id="stackid-history">
      {reversedUsedCodes.map((stackId, index) => {
        return (
          <li id={`stackid-history__${index}`} key={index}>
            {stackId}
          </li>
        );
      })}
    </ul>
  );
};

export default StackIDHistory;
