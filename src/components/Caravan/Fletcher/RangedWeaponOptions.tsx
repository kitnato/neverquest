import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_BASE, WEAPON_MODIFIER, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconRange from "@neverquest/icons/range.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { WEAPON_CLASS_TYPES, type WeaponClass } from "@neverquest/LOCRAN/types";
import { fletcherInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";
import { generateRangedWeapon } from "@neverquest/utilities/generators";
import {
  getGearPrice,
  getGrowthSigmoid,
  getNameStructure,
  getRangedRanges,
} from "@neverquest/utilities/getters";

export function RangedWeaponOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const [fletcherInventoryValue, setFletcherInventory] = useRecoilState(fletcherInventory);
  const stageValue = useRecoilValue(stage);
  const resetFletcherInventory = useResetRecoilState(fletcherInventory);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponLevel, setWeaponLevel] = useState(stageValue);

  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[weaponClass];

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  const factor = getGrowthSigmoid(weaponLevel);
  const { abilityChance, damage, range, rate, staminaCost, weight } = getRangedRanges({
    factor,
    gearClass: weaponClass,
  });
  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel state={[weaponLevel, setWeaponLevel]} />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setWeaponClass(value as WeaponClass)}
              value={weaponClass}
            >
              {WEAPON_CLASS_TYPES.filter((current) => current !== "slashing").map((current) => (
                <option key={current} value={current}>
                  {capitalizeAll(current)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={IconGearClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${formatValue({ value: damage.minimum })}-${formatValue({
            value: damage.maximum,
          })}`}
          Icon={IconWeaponDamage}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Damage"
        />

        <IconDisplay
          contents={`${formatValue({ format: "time", value: rate.minimum })}-${formatValue({
            format: "time",
            value: rate.maximum,
          })}`}
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        />

        <IconDisplay
          contents={`${formatValue({ format: "time", value: range.minimum })}-${formatValue({
            format: "time",
            value: range.maximum,
          })}`}
          Icon={IconRange}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Range"
        />

        <IconDisplay
          contents={
            skillValue
              ? `${formatValue({
                  format: "percentage",
                  value: abilityChance.minimum,
                })}-${formatValue({ format: "percentage", value: abilityChance.maximum })}`
              : LABEL_UNKNOWN
          }
          Icon={skillValue ? IconAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={skillValue ? `${capitalizeAll(ability)} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={`${formatValue({ value: staminaCost.minimum })}-${formatValue({
            value: staminaCost.maximum,
          })}`}
          Icon={IconStamina}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Stamina cost"
        />

        <IconDisplay
          contents={`${formatValue({ value: weight.minimum })}-${formatValue({
            value: weight.maximum,
          })}`}
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {fletcherInventoryValue === null ? (
        <CraftGear
          onCraft={() =>
            setFletcherInventory(
              generateRangedWeapon({
                allowNSFW: allowNSFWValue,
                gearClass: weaponClass,
                level: weaponLevel,
                nameStructure: getNameStructure(),
                prefixTags:
                  weaponLevel <= stageValue - GEAR_LEVEL_RANGE_MAXIMUM
                    ? ["lowQuality"]
                    : weaponLevel === maximumWeaponLevel
                    ? ["highQuality"]
                    : undefined,
              }),
            )
          }
          price={getGearPrice({
            factor,
            ...WEAPON_BASE,
            modifier: WEAPON_MODIFIER.ranged.price,
          })}
        />
      ) : (
        <CraftedGear gearItem={fletcherInventoryValue} onTransfer={resetFletcherInventory} />
      )}
    </Stack>
  );
}
