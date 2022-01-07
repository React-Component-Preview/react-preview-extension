import React from "react";

import PropEntity from "./PropEntity";

interface Props {
  propList: string[];
}

function PropsList({ propList }: Props) {
  return (
    <div>
      {propList.map((prop) => (
        <PropEntity />
      ))}
    </div>
  );
}

export default PropsList;
