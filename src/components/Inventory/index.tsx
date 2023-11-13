import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ApplyGem } from "@neverquest/components/Inventory/ApplyGem";
import { Antidote } from "@neverquest/components/Inventory/Consumable/Antidote";
import { Bandages } from "@neverquest/components/Inventory/Consumable/Bandages";
import { Elixir } from "@neverquest/components/Inventory/Consumable/Elixir";
import { Salve } from "@neverquest/components/Inventory/Consumable/Salve";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { StoredGear } from "@neverquest/components/Inventory/StoredGear";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CompassNavigate } from "@neverquest/components/Inventory/Usable/CompassNavigate";
import { HearthstoneWarp } from "@neverquest/components/Inventory/Usable/HearthstoneWarp";
import { InfusionInspect } from "@neverquest/components/Inventory/Usable/Infusion/InfusionInspect";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import {
  isArmor,
  isConsumableItem,
  isGear,
  isGem,
  isInfusableItem,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = inventoryValue.filter((current) => isGear(current) && current.isEquipped);
  const equippedGearIDs = new Set(equippedGear.map(({ ID }) => ID));
  const storedItems = inventoryValue.filter(({ ID }) => !equippedGearIDs.has(ID));

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedGear.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
          .filter(isGear)
          .map((current) => {
            const { ID } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <ItemDisplay item={current} overlayPlacement="right" />

                <Button onClick={() => toggleEquipGear(current)} variant="outline-dark">
                  Unequip
                </Button>
              </div>
            );
          })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedItems.length === 0 && <span className="fst-italic">Nothing stored.</span>}

        <StoredGear />

        {storedItems
          .filter(isTrinketItem)
          .toSorted((current1, current2) => current1.name.localeCompare(current2.name))
          .map((current) => {
            const { ID, name } = current;

            if (name === "knapsack") {
              return;
            }

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <Usable item={current} />

                {(() => {
                  switch (name) {
                    case "compass": {
                      return <CompassNavigate />;
                    }

                    case "hearthstone": {
                      return <HearthstoneWarp />;
                    }

                    default: {
                      return;
                    }
                  }
                })()}
              </div>
            );
          })}

        {storedItems
          .filter(isInfusableItem)
          .toSorted((current1, current2) => current1.name.localeCompare(current2.name))
          .map((current) => {
            const { ID, name } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <Usable item={current} />

                <InfusionInspect infusable={name} />
              </div>
            );
          })}

        {[
          ...stackItems(
            storedItems
              .filter((element) => isConsumableItem(element))
              .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
          ),
          ...stackItems(
            storedItems
              .filter((element) => isGem(element))
              .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
          ),
        ].map(({ item, stack }) => {
          const { ID, name } = item;

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
              <ItemDisplay item={item} overlayPlacement="right" stack={stack} />

              {(() => {
                switch (name) {
                  case "antidote": {
                    return <Antidote ID={ID} />;
                  }
                  case "bandages": {
                    return <Bandages ID={ID} />;
                  }
                  case "elixir": {
                    return <Elixir ID={ID} />;
                  }
                  case "salve": {
                    return <Salve ID={ID} />;
                  }
                  case "phylactery": {
                    return;
                  }
                  default: {
                    return <ApplyGem gem={item as GemItem} />;
                  }
                }
              })()}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}
