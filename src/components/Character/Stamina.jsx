import Regen from "components/Character/Regen";
import ResourceMeter from "components/Character/ResourceMeter";
import ImageIcon from "components/ImageIcon";
import icon from "icons/lungs.svg";
import {
  totalStaminaRegenAmount,
  totalStaminaRegenRate,
} from "state/character";
import { currentStamina, maxStamina } from "state/resources";

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
          regenAmount={totalStaminaRegenAmount}
          regenRate={totalStaminaRegenRate}
          resourceCurrent={currentStamina}
          resourceMax={maxStamina}
        />
      </div>
    </div>
  );
}
