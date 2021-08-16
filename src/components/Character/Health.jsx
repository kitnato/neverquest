import { useRecoilValue } from "recoil";

import Regen from "components/Character/Regen";
import ImageIcon from "components/ImageIcon";
import Progress from "components/Progress";
import { health, healthRegenAmount, healthRegenRate } from "state/stats";

import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  const healthValue = useRecoilValue(health);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={healthIcon} tooltip="Health" />

      <div style={{ width: "100%" }}>
        <Progress
          attached="below"
          label={`${healthValue.current}/${healthValue.max}`}
          value={(healthValue.current / healthValue.max) * 100}
          variant="secondary"
        />

        <Regen
          regenAmount={healthRegenAmount}
          regenRate={healthRegenRate}
          resource={health}
        />
      </div>
    </div>
  );
}
