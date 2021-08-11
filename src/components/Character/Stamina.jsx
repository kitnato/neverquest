import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import Regen from "components/Character/Regen";
import WithIcon from "components/WithIcon";
import staminaIcon from "icons/lungs.svg";
import { stamina, staminaRegenAmount, staminaRegenRate } from "state/stats";

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

        <Regen
          regenAmount={staminaRegenAmount}
          regenRate={staminaRegenRate}
          resource={stamina}
        />
      </div>
    </WithIcon>
  );
}
