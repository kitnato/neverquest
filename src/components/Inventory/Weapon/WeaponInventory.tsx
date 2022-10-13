import IconDisplay from "@neverquest/components/IconDisplay";
import WeaponName from "@neverquest/components/Inventory/Weapon/WeaponName";
import { ReactComponent as Icon } from "@neverquest/icons/axe-sword.svg";
import { Weapon } from "@neverquest/types";

export default function ({ weapon }: { weapon: Weapon }) {
  return <IconDisplay Icon={Icon} contents={<WeaponName weapon={weapon} />} tooltip="Weapon" />;
}
