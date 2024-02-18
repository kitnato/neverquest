import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Ammunition } from "@neverquest/components/Inventory/Offhand/Ammunition";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import IconShieldNone from "@neverquest/icons/shield-none.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react";
import { shield, weapon } from "@neverquest/state/gear";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isShowing } from "@neverquest/state/ui";
import { isRanged, isUnshielded } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function OffhandEquipped() {
  const isShowingOffhand = useRecoilValue(isShowing("offhand"));
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);

  const isShieldUnequipped = isUnshielded(shieldValue);

  if (isShowingOffhand) {
    if (isRanged(weaponValue)) {
      return <Ammunition />;
    }

    if (!isTraitAcquiredColossus && weaponValue.grip === "two-handed") {
      return (
        <span className="opacity-50">
          <IconDisplay className={getAnimationClass({ animation: "flipInX" })} Icon={IconTwoHanded}>
            {weaponValue.name}
          </IconDisplay>
        </span>
      );
    }

    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={isShieldUnequipped ? IconShieldNone : IconShield}
        tooltip="Equipped shield"
      >
        <ShieldName overlayPlacement="top" shield={shieldValue} />
      </IconDisplay>
    );
  }
}
