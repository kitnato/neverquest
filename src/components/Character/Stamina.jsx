import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import Regen from "components/Character/Regen";
import ImageIcon from "components/ImageIcon";
import icon from "icons/lungs.svg";
import { stamina, staminaRegenAmount, staminaRegenRate } from "state/stats";

export default function Stamina() {
  const staminaValue = useRecoilValue(stamina);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Stamina" />

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
    </div>
  );
}
