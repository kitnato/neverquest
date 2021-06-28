import React from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { health } from "state/atoms";
import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  const healthValue = useRecoilValue(health);

  return (
    <WithIcon icon={healthIcon} alt="Health" className="mr-2">
      <Progress
        variant="danger"
        value={(healthValue.current / healthValue.max) * 100}
        label={`${healthValue.current}/${healthValue.max}`}
      />
    </WithIcon>
  );
}
