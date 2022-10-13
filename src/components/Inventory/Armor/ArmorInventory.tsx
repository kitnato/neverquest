import IconDisplay from "@neverquest/components/IconDisplay";
import ArmorName from "@neverquest/components/Inventory/Armor/ArmorName";
import { ReactComponent as Icon } from "@neverquest/icons/shoulder-armor.svg";
import { Armor } from "@neverquest/types";

// <IconDisplay contents={} Icon={Icon} isAnimated

export default function ({ armor }: { armor: Armor }) {
  return <IconDisplay Icon={Icon} contents={<ArmorName armor={armor} />} tooltip="Armor" />;
}
