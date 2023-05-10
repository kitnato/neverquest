import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconStaminaCost } from "@neverquest/icons/stamina-cost.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ReactComponent as IconWeaponAbility } from "@neverquest/icons/weapon-ability.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponClass } from "@neverquest/icons/weapon-class.svg";
import { type WeaponClass, WeaponClasses } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { generateWeapon } from "@neverquest/utilities/generators";

export function WeaponOptions() {
  const { weapon: craftedWeapon } = useRecoilValue(blacksmithInventory);
  const isNSFWValue = useRecoilValue(allowNSFW);
  const levelValue = useRecoilValue(level);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponLevel, setWeaponLevel] = useState(levelValue);

  const { abilityName, skillType } = WEAPON_SPECIFICATIONS[weaponClass];

  const skillValue = useRecoilValue(skills(skillType));

  const weapon = generateWeapon({
    allowNSFW: isNSFWValue,
    gearClass: weaponClass,
    hasPrefix: true,
    hasSuffix: true,
    level: weaponLevel,
    modality: "melee",
    tags:
      weaponLevel < levelValue - 1
        ? ["lowQuality"]
        : weaponLevel > levelValue + 1
        ? ["highQuality"]
        : undefined,
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
          Icon={IconGearLevel}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setWeaponClass(value as WeaponClass)}
              value={weaponClass}
            >
              {WeaponClasses.map((weaponClass) => (
                <option key={weaponClass} value={weaponClass}>
                  {capitalizeAll(weaponClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={IconWeaponClass}
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
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        />

        <IconDisplay
          contents={skillValue ? formatPercentage(abilityChance) : LABEL_UNKNOWN}
          Icon={skillValue ? IconWeaponAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={skillValue ? `${abilityName} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={staminaCost}
          Icon={IconStaminaCost}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Stamina cost"
        />

        <IconDisplay
          contents={weight}
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {craftedWeapon != null ? <CraftedGear gear={craftedWeapon} /> : <CraftGear gear={weapon} />}
    </Stack>
  );
}
