import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter";
import { ReactComponent as IconLooting } from "@neverquest/icons/looting.svg";
import { isStageCompleted, progress } from "@neverquest/state/encounter";
import { isMonsterDead } from "@neverquest/state/monster";

export function Looting() {
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const progressValue = useRecoilValue(progress);

  if (!isMonsterDeadValue || isStageCompletedValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return (
    <IconDisplay contents={<LootingMeter />} Icon={IconLooting} isAnimated tooltip="Looting" />
  );
}
