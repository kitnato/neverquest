import { Stack } from "react-bootstrap";

import { ArmorOptions } from "@neverquest/components/Caravan/Blacksmith/ArmorOptions";
import { ShieldOptions } from "@neverquest/components/Caravan/Blacksmith/ShieldOptions";
import { WeaponOptions } from "@neverquest/components/Caravan/Blacksmith/WeaponOptions";
import { IconTabs } from "@neverquest/components/IconTabs";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";

export function Blacksmith() {
  return (
    <Stack gap={3}>
      <h6>Craft gear</h6>

      <IconTabs
        defaultTab="weapon"
        tabs={[
          {
            Component: WeaponOptions,
            Icon: IconMelee,
            label: "weapon",
          },
          {
            Component: ArmorOptions,
            Icon: IconArmor,
            label: "armor",
          },
          {
            Component: ShieldOptions,
            Icon: IconShield,
            label: "shield",
          },
        ]}
      />
    </Stack>
  );
}
