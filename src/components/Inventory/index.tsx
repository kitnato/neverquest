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
import type { ConsumableName, TrinketName } from "@neverquest/types";
import { isArmor, isGear, isShield, isWeapon } from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

const ITEM_ACTIONS: Record<ConsumableName | TrinketName, FunctionComponent<{ itemID: string }>> = {
  Antidote: ConsumeAntidote,
  Bandages: ConsumeBandages,
  Compass: ActivateCompass,
  Elixir: ConsumeElixir,
  Hearthstone: ActivateHearthstone,
  Knapsack: () => null,
  Salve: ConsumeSalve,
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

        {storedItems.map((item) => {
          const { id } = item;
          const ItemAction = isGear(item)
            ? () => (
                <Button onClick={() => toggleEquipGear(item)} variant="outline-dark">
                  Equip
                </Button>
              )
            : ITEM_ACTIONS[item.name];

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
