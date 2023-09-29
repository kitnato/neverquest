import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import type { TrinketItemMonkeyPaw } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonkeyPaw({ item }: { item: TrinketItemMonkeyPaw }) {
  const { level } = item;

  return (
    <ItemDisplay
      extra={` - Level ${formatValue({ value: level })}`}
      item={item}
      overlayPlacement="right"
    />
  );
}
