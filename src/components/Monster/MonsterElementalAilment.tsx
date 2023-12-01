import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { ELEMENTALS } from "@neverquest/data/items";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { totalElementalEffects } from "@neverquest/state/gear";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function MonsterElementalAilment({ elemental }: { elemental: Elemental }) {
  const { ailment, Icon } = ELEMENTALS[elemental];

  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const { armor, weapon } = useRecoilValue(totalElementalEffects);
  const setMonsterAilment = useSetRecoilState(monsterAilmentDuration(ailment));

  useAnimate({
    delta: setMonsterAilment,
    stop: !isMonsterAilingValue || isMonsterDeadValue,
  });

  if (armor[elemental].duration > 0 || weapon[elemental].duration > 0) {
    return (
      <IconDisplay Icon={Icon} isAnimated tooltip={capitalizeAll(ailment)}>
        <MonsterAilmentMeter
          ailment={ailment}
          totalDuration={ELEMENTAL_AILMENT_DURATION_MAXIMUM[ailment]}
        />
      </IconDisplay>
    );
  }
}
