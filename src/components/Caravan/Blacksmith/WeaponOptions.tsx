import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { WEAPON_BASE, WEAPON_MODIFIER, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconGrip } from "@neverquest/icons/grip.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { WEAPON_CLASS_TYPES, type WeaponClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { WEAPON_GRIP_TYPES, type WeaponGrip } from "@neverquest/types/unions";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage, formatTime } from "@neverquest/utilities/formatters";
import { generateWeapon } from "@neverquest/utilities/generators";
import { getGearPrices, getGrowthSigmoid, getWeaponRanges } from "@neverquest/utilities/getters";

export function WeaponOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { weapon: craftedWeapon } = useRecoilValue(blacksmithInventory);
  const siegecraftSkillValue = useRecoilValue(skills("siegecraft"));
  const stageValue = useRecoilValue(stage);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponGrip, setWeaponGrip] = useState<WeaponGrip>("one-handed");
  const [weaponLevel, setWeaponLevel] = useState(stageValue);

  const { abilityName, IconAbility, IconGearClass, showingType } =
    WEAPON_SPECIFICATIONS[weaponClass];

  const isShowingValue = useRecoilValue(isShowing(showingType));

  const factor = getGrowthSigmoid(weaponLevel);
  const { coinPrice, scrapPrice } = getGearPrices({
    factor,
    ...WEAPON_BASE,
    modifier: WEAPON_MODIFIER[weaponGrip].price,
  });
  const { abilityChance, damage, rate, staminaCost, weight } = getWeaponRanges({
    factor,
    gearClass: weaponClass,
    grip: weaponGrip,
    modality: "melee",
  });
  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  const craftWeapon = () =>
    generateWeapon({
      allowNSFW: allowNSFWValue,
      gearClass: weaponClass,
      grip: weaponGrip,
      hasPrefix: true,
      hasSuffix: Math.random() <= getGrowthSigmoid(weaponLevel),
      level: weaponLevel,
      modality: "melee",
      tags:
        weaponLevel < stageValue - 1
          ? ["lowQuality"]
          : weaponLevel > maximumWeaponLevel
          ? ["highQuality"]
          : undefined,
    });

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

        {siegecraftSkillValue && (
          <IconDisplay
            contents={
              <FormSelect
                onChange={({ target: { value } }) => setWeaponGrip(value as WeaponGrip)}
                value={weaponGrip}
              >
                {WEAPON_GRIP_TYPES.map((current) => (
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
          contents={`${damage.minimum}-${damage.maximum}`}
          Icon={IconWeaponDamage}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Damage"
        />

        <IconDisplay
          contents={`${formatTime(rate.minimum)}-${formatTime(rate.maximum)}`}
          Icon={IconWeaponAttackRate}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Attack rate"
        />

        <IconDisplay
          contents={
            isShowingValue
              ? `${formatPercentage(abilityChance.minimum)}-${formatPercentage(
                  abilityChance.maximum,
                )}`
              : LABEL_UNKNOWN
          }
          Icon={isShowingValue ? IconAbility : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={isShowingValue ? `${abilityName} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={`${staminaCost.minimum}-${staminaCost.maximum}`}
          Icon={IconStamina}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Stamina cost"
        />

        <IconDisplay
          contents={`${weight.minimum}-${weight.maximum}`}
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {craftedWeapon === null ? (
        <CraftGear coinPrice={coinPrice} onCraft={craftWeapon} scrapPrice={scrapPrice} />
      ) : (
        <CraftedGear gearItem={craftedWeapon} />
      )}
    </>
  );
}
