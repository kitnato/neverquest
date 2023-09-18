import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ammunition, ammunitionMaximum } from "@neverquest/state/inventory";
import type { TrinketItem } from "@neverquest/types";

export function AmmunitionPouch({
  item,
  overlayPlacement,
}: {
  item: TrinketItem;
  overlayPlacement?: Placement;
}) {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);

  return (
    <ItemDisplay
      extra={` (${ammunitionValue}/${ammunitionMaximumValue})`}
      item={item}
      overlayPlacement={overlayPlacement}
    />
  );
}
