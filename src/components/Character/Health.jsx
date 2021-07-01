import React from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import Regen from "components/Character/Regen";
import WithIcon from "components/WithIcon";
import { health, healthRegen } from "state/atoms";

import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  const healthValue = useRecoilValue(health);

  return (
    <WithIcon icon={healthIcon} alt="Health">
      <div style={{ width: "100%" }}>
        <Progress
          attached="below"
          label={`${healthValue.current}/${healthValue.max}`}
          value={(healthValue.current / healthValue.max) * 100}
          variant="danger"
        />

        <Regen resource={health} regen={healthRegen} />
      </div>
    </WithIcon>
  );
}
