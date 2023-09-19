import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { hasEnoughAmmunition, isAttacking } from "@neverquest/state/character";
import { ownedItem } from "@neverquest/state/items";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Ammunition() {
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const isAttackingValue = useRecoilValue(isAttacking);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  return (
    <IconDisplay
      className={
        isAttackingValue && !hasEnoughAmmunitionValue
          ? `${getAnimationClass({ isInfinite: true, type: "pulse" })}`
          : undefined
      }
      contents={
        ownedAmmunitionPouch === null
          ? 0
          : (ownedAmmunitionPouch as TrinketItemAmmunitionPouch).current
      }
      Icon={IconAmmunition}
      isAnimated
      tooltip="Ammunition"
    />
  );
}
