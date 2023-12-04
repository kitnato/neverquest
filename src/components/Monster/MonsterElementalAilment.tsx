import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { ELEMENTALS } from "@neverquest/data/items";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { elementalEffects } from "@neverquest/state/gear";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterElementalAilment({ elemental }: { elemental: Elemental }) {
  const { ailment, durationMaximum, Icon } = ELEMENTALS[elemental];

  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const { armor, weapon } = useRecoilValue(elementalEffects);
  const setMonsterAilment = useSetRecoilState(monsterAilmentDuration(ailment));

  useAnimate({
    delta: setMonsterAilment,
    stop: !isMonsterAilingValue || isMonsterDeadValue,
  });

  if (armor[elemental].duration > 0 || weapon[elemental].duration > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={Icon}
        tooltip={capitalizeAll(ailment)}
      >
        <MonsterAilmentMeter ailment={ailment} totalDuration={durationMaximum} />
      </IconDisplay>
    );
  }
}
