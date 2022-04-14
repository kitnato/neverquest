import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import WeaponName from "neverquest/components/Inventory/Weapon/WeaponName";
import { Weapon } from "neverquest/env.d";
import icon from "neverquest/icons/axe-sword.svg";

export default function WeaponInventory({ weapon }: { weapon: Weapon }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Weapon" />

      <WeaponName weapon={weapon} />
    </Stack>
  );
}
