import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { WEAPON_BASE, WEAPON_MODIFIER, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconRange } from "@neverquest/icons/range.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { WEAPON_CLASS_TYPES, type WeaponClass } from "@neverquest/LOCRAN/types";
import { fletcherInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage, formatTime } from "@neverquest/utilities/formatters";
import { generateRangedWeapon } from "@neverquest/utilities/generators";
import { getGearPrices, getGrowthSigmoid, getRangedRanges } from "@neverquest/utilities/getters";

export function RangedWeaponOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const [fletcherInventoryValue, setFletcherInventory] = useRecoilState(fletcherInventory);
  const stageValue = useRecoilValue(stage);
  const resetFletcherInventory = useResetRecoilState(fletcherInventory);

  const [weaponClass, setWeaponClass] = useState<WeaponClass>("blunt");
  const [weaponLevel, setWeaponLevel] = useState(stageValue);

  const { abilityName, IconAbility, IconGearClass, showingType } =
    WEAPON_SPECIFICATIONS[weaponClass];

  const isShowingValue = useRecoilValue(isShowing(showingType));

  const factor = getGrowthSigmoid(weaponLevel);
  const { coinPrice, scrapPrice } = getGearPrices({
    factor,
    ...WEAPON_BASE,
    modifier: WEAPON_MODIFIER.ranged.price,
  });
  const { abilityChance, damage, range, rate, staminaCost, weight } = getRangedRanges({
    factor,
    gearClass: weaponClass,
  });
  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  const handleCraft = () =>
    setFletcherInventory(
      generateRangedWeapon({
        allowNSFW: allowNSFWValue,
        gearClass: weaponClass,
        hasPrefix: true,
        hasSuffix: Math.random() <= getGrowthSigmoid(weaponLevel),
        level: weaponLevel,
        tags:
          weaponLevel < stageValue - 1
            ? ["lowQuality"]
            : weaponLevel > maximumWeaponLevel
            ? ["highQuality"]
            : undefined,
      }),
    );

  return (
    <Stack className="mx-auto w-50">
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
          contents={`${formatTime(range.minimum)}-${formatTime(range.maximum)}`}
          Icon={IconRange}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Range"
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

      {fletcherInventoryValue === null ? (
        <CraftGear coinPrice={coinPrice} onCraft={handleCraft} scrapPrice={scrapPrice} />
      ) : (
        <CraftedGear gearItem={fletcherInventoryValue} onTransfer={resetFletcherInventory} />
      )}
    </Stack>
  );
}
