import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { damagePerHit } from "state/selectors";

import damageIcon from "icons/fist.svg";

export default function Damage() {
  const dphValue = useRecoilValue(damagePerHit);

  return (
    <WithIcon icon={damageIcon} alt="Damage">
      {dphValue.min}-{dphValue.max}
    </WithIcon>
  );
}
