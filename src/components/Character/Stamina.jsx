import Regen from "components/Character/Regen";
import ResourceMeter from "components/Character/ResourceMeter";
import ImageIcon from "components/ImageIcon";
import icon from "icons/lungs.svg";
import { currentStamina, isStaminaMaxedOut, maxStamina } from "state/resources";
import { totalStaminaRegenAmount, totalStaminaRegenRate } from "state/stats";

export default function Stamina() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Stamina" />

      <div style={{ width: "100%" }}>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentStamina}
          resourceMax={maxStamina}
        />

        <Regen
          isResourceMaxedOut={isStaminaMaxedOut}
          regenAmount={totalStaminaRegenAmount}
          regenRate={totalStaminaRegenRate}
          resourceCurrent={currentStamina}
          resourceMax={maxStamina}
        />
      </div>
    </div>
  );
}
