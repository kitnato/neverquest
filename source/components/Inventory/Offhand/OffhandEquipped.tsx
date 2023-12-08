import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Ammunition } from "@neverquest/components/Inventory/Offhand/Ammunition";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import IconFist from "@neverquest/icons/fist.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import { shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isRanged, isUnshielded } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function OffhandEquipped() {
  const isShowingOffhand = useRecoilValue(isShowing("offhand"));
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);

  if (isShowingOffhand) {
    if (isRanged(weaponValue)) {
      return <Ammunition />;
    }

    if (!isTraitAcquiredColossus && weaponValue.grip === "two-handed") {
      return (
        <span className="opacity-50">
          <IconDisplay className={getAnimationClass({ animation: "flipInX" })} Icon={IconMelee}>
            {weaponValue.name}
          </IconDisplay>
        </span>
      );
    }

    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={isUnshielded(shieldValue) ? IconFist : IconShield}
        tooltip="Equipped shield"
      >
        <ShieldName shield={shieldValue} />
      </IconDisplay>
    );
  }
}
