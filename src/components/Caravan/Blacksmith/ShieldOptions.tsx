import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/stagger.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { SHIELD_CLASS_TYPES, type ShieldClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";
import { generateShield } from "@neverquest/utilities/generators";
import { getGearPrice, getGrowthSigmoid, getShieldRanges } from "@neverquest/utilities/getters";

export function ShieldOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const [{ shield: craftedShield }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const shieldcraftValue = useRecoilValue(skills("shieldcraft"));
  const stageValue = useRecoilValue(stage);

  const [shieldClass, setShieldClass] = useState<ShieldClass>("small");
  const [shieldLevel, setShieldLevel] = useState(stageValue);

  const factor = getGrowthSigmoid(shieldLevel);
  const maximumShieldLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);
  const { block, stagger, staminaCost, weight } = getShieldRanges({
    factor,
    gearClass: shieldClass,
  });

  const handleCraft = () =>
    setBlacksmithInventory((current) => ({
      ...current,
      shield: generateShield({
        allowNSFW: allowNSFWValue,
        gearClass: shieldClass,
        hasPrefix: true,
        hasSuffix: Math.random() <= getGrowthSigmoid(shieldLevel),
        level: shieldLevel,
        tags:
          shieldLevel <= stageValue - GEAR_LEVEL_RANGE_MAXIMUM
            ? ["lowQuality"]
            : shieldLevel === maximumShieldLevel
            ? ["highQuality"]
            : undefined,
      }),
    }));
  const handleTransfer = () => setBlacksmithInventory((current) => ({ ...current, shield: null }));

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <IconDisplay
          contents={
            <FormControl
              max={maximumShieldLevel}
              min={1}
              onChange={({ target: { value } }) => {
                if (!value) {
                  return;
                }

                const parsedValue = Number.parseInt(value);

                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumShieldLevel) {
                  return;
                }

                setShieldLevel(parsedValue);
              }}
              type="number"
              value={formatValue({ value: shieldLevel })}
            />
          }
          Icon={IconGearLevel}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setShieldClass(value as ShieldClass)}
              value={shieldClass}
            >
              {SHIELD_CLASS_TYPES.map((current) => (
                <option key={current} value={current}>
                  {capitalizeAll(current)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={SHIELD_SPECIFICATIONS[shieldClass].Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${formatValue({ format: "percentage", value: block.minimum })}-${formatValue({
            format: "percentage",
            value: block.maximum,
          })}`}
          Icon={IconBlock}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Block chance"
        />

        {stagger !== null && (
          <IconDisplay
            contents={
              shieldcraftValue
                ? `${formatValue({ format: "percentage", value: stagger.minimum })}-${formatValue({
                    format: "percentage",
                    value: stagger.maximum,
                  })}`
                : LABEL_UNKNOWN
            }
            Icon={shieldcraftValue ? IconStagger : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={shieldcraftValue ? "Stagger chance" : LABEL_UNKNOWN}
          />
        )}

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

      {!shieldcraftValue && shieldClass === "tower" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedShield === null ? (
        <CraftGear
          onCraft={handleCraft}
          price={getGearPrice({
            factor,
            ...SHIELD_SPECIFICATIONS[shieldClass],
          })}
        />
      ) : (
        <CraftedGear gearItem={craftedShield} onTransfer={handleTransfer} />
      )}
    </Stack>
  );
}
