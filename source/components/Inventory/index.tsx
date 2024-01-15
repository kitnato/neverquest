import type { FunctionComponent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ApplyGem } from "@neverquest/components/Inventory/ApplyGem";
import { Antidote } from "@neverquest/components/Inventory/Consumable/Antidote";
import { Bandages } from "@neverquest/components/Inventory/Consumable/Bandages";
import { Elixir } from "@neverquest/components/Inventory/Consumable/Elixir";
import { Salve } from "@neverquest/components/Inventory/Consumable/Salve";
import { DiscardItem } from "@neverquest/components/Inventory/DiscardItem";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { CompassNavigate } from "@neverquest/components/Inventory/Inheritable/CompassNavigate";
import { HearthstoneWarp } from "@neverquest/components/Inventory/Inheritable/HearthstoneWarp";
import { InfusionInspect } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionInspect";
import { SpinningWheelToggle } from "@neverquest/components/Inventory/Inheritable/SpinningWheelToggle";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_SKILL_REQUIRED,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import {
  isArmor,
  isConsumableItem,
  isGearItem,
  isGemItem,
  isInfusableItem,
  isMelee,
  isRanged,
  isRelicItem,
  isShield,
  isUnarmed,
  isUnarmored,
  isUnshielded,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Relic } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

const RELIC_ACTIONS: Partial<Record<Relic, FunctionComponent>> = {
  compass: CompassNavigate,
  hearthstone: HearthstoneWarp,
  "spinning wheel": SpinningWheelToggle,
};

export function Inventory() {
  const armorValue = useRecoilValue(armor);
  const inventoryValue = useRecoilValue(inventory);
  const isSkillAcquiredArchery = useRecoilValue(isSkillAcquired("archery"));
  const isSkillAcquiredArmorcraft = useRecoilValue(isSkillAcquired("armorcraft"));
  const isSkillAcquiredShieldcraft = useRecoilValue(isSkillAcquired("shieldcraft"));
  const isSkillAcquiredSiegecraft = useRecoilValue(isSkillAcquired("siegecraft"));
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);

  const equippableItems: Record<string, boolean> = {};

  for (const item of inventoryValue) {
    let canEquip =
      (isArmor(item) && armorValue.ID !== item.ID) ||
      (isWeapon(item) && weaponValue.ID !== item.ID) ||
      (isShield(item) && shieldValue.ID !== item.ID);

    if (isArmor(item) && item.gearClass === "heavy") {
      canEquip = isSkillAcquiredArmorcraft;
    }

    if (isMelee(item) && item.grip === "two-handed") {
      canEquip = isSkillAcquiredSiegecraft;
    }

    if (isRanged(item)) {
      canEquip = isSkillAcquiredArchery;
    }

    if (isShield(item) && item.gearClass === "tower") {
      canEquip = isSkillAcquiredShieldcraft;
    }

    equippableItems[item.ID] = canEquip;
  }

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = [weaponValue, armorValue, shieldValue].filter((gearItem) =>
    isArmor(gearItem)
      ? !isUnarmored(gearItem)
      : isShield(gearItem)
        ? !isUnshielded(gearItem)
        : !isUnarmed(gearItem),
  ) as (Armor | Shield | Weapon)[];
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

        {equippedGear.map((gearItem) => {
          const { ID } = gearItem;

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
              <ItemDisplay item={gearItem} />

              <Button
                className="ms-2"
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
            const canEquipGear = equippableItems[ID];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <ItemDisplay item={gearItem} />

                <Stack className="ms-2" direction="horizontal" gap={3}>
                  <OverlayTrigger
                    overlay={<Tooltip>{LABEL_SKILL_REQUIRED}</Tooltip>}
                    trigger={canEquipGear ? [] : POPOVER_TRIGGER}
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
          .filter(isRelicItem)
          .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
          .map((relicItem) => {
            const { ID, name } = relicItem;
            const Action = RELIC_ACTIONS[name];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                <ItemDisplay item={relicItem} />

                <Stack className="ms-2" direction="horizontal" gap={3}>
                  {Action !== undefined && <Action />}

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
                <ItemDisplay item={infusableItem} />

                <Stack className="ms-2" direction="horizontal" gap={3}>
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

              <Stack className="ms-2" direction="horizontal" gap={3}>
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
