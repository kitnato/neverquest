import { WEAPON_CLASS_TYPES, type WeaponClass } from "@kitnato/locran/build/types";
import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import {
  GEAR_LEVEL_RANGE_MAXIMUM,
  WEAPON_BASE,
  WEAPON_MODIFIER,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/gear";
import { GROWTH_MAXIMUM, LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { GRIP_TYPES, type Grip } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateMeleeWeapon } from "@neverquest/utilities/generators";
import {
  getAffixStructure,
  getGearPrice,
  getGrowthSigmoid,
  getMeleeRanges,
} from "@neverquest/utilities/getters";

export function WeaponOptions() {
  const [{ weapon: craftedWeapon }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const allowProfanityValue = useRecoilValue(allowProfanity);
  const siegecraftValue = useRecoilValue(isSkillAcquired("siegecraft"));
  const stageValue = useRecoilValue(stage);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponGrip, setWeaponGrip] = useState<Grip>("one-handed");
  const [weaponLevel, setWeaponLevel] = useState(Math.min(stageValue, GROWTH_MAXIMUM));

  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[weaponClass];

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  const factor = getGrowthSigmoid(weaponLevel);
  const { abilityChance, damage, rate, staminaCost, weight } = getMeleeRanges({
    factor,
    gearClass: weaponClass,
    grip: weaponGrip,
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
            {WEAPON_CLASS_TYPES.map((currentWeaponClass) => (
              <option key={currentWeaponClass} value={currentWeaponClass}>
                {capitalizeAll(currentWeaponClass)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        {siegecraftValue && (
          <IconDisplay Icon={IconGrip} iconProps={{ overlayPlacement: "left" }} tooltip="Grip">
            <FormSelect
              onChange={({ target: { value } }) => {
                setWeaponGrip(value as Grip);
              }}
              value={weaponGrip}
            >
              {GRIP_TYPES.map((grip) => (
                <option key={grip} value={grip}>
                  {capitalizeAll(grip)}
                </option>
              ))}
            </FormSelect>
          </IconDisplay>
        )}

        <IconDisplay
          Icon={IconWeaponDamage}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Damage"
        >{`${formatNumber({ value: damage.minimum })}-${formatNumber({
          value: damage.maximum,
        })}`}</IconDisplay>

        <IconDisplay
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        >{`${formatNumber({ format: "time", value: rate.minimum })}-${formatNumber({
          format: "time",
          value: rate.maximum,
        })}`}</IconDisplay>

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
        >{`${formatNumber({ value: staminaCost.minimum })}-${formatNumber({
          value: staminaCost.maximum,
        })}`}</IconDisplay>

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >{`${formatNumber({ value: weight.minimum })}-${formatNumber({
          value: weight.maximum,
        })}`}</IconDisplay>
      </Stack>

      <hr />

      {craftedWeapon === undefined ? (
        <CraftGear
          onCraft={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              weapon: generateMeleeWeapon({
                affixStructure: getAffixStructure(),
                allowProfanity: allowProfanityValue,
                gearClass: weaponClass,
                grip: weaponGrip,
                level: weaponLevel,
                prefixTags:
                  weaponLevel <= maximumWeaponLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
                    ? ["lowQuality"]
                    : weaponLevel === maximumWeaponLevel
                      ? ["highQuality"]
                      : undefined,
              }),
            }));
          }}
          price={getGearPrice({
            factor,
            ...WEAPON_BASE,
            modifier: WEAPON_MODIFIER[weaponGrip].price,
          })}
        />
      ) : (
        <CraftedGear
          gearItem={craftedWeapon}
          onTransfer={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              weapon: undefined,
            }));
          }}
        />
      )}
    </Stack>
  );
}
