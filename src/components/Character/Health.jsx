import Regen from "components/Character/Regen";
import ResourceMeter from "components/Character/ResourceMeter";
import ImageIcon from "components/ImageIcon";
import icon from "icons/hospital-cross.svg";
import { currentHealth, isHealthMaxedOut, maxHealth } from "state/resources";
import { totalHealthRegenAmount, totalHealthRegenRate } from "state/stats";

export default function Health() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Health" />

      <div style={{ width: "100%" }}>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentHealth}
          resourceMax={maxHealth}
        />

        <Regen
          isResourceMaxedOut={isHealthMaxedOut}
          regenAmount={totalHealthRegenAmount}
          regenRate={totalHealthRegenRate}
          resourceCurrent={currentHealth}
          resourceMax={maxHealth}
          type="health"
        />
      </div>
    </div>
  );
}
