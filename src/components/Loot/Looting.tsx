import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconLooting } from "@neverquest/icons/looting.svg";
import { isLooting, lootingDuration } from "@neverquest/state/character";
import { isStageCompleted, progress } from "@neverquest/state/encounter";
import { isMonsterDead } from "@neverquest/state/monster";

export function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const progressValue = useRecoilValue(progress);
  const setLootingDuration = useSetRecoilState(lootingDuration);

  const progression = useProgression();

  useAnimate({
    delta: setLootingDuration,
    onDelta: progression,
    stop: !isLootingValue,
  });

  if (!isMonsterDeadValue || isStageCompletedValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return (
    <IconDisplay contents={<LootingMeter />} Icon={IconLooting} isAnimated tooltip="Looting" />
  );
}
