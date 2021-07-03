import React from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import Regen from "components/Character/Regen";
import WithIcon from "components/WithIcon";
import { stamina, staminaRegen } from "state/atoms";

import staminaIcon from "icons/lungs.svg";

export default function Stamina() {
  const staminaValue = useRecoilValue(stamina);

  return (
    <WithIcon icon={staminaIcon} alt="Stamina">
      <div style={{ width: "100%" }}>
        <Progress
          attached="below"
          label={`${staminaValue.current}/${staminaValue.max}`}
          value={(staminaValue.current / staminaValue.max) * 100}
          variant="secondary"
        />

        <Regen resource={stamina} regen={staminaRegen} />
      </div>
    </WithIcon>
  );
}
