import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterElementalAilmentMeter } from "@neverquest/components/Monster/MonsterElementalAilmentMeter";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { weaponElementalEffects } from "@neverquest/state/inventory";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function MonsterElementalAilment({ type }: { type: Elemental }) {
  const weaponElementalEffectsValue = useRecoilValue(weaponElementalEffects);

  const { ailment, Icon } = ELEMENTALS[type];

  if (!weaponElementalEffectsValue[type].duration) {
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
