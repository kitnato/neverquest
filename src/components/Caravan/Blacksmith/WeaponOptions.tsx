import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { BLACKSMITH_GEAR_LEVEL_MAXIMUM } from "@neverquest/data/caravan";
import { WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { WEAPON_CLASSES, type WeaponClass } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { generateWeapon } from "@neverquest/utilities/generators";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function WeaponOptions() {
  const { weapon: craftedWeapon } = useRecoilValue(blacksmithInventory);
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const stageValue = useRecoilValue(stage);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponLevel, setWeaponLevel] = useState(stageValue);

  const { abilityName, IconAbility, IconGearClass, showingType } =
    WEAPON_SPECIFICATIONS[weaponClass];

  const isShowingValue = useRecoilValue(isShowing(showingType));

  const weapon = generateWeapon({
    allowNSFW: allowNSFWValue,
    gearClass: weaponClass,
    hasPrefix: true,
    hasSuffix: Math.random() < getGrowthSigmoid(weaponLevel),
    level: weaponLevel,
    modality: "melee",
    tags:
      weaponLevel < stageValue - 1
        ? ["lowQuality"]
        : weaponLevel > stageValue + 1
        ? ["highQuality"]
        : undefined,
  });
  const { ranges, staminaCost, weight } = weapon;
  const maximumWeaponLevel = stageValue + BLACKSMITH_GEAR_LEVEL_MAXIMUM;

  return (
    <>
      <Stack className="mx-auto" gap={3}>
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
              {WEAPON_CLASSES.map((weaponClass) => (
                <option key={weaponClass} value={weaponClass}>
                  {capitalizeAll(weaponClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={IconGearClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${ranges.damage.minimum}-${ranges.damage.maximum}`}
          Icon={IconWeaponDamage}
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
          contents={
            isShowingValue
              ? `${formatPercentage(ranges.ability.minimum)}-${formatPercentage(
                  ranges.ability.maximum
                )}`
              : LABEL_UNKNOWN
          }
          Icon={isShowingValue ? IconAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={isShowingValue ? `${abilityName} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={staminaCost}
          Icon={IconStamina}
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

      {craftedWeapon === null ? <CraftGear gear={weapon} /> : <CraftedGear gear={craftedWeapon} />}
    </>
  );
}
