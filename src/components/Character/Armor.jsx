import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { totalArmor } from "state/selectors";

import armorIcon from "icons/barbute.svg";

export default function Armor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <WithIcon icon={armorIcon} alt="Armor">
      {totalArmorValue}
    </WithIcon>
  );
}
