import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { AILMENT_DURATION_MAXIMUM } from "@neverquest/data/monster";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { MonsterAilment } from "@neverquest/types/unions";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterElementalAilmentMeter({ type }: { type: MonsterAilment }) {
  const [monsterAilmentValue, setMonsterAilment] = useRecoilState(monsterAilmentDuration(type));
  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(type));

  useAnimation({
    callback: (delta) => {
      setMonsterAilment((current) => {
        const value = current - delta;

        if (value < 0) {
          return 0;
        }

        return value;
      });
    },
    stop: !isMonsterAilingValue,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={isMonsterAilingValue ? formatMilliseconds(monsterAilmentValue) : LABEL_EMPTY}
      value={isMonsterAilingValue ? (monsterAilmentValue / AILMENT_DURATION_MAXIMUM) * 100 : 0}
      variant="secondary"
    />
  );
}
