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
import { allowNSFW } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { GRIP_TYPES, type Grip } from "@neverquest/types/unions";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";
import { generateMeleeWeapon } from "@neverquest/utilities/generators";
import {
  getGearPrice,
  getGrowthSigmoid,
  getMeleeRanges,
  getNameStructure,
} from "@neverquest/utilities/getters";

export function WeaponOptions() {
  const [{ weapon: craftedWeapon }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const allowNSFWValue = useRecoilValue(allowNSFW);
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

        <IconDisplay
          contents={
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
          }
          Icon={IconGearClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        {siegecraftValue && (
          <IconDisplay
            contents={
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
            }
            Icon={IconGrip}
            iconProps={{ overlayPlacement: "left" }}
            tooltip="Grip"
          />
        )}

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

      {craftedWeapon === null ? (
        <CraftGear
          onCraft={() =>
            setBlacksmithInventory((current) => ({
              ...current,
              weapon: generateMeleeWeapon({
                allowNSFW: allowNSFWValue,
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
          onTransfer={() => setBlacksmithInventory((current) => ({ ...current, weapon: null }))}
        />
      )}
    </Stack>
  );
}
