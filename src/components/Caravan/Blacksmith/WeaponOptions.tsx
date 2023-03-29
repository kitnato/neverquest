import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ICON_UNKNOWN, ICON_WEIGHT, LABEL_UNKNOWN } from "@neverquest/constants";
import { WEAPON_ABILITY_NAME, WEAPON_SKILL_TYPE } from "@neverquest/data/gear";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/blade-fall.svg";
import { ReactComponent as IconClass } from "@neverquest/icons/gear-hammer.svg";
import { ReactComponent as IconStaminaCost } from "@neverquest/icons/ink-swirl.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/pointy-sword.svg";
import { ReactComponent as IconLevel } from "@neverquest/icons/private-first-class.svg";
import { AffixTag, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { generateWeapon } from "@neverquest/utilities/generators";

export function WeaponOptions() {
  const { weapon: craftedWeapon } = useRecoilValue(blacksmithInventory);
  const isNSFWValue = useRecoilValue(isNSFW);
  const levelValue = useRecoilValue(level);

  const [weaponClass, setWeaponClass] = useState(WeaponClass.Blunt);
  const [weaponLevel, setWeaponLevel] = useState(levelValue);

  const skillValue = useRecoilValue(skills(WEAPON_SKILL_TYPE[weaponClass]));

  const weapon = generateWeapon({
    hasPrefix: true,
    hasSuffix: true,
    isNSFW: isNSFWValue,
    level: weaponLevel,
    tags:
      weaponLevel < levelValue - 1
        ? [AffixTag.LowQuality]
        : weaponLevel > levelValue + 1
        ? [AffixTag.HighQuality]
        : undefined,
    type: WeaponType.Melee,
    weaponClass,
  });
  const { abilityChance, ranges, staminaCost, weight } = weapon;
  const maximumWeaponLevel = levelValue + 3;

  return (
    <Stack className="mx-auto w-50" gap={3}>
      <Stack className="mx-auto w-50" gap={3}>
        <IconDisplay
          contents={
            <FormControl
              max={maximumWeaponLevel}
              min={1}
              onChange={({ target: { value } }) => {
                if (!value) {
                  return;
                }

                const parsedValue = Number.parseInt(value);

                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumWeaponLevel) {
                  return;
                }

                setWeaponLevel(parsedValue);
              }}
              type="number"
              value={weaponLevel}
            />
          }
          Icon={IconLevel}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setWeaponClass(value as WeaponClass)}
              value={weaponClass}
            >
              <option value={WeaponClass.Blunt}>{capitalizeAll(WeaponClass.Blunt)}</option>

              <option value={WeaponClass.Piercing}>{capitalizeAll(WeaponClass.Piercing)}</option>

              <option value={WeaponClass.Slashing}>{capitalizeAll(WeaponClass.Slashing)}</option>
            </FormSelect>
          }
          Icon={IconClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${ranges.damage.minimum}-${ranges.damage.maximum}`}
          Icon={IconDamage}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Damage"
        />

        <IconDisplay
          contents={`${formatMilliseconds(ranges.rate.minimum)}-${formatMilliseconds(
            ranges.rate.maximum
          )}`}
          Icon={IconAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        />

        <IconDisplay
          contents={skillValue ? formatPercentage(abilityChance) : LABEL_UNKNOWN}
          Icon={skillValue ? IconAttackRate : ICON_UNKNOWN}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={skillValue ? `${WEAPON_ABILITY_NAME[weaponClass]} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={staminaCost}
          Icon={IconStaminaCost}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Stamina cost"
        />

        <IconDisplay
          contents={weight}
          Icon={ICON_WEIGHT}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {craftedWeapon ? <CraftedGear gear={craftedWeapon} /> : <CraftGear gear={weapon} />}
    </Stack>
  );
}
