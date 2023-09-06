import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterElementalAilmentMeter } from "@neverquest/components/Monster/MonsterElementalAilmentMeter";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function MonsterElementalAilment({ type }: { type: Elemental }) {
  const { ailment, Icon } = ELEMENTALS[type];

  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const armorElementalEffects = useRecoilValue(totalElementalEffects("armor"));
  const weaponElementalEffects = useRecoilValue(totalElementalEffects("weapon"));
  const setMonsterAilment = useSetRecoilState(monsterAilmentDuration(ailment));

  useAnimate({
    delta: setMonsterAilment,
    stop: !isMonsterAilingValue,
  });

  if (armorElementalEffects[type].duration === 0 && weaponElementalEffects[type].duration === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterElementalAilmentMeter type={ailment} />}
      Icon={Icon}
      isAnimated
      tooltip={capitalizeAll(ailment)}
    />
  );
}
