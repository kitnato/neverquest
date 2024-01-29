import { Dropdown } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM } from "@neverquest/data/general";
import { GEMS_MAXIMUM } from "@neverquest/data/items";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { armor, gems, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import { isShowing } from "@neverquest/state/ui";
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
  const setIsShowing = {
    armor: useSetRecoilState(isShowing("armor")),
    shield: useSetRecoilState(isShowing("offhand")),
    weapon: useSetRecoilState(isShowing("weapon")),
  };

  const [armorGemsValue, setArmorGems] = useRecoilState(gems(armorValue.ID));
  const [shieldGemsValue, setShieldGems] = useRecoilState(gems(shieldValue.ID));
  const [weaponGemsValue, setWeaponGems] = useRecoilState(gems(weaponValue.ID));

  const gemFitting = {
    armor: {
      canFit: armorGemsValue.length < GEMS_MAXIMUM,
      gear: armorValue,
      gemsFitted: armorGemsValue.length,
      isAffordable: getGemFittingCost(armorGemsValue.length) <= essenceValue,
      setGems: setArmorGems,
    },
    shield: {
      canFit: shieldGemsValue.length < GEMS_MAXIMUM,
      gear: shieldValue,
      gemsFitted: shieldGemsValue.length,
      isAffordable: getGemFittingCost(shieldGemsValue.length) <= essenceValue,
      setGems: setShieldGems,
    },
    weapon: {
      canFit: weaponGemsValue.length < GEMS_MAXIMUM,
      gear: weaponValue,
      gemsFitted: weaponGemsValue.length,
      isAffordable: getGemFittingCost(weaponGemsValue.length) <= essenceValue,
      setGems: setWeaponGems,
    },
  };

  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return (
    <Dropdown
      onSelect={(slot) => {
        if (isGear(slot)) {
          const { gemsFitted, setGems } = gemFitting[slot];

          setGems((currentGems) => [...currentGems, gem]);
          setInventory((currentInventory) =>
            currentInventory.filter(({ ID: itemID }) => itemID !== gem.ID),
          );

          setIsShowing[slot](true);

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
            canFit,
            gear: { name },
            gemsFitted,
            isAffordable,
          } = gemFitting[gearType];

          const canApply = canFit && isAffordable;

          return (
            <Dropdown.Item disabled={!canApply} eventKey={gearType} key={gearType}>
              <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
                <span>{capitalizeAll(name)}</span>

                <div className="ms-2">
                  {canFit ? (
                    <IconDisplay Icon={IconEssence} iconProps={{ className: "small" }}>
                      <span>{getGemFittingCost(gemsFitted)}</span>
                    </IconDisplay>
                  ) : (
                    <span>{LABEL_MAXIMUM}</span>
                  )}
                </div>
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
