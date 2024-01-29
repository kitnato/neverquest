import { WEAPON_CLASS_TYPES, type WeaponClass } from "@kitnato/locran/build/types";
import { useCallback, useEffect } from "react";
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
import { LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { blacksmithInventory, blacksmithOptions } from "@neverquest/state/caravan";
import { stageMaximum } from "@neverquest/state/encounter";
import { isSkillAcquired } from "@neverquest/state/skills";
import { GRIP_TYPES, type Grip } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateMeleeWeapon } from "@neverquest/utilities/generators";
import {
  getAffixStructure,
  getFromRange,
  getMeleeRanges,
  getSigmoid,
} from "@neverquest/utilities/getters";

export function MeleeOptions() {
  const [{ weapon: craftedWeapon }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const [
    {
      weapon: { gearClass, grip, level },
    },
    setBlacksmithOptions,
  ] = useRecoilState(blacksmithOptions);
  const isSkillAcquiredSiegecraft = useRecoilValue(isSkillAcquired("siegecraft"));
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass];

  const isSkillAcquiredAbility = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  const factor = getSigmoid(level);
  const { abilityChance, burden, damage, rate, weight } = getMeleeRanges({
    factor,
    gearClass,
    grip,
  });
  const maximumWeaponLevel = Math.min(
    stageMaximumValue + GEAR_LEVEL_RANGE_MAXIMUM,
    LEVELLING_MAXIMUM,
  );

  const setGearLevel = useCallback(
    (level: number) => {
      setBlacksmithOptions((options) => ({
        ...options,
        weapon: {
          ...options.weapon,
          level,
        },
      }));
    },
    [setBlacksmithOptions],
  );

  useEffect(() => {
    if (level === 0) {
      setGearLevel(Math.min(stageMaximumValue, LEVELLING_MAXIMUM));
    }
  }, [level, setGearLevel, stageMaximumValue]);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel level={level} maximum={maximumWeaponLevel} setLevel={setGearLevel} />

        <IconDisplay Icon={IconGearClass} iconProps={{ overlayPlacement: "left" }} tooltip="Class">
          <FormSelect
            onChange={({ target: { value } }) => {
              setBlacksmithOptions((options) => ({
                ...options,
                weapon: {
                  ...options.weapon,
                  gearClass: value as WeaponClass,
                },
              }));
            }}
            value={gearClass}
          >
            {WEAPON_CLASS_TYPES.map((currentWeaponClass) => (
              <option key={currentWeaponClass} value={currentWeaponClass}>
                {capitalizeAll(currentWeaponClass)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        {isSkillAcquiredSiegecraft && (
          <IconDisplay Icon={IconGrip} iconProps={{ overlayPlacement: "left" }} tooltip="Grip">
            <FormSelect
              onChange={({ target: { value } }) => {
                setBlacksmithOptions((options) => ({
                  ...options,
                  weapon: {
                    ...options.weapon,
                    grip: value as Grip,
                  },
                }));
              }}
              value={grip}
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
        >
          <span>
            {formatNumber({ value: damage.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              value: damage.maximum,
            })}
          </span>
        </IconDisplay>

        <IconDisplay
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        >
          <span>
            {formatNumber({ format: "time", value: rate.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              format: "time",
              value: rate.maximum,
            })}
          </span>
        </IconDisplay>

        <IconDisplay
          Icon={isSkillAcquiredAbility ? IconAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={isSkillAcquiredAbility ? `${capitalizeAll(ability)} chance` : LABEL_UNKNOWN}
        >
          <span>
            {isSkillAcquiredAbility
              ? `${formatNumber({
                  format: "percentage",
                  value: abilityChance.minimum,
                })} - ${formatNumber({ format: "percentage", value: abilityChance.maximum })}`
              : LABEL_UNKNOWN}
          </span>
        </IconDisplay>

        <IconDisplay Icon={IconBurden} iconProps={{ overlayPlacement: "left" }} tooltip="Burden">
          <span>
            {formatNumber({ value: burden.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              value: burden.maximum,
            })}
          </span>
        </IconDisplay>

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >
          <span>
            {formatNumber({ value: weight.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              value: weight.maximum,
            })}
          </span>
        </IconDisplay>
      </Stack>

      <hr />

      {craftedWeapon === undefined ? (
        <CraftGear
          onCraft={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              weapon: generateMeleeWeapon({
                affixStructure: getAffixStructure(),
                gearClass,
                grip,
                level,
                prefixTags:
                  level <= maximumWeaponLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
                    ? ["lowQuality"]
                    : level === maximumWeaponLevel
                      ? ["highQuality"]
                      : undefined,
              }),
            }));
          }}
          price={Math.round(
            getFromRange({
              factor,
              ...WEAPON_BASE.price,
            }) * WEAPON_MODIFIER[grip].price,
          )}
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