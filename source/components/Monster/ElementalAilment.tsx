import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AilmentMeter } from "@neverquest/components/Monster/AilmentMeter";
import { ELEMENTALS } from "@neverquest/data/items";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import { elementalEffects } from "@neverquest/state/gear";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ElementalAilment({ elemental }: { elemental: Elemental }) {
  const { ailment, durationCap, Icon } = ELEMENTALS[elemental];

  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const { armor, weapon } = useRecoilValue(elementalEffects);
  const setAilment = useSetRecoilState(monsterAilmentDuration(ailment));

  useTimerDelta({
    delta: setAilment,
    stop: !isMonsterAilingValue || isMonsterDeadValue,
  });

  if (armor[elemental].duration > 0 || weapon[elemental].duration > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={Icon}
        tooltip={capitalizeAll(ailment)}
      >
        <AilmentMeter ailment={ailment} totalDuration={durationCap} />
      </IconDisplay>
    );
  }
}
