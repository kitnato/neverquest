import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { hasEnoughAmmunition, isAttacking } from "@neverquest/state/character";
import { ammunition } from "@neverquest/state/inventory";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Ammunition() {
  const ammunitionValue = useRecoilValue(ammunition);
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const isAttackingValue = useRecoilValue(isAttacking);

  return (
    <IconDisplay
      className={
        isAttackingValue && !hasEnoughAmmunitionValue
          ? `${getAnimationClass({ isInfinite: true, type: "pulse" })}`
          : undefined
      }
      contents={ammunitionValue}
      Icon={IconAmmunition}
      isAnimated
      tooltip="Ammunition"
    />
  );
}
