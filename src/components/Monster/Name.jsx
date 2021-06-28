import React from "react";

import WithIcon from "components/WithIcon";

import monsterIcon from "icons/carnivore-mouth.svg";

export default function MonsterName() {
  const name = "???";

  return (
    <WithIcon icon={monsterIcon} alt="Monster">
      {name}
    </WithIcon>
  );
}
