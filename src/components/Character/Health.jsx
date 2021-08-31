import Regen from "components/Character/Regen";
import ResourceMeter from "components/Character/ResourceMeter";
import ImageIcon from "components/ImageIcon";
import { health, healthRegenAmount, healthRegenRate } from "state/stats";

import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={healthIcon} tooltip="Health" />

      <div style={{ width: "100%" }}>
        <ResourceMeter attached="below" resource={health} />

        <Regen
          regenAmount={healthRegenAmount}
          regenRate={healthRegenRate}
          resource={health}
        />
      </div>
    </div>
  );
}
