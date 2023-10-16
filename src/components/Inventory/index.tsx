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
import {
  isArmor,
  isConsumable,
  isGear,
  isGem,
  isInfusable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = inventoryValue.filter((current) => isGear(current) && current.isEquipped);
  const equippedGearIDs = equippedGear.map(({ id }) => id);
  const storedItems = inventoryValue.filter(({ id }) => !equippedGearIDs.includes(id));

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
            const { id } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
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
          .filter(isTrinket)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((current) => {
            const { id, name } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
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
                      return null;
                    }
                  }
                })()}
              </div>
            );
          })}

        {storedItems
          .filter(isInfusable)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((current) => (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
              <Usable item={current} />

              <InfusionInspect infusable={current.name} />
            </div>
          ))}

        {[
          ...stackItems(
            storedItems.filter(isConsumable).sort((a, b) => a.name.localeCompare(b.name)),
          ),
          ...stackItems(storedItems.filter(isGem).sort((a, b) => a.name.localeCompare(b.name))),
        ].map(({ item, stack }) => {
          const { id, name } = item;

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
              <ItemDisplay item={item} overlayPlacement="right" stack={stack} />

              {(() => {
                if (isConsumable(item)) {
                  switch (name) {
                    case "antidote": {
                      return <Antidote id={id} />;
                    }
                    case "bandages": {
                      return <Bandages id={id} />;
                    }
                    case "elixir": {
                      return <Elixir id={id} />;
                    }
                    case "salve": {
                      return <Salve id={id} />;
                    }
                  }
                }

                if (isGem(item)) {
                  return <ApplyGem gem={item} />;
                }

                return null;
              })()}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}
