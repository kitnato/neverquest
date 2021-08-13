import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import Regen from "components/Character/Regen";
import WithIcon from "components/WithIcon";
import { health, healthRegenAmount, healthRegenRate } from "state/stats";

import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  const healthValue = useRecoilValue(health);

  return (
    <WithIcon alt="Health" icon={healthIcon}>
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
    </WithIcon>
  );
}
