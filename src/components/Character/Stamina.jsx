import Regen from "components/Character/Regen";
import ResourceMeter from "components/Character/ResourceMeter";
import ImageIcon from "components/ImageIcon";
import icon from "icons/lungs.svg";
import { stamina, staminaRegenAmount, staminaRegenRate } from "state/stats";

export default function Stamina() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Stamina" />

      <div style={{ width: "100%" }}>
        <ResourceMeter attached="below" resource={stamina} />

        <Regen
          regenAmount={staminaRegenAmount}
          regenRate={staminaRegenRate}
          resource={stamina}
        />
      </div>
    </div>
  );
}
