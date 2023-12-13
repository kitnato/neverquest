import { Stack } from "react-bootstrap";

import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable";
import { WITCH_POTIONS } from "@neverquest/data/caravan";

export function Witch() {
  return (
    <Stack gap={3}>
      <h6>Purchase potions</h6>

      {WITCH_POTIONS.map((potion) => (
        <PurchaseConsumable consumable={potion} key={potion} />
      ))}
    </Stack>
  );
}