import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinket/AmmunitionPouch";
import { Compass } from "@neverquest/components/Items/Trinket/Compass";
import { Hearthstone } from "@neverquest/components/Items/Trinket/Hearthstone";
import type { TrinketItem } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Trinket({ item }: { item: TrinketItem }) {
  const { type } = item;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {type !== "ammunition pouch" && <ItemDisplay item={item} />}

      {(() => {
        switch (type) {
          case "ammunition pouch": {
            return <AmmunitionPouch item={item} />;
          }

          case "compass": {
            return <Compass />;
          }

          case "hearthstone": {
            return <Hearthstone />;
          }

          default: {
            return null;
          }
        }
      })()}
    </div>
  );
}
