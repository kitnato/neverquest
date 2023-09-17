import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function MonsterElementalAilment({ type }: { type: Elemental }) {
  const { ailment, Icon } = ELEMENTALS[type];

  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const { armor, weapon } = useRecoilValue(totalElementalEffects);
  const setMonsterAilment = useSetRecoilState(monsterAilmentDuration(ailment));

  useAnimate({
    delta: setMonsterAilment,
    stop: !isMonsterAilingValue || isMonsterDeadValue,
  });

  if (armor[type].duration === 0 && weapon[type].duration === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <MonsterAilmentMeter totalDuration={ELEMENTAL_AILMENT_DURATION_MAXIMUM} type={ailment} />
      }
      Icon={Icon}
      isAnimated
      tooltip={capitalizeAll(ailment)}
    />
  );
}
