import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import WeaponName from "@neverquest/components/Inventory/Weapon/WeaponName";
import { ReactComponent as Icon } from "@neverquest/icons/axe-sword.svg";
import { Weapon } from "@neverquest/types";

export default function ({ weapon }: { weapon: Weapon }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Weapon" />

      <WeaponName weapon={weapon} />
    </Stack>
  );
}
