import { MonkeyPaw } from "./MonkeyPaw";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinkets/AmmunitionPouch";
import type {
  TrinketItem,
  TrinketItemAmmunitionPouch,
  TrinketItemInfusable,
} from "@neverquest/types";

export function Trinket({ item }: { item: TrinketItem }) {
  switch (item.name) {
    case "ammunition pouch": {
      return <AmmunitionPouch item={item as TrinketItemAmmunitionPouch} />;
    }
    case "monkey paw": {
      return <MonkeyPaw item={item as TrinketItemInfusable} />;
    }
    default: {
      return <ItemDisplay item={item} overlayPlacement="right" />;
    }
  }
}
