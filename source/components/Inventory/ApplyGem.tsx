import { Dropdown, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM } from "@neverquest/data/general";
import { GEMS_MAXIMUM } from "@neverquest/data/items";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { gems } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import type { GemItem } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";
import { GEAR_TYPES } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getGemFittingCost } from "@neverquest/utilities/getters";

export function ApplyGem({ gem }: { gem: GemItem }) {
  const armorValue = useRecoilValue(armor);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const essenceValue = useRecoilValue(essence);
  const setInventory = useSetRecoilState(inventory);

  const [armorGemsValue, setArmorGems] = useRecoilState(gems(armorValue.ID));
  const [shieldGemsValue, setShieldGems] = useRecoilState(gems(shieldValue.ID));
  const [weaponGemsValue, setWeaponGems] = useRecoilState(gems(weaponValue.ID));

  const gemFitting = {
    armor: {
      canApply:
        armorGemsValue.length < GEMS_MAXIMUM &&
        getGemFittingCost(armorGemsValue.length) <= essenceValue,
      gear: armorValue,
      gemsFitted: armorGemsValue.length,
      setGems: setArmorGems,
    },
    shield: {
      canApply:
        shieldGemsValue.length < GEMS_MAXIMUM &&
        getGemFittingCost(shieldGemsValue.length) <= essenceValue,
      gear: shieldValue,
      gemsFitted: shieldGemsValue.length,
      setGems: setShieldGems,
    },
    weapon: {
      canApply:
        weaponGemsValue.length < GEMS_MAXIMUM &&
        getGemFittingCost(weaponGemsValue.length) <= essenceValue,
      gear: weaponValue,
      gemsFitted: weaponGemsValue.length,
      setGems: setWeaponGems,
    },
  };

  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return (
    <Dropdown
      onSelect={(slot) => {
        if (isGear(slot) && gemFitting[slot].canApply) {
          const { gemsFitted, setGems } = gemFitting[slot];

          setGems((currentGems) => [...currentGems, gem]);
          setInventory((currentInventory) =>
            currentInventory.filter(({ ID: itemID }) => itemID !== gem.ID),
          );

          transactEssence(-getGemFittingCost(gemsFitted));
          progressQuest({ quest: "gemsApplying" });

          if (
            GEAR_TYPES.filter((gear) => gear !== slot).every(
              (gear) => gemFitting[gear].gemsFitted > 0,
            )
          ) {
            progressQuest({ quest: "gemsApplyingAll" });
          }
        }
      }}
    >
      <Dropdown.Toggle variant="outline-dark">Apply</Dropdown.Toggle>

      <Dropdown.Menu>
        {GEAR_TYPES.map((gearType) => {
          const {
            canApply,
            gear: { name },
          } = gemFitting[gearType];

          return (
            <Dropdown.Item disabled={!canApply} eventKey={gearType} key={gearType}>
              <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
                <span>{capitalizeAll(name)}</span>

                <Stack className="ms-2" direction="horizontal" gap={1}>
                  {canApply ? (
                    <IconDisplay Icon={IconEssence} iconProps={{ className: "small" }}>
                      <span>{getGemFittingCost(length)}</span>
                    </IconDisplay>
                  ) : (
                    <span>{LABEL_MAXIMUM}</span>
                  )}
                </Stack>
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
