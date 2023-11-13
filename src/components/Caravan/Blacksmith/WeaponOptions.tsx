import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_BASE, WEAPON_MODIFIER, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { WEAPON_CLASS_TYPES, type WeaponClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { GRIP_TYPES, type Grip } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateMeleeWeapon } from "@neverquest/utilities/generators";
import {
  getGearPrice,
  getGrowthSigmoid,
  getMeleeRanges,
  getNameStructure,
} from "@neverquest/utilities/getters";

export function WeaponOptions() {
  const [{ weapon: craftedWeapon }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const allowProfanityValue = useRecoilValue(allowProfanity);
  const siegecraftValue = useRecoilValue(isSkillAcquired("siegecraft"));
  const stageValue = useRecoilValue(stage);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponGrip, setWeaponGrip] = useState<Grip>("one-handed");
  const [weaponLevel, setWeaponLevel] = useState(stageValue);

  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[weaponClass];

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  const factor = getGrowthSigmoid(weaponLevel);
  const { abilityChance, damage, rate, staminaCost, weight } = getMeleeRanges({
    factor,
    gearClass: weaponClass,
    grip: weaponGrip,
  });
  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel state={[weaponLevel, setWeaponLevel]} />

        <IconDisplay Icon={IconGearClass} iconProps={{ overlayPlacement: "left" }} tooltip="Class">
          <FormSelect
            onChange={({ target: { value } }) => setWeaponClass(value as WeaponClass)}
            value={weaponClass}
          >
            {WEAPON_CLASS_TYPES.map((current) => (
              <option key={current} value={current}>
                {capitalizeAll(current)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        {siegecraftValue && (
          <IconDisplay Icon={IconGrip} iconProps={{ overlayPlacement: "left" }} tooltip="Grip">
            <FormSelect
              onChange={({ target: { value } }) => setWeaponGrip(value as Grip)}
              value={weaponGrip}
            >
              {GRIP_TYPES.map((current) => (
                <option key={current} value={current}>
                  {capitalizeAll(current)}
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
          onCraft={() =>
            setBlacksmithInventory((current) => ({
              ...current,
              weapon: generateMeleeWeapon({
                allowProfanity: allowProfanityValue,
                gearClass: weaponClass,
                grip: weaponGrip,
                level: weaponLevel,
                nameStructure: getNameStructure(),
                prefixTags:
                  weaponLevel <= stageValue - GEAR_LEVEL_RANGE_MAXIMUM
                    ? ["lowQuality"]
                    : weaponLevel === maximumWeaponLevel
                      ? ["highQuality"]
                      : undefined,
              }),
            }))
          }
          price={getGearPrice({
            factor,
            ...WEAPON_BASE,
            modifier: WEAPON_MODIFIER[weaponGrip].price,
          })}
        />
      ) : (
        <CraftedGear
          gearItem={craftedWeapon}
          onTransfer={() =>
            setBlacksmithInventory((current) => ({ ...current, weapon: undefined }))
          }
        />
      )}
    </Stack>
  );
}
