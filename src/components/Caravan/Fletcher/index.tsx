import { FletcherAmmunition } from "@neverquest/components/Caravan/Fletcher/FletcherAmmunition";
import { RangedWeaponOptions } from "@neverquest/components/Caravan/Fletcher/RangedWeaponOptions";
import { IconTabs } from "@neverquest/components/IconTabs";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ReactComponent as IconRanged } from "@neverquest/icons/ranged.svg";

export function Fletcher() {
  return (
    <IconTabs
      defaultTab="ranged"
      tabs={[
        { Component: RangedWeaponOptions, Icon: IconRanged, label: "ranged" },
        { Component: FletcherAmmunition, Icon: IconAmmunition, label: "ammunition" },
      ]}
    />
  );
}
