import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Ammunition } from "@neverquest/components/Items/Offhand/Ammunition";
import { ShieldName } from "@neverquest/components/Items/Offhand/ShieldName";
import { SHIELD_NONE } from "@neverquest/data/inventory";
import { ReactComponent as IconFist } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconMelee } from "@neverquest/icons/melee.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isRanged } from "@neverquest/types/type-guards";

export function OffhandEquipped() {
  const isShowingOffhand = useRecoilValue(isShowing("offhand"));
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);

  if (!isShowingOffhand) {
    return null;
  }

  if (isRanged(weaponValue)) {
    return <Ammunition />;
  }

  if (weaponValue.grip === "two-handed") {
    return (
      <span style={{ opacity: 0.5 }}>
        <IconDisplay contents={weaponValue.name} Icon={IconMelee} isAnimated />
      </span>
    );
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={shieldValue === SHIELD_NONE ? IconFist : IconShield}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
