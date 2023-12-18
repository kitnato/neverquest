import { WEAPON_CLASS_TYPES, type WeaponClass } from "@kitnato/locran/build/types";
import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { WEAPON_BASE, WEAPON_MODIFIER, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { GROWTH_MAXIMUM, LABEL_TRAINING_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconRange from "@neverquest/icons/range.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { fletcherInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateRangedWeapon } from "@neverquest/utilities/generators";
import {
  getAffixStructure,
  getGearPrice,
  getGrowthSigmoid,
  getRangedRanges,
} from "@neverquest/utilities/getters";

export function RangedWeaponOptions() {
  const [fletcherInventoryValue, setFletcherInventory] = useRecoilState(fletcherInventory);
  const allowProfanityValue = useRecoilValue(allowProfanity);
  const isSkillAcquiredArchery = useRecoilValue(isSkillAcquired("archery"));
  const stageValue = useRecoilValue(stage);
  const resetFletcherInventory = useResetRecoilState(fletcherInventory);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponLevel, setWeaponLevel] = useState(Math.min(stageValue, GROWTH_MAXIMUM));

  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[weaponClass];

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  const factor = getGrowthSigmoid(weaponLevel);
  const { abilityChance, ammunitionCost, damage, range, rate, staminaCost, weight } =
    getRangedRanges({
      factor,
      gearClass: weaponClass,
    });
  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GROWTH_MAXIMUM);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel maximum={maximumWeaponLevel} state={[weaponLevel, setWeaponLevel]} />

        <IconDisplay Icon={IconGearClass} iconProps={{ overlayPlacement: "left" }} tooltip="Class">
          <FormSelect
            onChange={({ target: { value } }) => {
              setWeaponClass(value as WeaponClass);
            }}
            value={weaponClass}
          >
            {WEAPON_CLASS_TYPES.filter(
              (currentWeaponClass) => currentWeaponClass !== "slashing",
            ).map((currentWeaponClass) => (
              <option key={currentWeaponClass} value={currentWeaponClass}>
                {capitalizeAll(currentWeaponClass)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        <IconDisplay
          Icon={IconWeaponDamage}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Damage"
        >
          {`${formatNumber({ value: damage.minimum })}-${formatNumber({
            value: damage.maximum,
          })}`}
        </IconDisplay>

        <IconDisplay
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        >
          {`${formatNumber({ format: "time", value: rate.minimum })}-${formatNumber({
            format: "time",
            value: rate.maximum,
          })}`}
        </IconDisplay>

        <IconDisplay
          Icon={IconAmmunition}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Ammunition cost"
        >
          {`${formatNumber({ value: ammunitionCost.minimum })}-${formatNumber({
            value: ammunitionCost.maximum,
          })}`}
        </IconDisplay>

        <IconDisplay Icon={IconRange} iconProps={{ overlayPlacement: "left" }} tooltip="Range">
          {`${formatNumber({ format: "time", value: range.minimum })}-${formatNumber({
            format: "time",
            value: range.maximum,
          })}`}
        </IconDisplay>

        <IconDisplay
          Icon={skillValue ? IconAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={skillValue ? `${capitalizeAll(ability)} chance` : LABEL_UNKNOWN}
        >
          {skillValue
            ? `${formatNumber({
                format: "percentage",
                value: abilityChance.minimum,
              })}-${formatNumber({ format: "percentage", value: abilityChance.maximum })}`
            : LABEL_UNKNOWN}
        </IconDisplay>

        <IconDisplay
          Icon={IconStamina}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Stamina cost"
        >
          {`${formatNumber({ value: staminaCost.minimum })}-${formatNumber({
            value: staminaCost.maximum,
          })}`}
        </IconDisplay>

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >
          {`${formatNumber({ value: weight.minimum })}-${formatNumber({
            value: weight.maximum,
          })}`}
        </IconDisplay>
      </Stack>

      <hr />

      {isSkillAcquiredArchery ? (
        fletcherInventoryValue === undefined ? (
          <CraftGear
            onCraft={() => {
              setFletcherInventory(
                generateRangedWeapon({
                  affixStructure: getAffixStructure(),
                  allowProfanity: allowProfanityValue,
                  gearClass: weaponClass,
                  level: weaponLevel,
                  prefixTags:
                    weaponLevel <= maximumWeaponLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
                      ? ["lowQuality"]
                      : weaponLevel === maximumWeaponLevel
                        ? ["highQuality"]
                        : undefined,
                }),
              );
            }}
            price={getGearPrice({
              factor,
              ...WEAPON_BASE,
              modifier: WEAPON_MODIFIER.ranged.price,
            })}
          />
        ) : (
          <CraftedGear gearItem={fletcherInventoryValue} onTransfer={resetFletcherInventory} />
        )
      ) : (
        <span className="fst-italic text-center">{LABEL_TRAINING_REQUIRED}</span>
      )}
    </Stack>
  );
}
