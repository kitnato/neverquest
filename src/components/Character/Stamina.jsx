import React from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { stamina } from "state/atoms";
import staminaIcon from "icons/lungs.svg";

export default function Stamina() {
  const staminaValue = useRecoilValue(stamina);

  return (
    <WithIcon icon={staminaIcon} alt="Stamina" className="mr-2">
      <Progress
        variant="success"
        value={(staminaValue.current / staminaValue.max) * 100}
        label={`${staminaValue.current}/${staminaValue.max}`}
      />
    </WithIcon>
  );
}
