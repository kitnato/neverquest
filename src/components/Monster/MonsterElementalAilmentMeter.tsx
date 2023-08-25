import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/combat";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { MonsterAilment } from "@neverquest/types/unions";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterElementalAilmentMeter({ type }: { type: MonsterAilment }) {
  const [monsterAilmentValue, setMonsterAilment] = useRecoilState(monsterAilmentDuration(type));
  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(type));

  useAnimate({
    deltas: [setMonsterAilment],
    stop: !isMonsterAilingValue,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={isMonsterAilingValue ? formatMilliseconds(monsterAilmentValue) : LABEL_EMPTY}
      value={
        isMonsterAilingValue ? (monsterAilmentValue / ELEMENTAL_AILMENT_DURATION_MAXIMUM) * 100 : 0
      }
      variant="secondary"
    />
  );
}
