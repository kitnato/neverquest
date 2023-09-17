import { PurchaseAmmunition } from "@neverquest/components/Caravan/Fletcher/PurchaseAmmunition";
import { RangedWeaponOptions } from "@neverquest/components/Caravan/Fletcher/RangedWeaponOptions";
import { IconTabs } from "@neverquest/components/IconTabs";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ReactComponent as IconRanged } from "@neverquest/icons/ranged.svg";

export function Fletcher() {
  return (
    <IconTabs
      defaultTab="craft"
      tabs={[
        { Component: RangedWeaponOptions, Icon: IconRanged, label: "craft" },
        { Component: PurchaseAmmunition, Icon: IconAmmunition, label: "ammunition" },
      ]}
    />
  );
}
