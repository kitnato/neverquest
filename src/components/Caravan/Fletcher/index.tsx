import { FletcherAmmunition } from "@neverquest/components/Caravan/Fletcher/FletcherAmmunition";
import { RangedWeaponOptions } from "@neverquest/components/Caravan/Fletcher/RangedWeaponOptions";
import { IconTabs } from "@neverquest/components/IconTabs";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";

export function Fletcher() {
  return (
    <IconTabs
      tabs={[
        { Component: RangedWeaponOptions, Icon: IconRanged, label: "ranged" },
        { Component: FletcherAmmunition, Icon: IconAmmunition, label: "ammunition" },
      ]}
    />
  );
}
