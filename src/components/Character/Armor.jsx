import React from "react";
import { useRecoilValue } from "recoil";

import armorIcon from "icons/barbute.svg";
import WithIcon from "components/WithIcon";
import { totalArmor } from "state/selectors";

export default function Armor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <WithIcon alt="Armor" icon={armorIcon}>
      {totalArmorValue}
    </WithIcon>
  );
}
