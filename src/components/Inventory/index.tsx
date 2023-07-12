import type { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConsumeAntidote } from "@neverquest/components/Inventory/Consumable/ConsumeAntidote";
import { ConsumeBandages } from "@neverquest/components/Inventory/Consumable/ConsumeBandages";
import { ConsumeElixir } from "@neverquest/components/Inventory/Consumable/ConsumeElixir";
import { ConsumeSalve } from "@neverquest/components/Inventory/Consumable/ConsumeSalve";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ActivateCompass } from "@neverquest/components/Inventory/Trinket/ActivateCompass";
import { ActivateHearthstone } from "@neverquest/components/Inventory/Trinket/ActivateHearthstone";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGear,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Trinket } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

const ITEM_ACTIONS: Record<Consumable | Trinket, FunctionComponent<{ itemID: string }>> = {
  antidote: ConsumeAntidote,
  "antique coin": () => null,
  bandages: ConsumeBandages,
  compass: ActivateCompass,
  elixir: ConsumeElixir,
  hearthstone: ActivateHearthstone,
  knapsack: () => null,
  "monkey paw": () => null,
  salve: ConsumeSalve,
  soulstone: () => null,
  "tome of power": () => null,
};

export function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = [...inventoryValue.filter((item) => isGear(item) && item.isEquipped)];
  const storedItems = inventoryValue.filter(
    (item) => !isGear(item) || (isGear(item) && !item.isEquipped)
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
          .filter(isGear)
          .map((item) => {
            const { id } = item;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={item} overlayPlacement="right" />

                <Button onClick={() => toggleEquipGear(item)} variant="outline-dark">
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
          .filter(isGear)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            const { id } = item;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={item} />

                <Button onClick={() => toggleEquipGear(item)} variant="outline-dark">
                  Equip
                </Button>
              </div>
            );
          })}

        {[...storedItems.filter(isTrinket), ...storedItems.filter(isConsumable)]
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((item) => {
            const { id, type } = item;
            const ItemAction = ITEM_ACTIONS[type];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={item} />

                <ItemAction itemID={id} />
              </div>
            );
          })}
      </Stack>
    </Stack>
  );
}
