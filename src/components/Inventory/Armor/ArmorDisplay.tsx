import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ReactComponent as Icon } from "@neverquest/icons/shoulder-armor.svg";
import { Armor } from "@neverquest/types";

export function ArmorDisplay({ armor }: { armor: Armor }) {
  return <IconDisplay contents={<ArmorName armor={armor} />} Icon={Icon} tooltip="Armor" />;
}
