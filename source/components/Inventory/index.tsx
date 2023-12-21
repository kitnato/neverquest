import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ApplyGem } from "@neverquest/components/Inventory/ApplyGem";
import { Antidote } from "@neverquest/components/Inventory/Consumable/Antidote";
import { Bandages } from "@neverquest/components/Inventory/Consumable/Bandages";
import { Elixir } from "@neverquest/components/Inventory/Consumable/Elixir";
import { Salve } from "@neverquest/components/Inventory/Consumable/Salve";
import { DiscardItem } from "@neverquest/components/Inventory/DiscardItem";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CompassNavigate } from "@neverquest/components/Inventory/Usable/CompassNavigate";
import { HearthstoneWarp } from "@neverquest/components/Inventory/Usable/HearthstoneWarp";
import { InfusionInspect } from "@neverquest/components/Inventory/Usable/Infusion/InfusionInspect";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippableItems, inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumableItem,
  isGearItem,
  isGemItem,
  isInfusableItem,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function Inventory() {
  const equippableItemsValue = useRecoilValue(equippableItems);
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = inventoryValue.filter((item) => isGearItem(item) && item.isEquipped);
  const equippedGearIDs = new Set(equippedGear.map(({ ID }) => ID));
  const storedItems = inventoryValue.filter(
    ({ ID, name }) => !equippedGearIDs.has(ID) && name !== "knapsack",
  );

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedGear.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
          .filter(isGearItem)
          .map((gearItem) => {
            const { ID } = gearItem;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <ItemDisplay isInInventory item={gearItem} />

                <Button
                  onClick={() => {
                    toggleEquipGear(gearItem);
                  }}
                  variant="outline-dark"
                >
                  Unequip
                </Button>
              </div>
            );
          })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedItems.length === 0 && <span className="fst-italic">Nothing stored.</span>}

        {storedItems
          .filter(isGearItem)
          .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
          .map((gearItem) => {
            const { ID, name } = gearItem;
            const canEquipGear = equippableItemsValue[ID];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <ItemDisplay isInInventory item={gearItem} />

                <Stack direction="horizontal" gap={3}>
                  <OverlayTrigger
                    overlay={<Tooltip>Skill required.</Tooltip>}
                    trigger={canEquipGear ? [] : ["focus", "hover"]}
                  >
                    <div>
                      <Button
                        disabled={!canEquipGear}
                        onClick={() => {
                          toggleEquipGear(gearItem);
                        }}
                        variant="outline-dark"
                      >
                        Equip
                      </Button>
                    </div>
                  </OverlayTrigger>

                  <DiscardItem ID={ID} name={name} />
                </Stack>
              </div>
            );
          })}

        {storedItems
          .filter(isTrinketItem)
          .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
          .map((trinketItem) => {
            const { ID, name } = trinketItem;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <Usable item={trinketItem} />

                <Stack direction="horizontal" gap={3}>
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
                  <DiscardItem ID={ID} name={name} />
                </Stack>
              </div>
            );
          })}

        {storedItems
          .filter(isInfusableItem)
          .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
          .map((infusableItem) => {
            const { ID, name } = infusableItem;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <Usable item={infusableItem} />

                <Stack direction="horizontal" gap={3}>
                  <InfusionInspect infusable={name} />

                  <DiscardItem ID={ID} name={name} />
                </Stack>
              </div>
            );
          })}

        {[
          ...stackItems(
            storedItems
              .filter(isConsumableItem)
              .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
          ),
          ...stackItems(
            storedItems
              .filter(isGemItem)
              .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
          ),
        ].map(({ amount, item }) => {
          const { ID, name } = item;

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
              <ItemDisplay amount={amount} item={item} />

              <Stack direction="horizontal" gap={3}>
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
                      return <ApplyGem gem={item} />;
                    }
                  }
                })()}

                <DiscardItem ID={ID} name={name} />
              </Stack>
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}
