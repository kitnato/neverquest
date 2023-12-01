import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Ammunition } from "@neverquest/components/Inventory/Offhand/Ammunition";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import { SHIELD_NONE } from "@neverquest/data/gear";
import IconFist from "@neverquest/icons/fist.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import { shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isRanged } from "@neverquest/types/type-guards";

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
          <IconDisplay Icon={IconMelee} isAnimated>
            {weaponValue.name}
          </IconDisplay>
        </span>
      );
    }

    return (
      <IconDisplay
        Icon={shieldValue.name === SHIELD_NONE.name ? IconFist : IconShield}
        isAnimated
        tooltip="Equipped shield"
      >
        <ShieldName shield={shieldValue} />
      </IconDisplay>
    );
  }
}
