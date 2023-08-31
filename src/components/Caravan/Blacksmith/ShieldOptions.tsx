import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { BLACKSMITH_GEAR_LEVEL_MAXIMUM } from "@neverquest/data/caravan";
import { SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconShieldStagger } from "@neverquest/icons/shield-stagger.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { SHIELD_CLASSES, type ShieldClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";
import { generateShield } from "@neverquest/utilities/generators";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ShieldOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { shield: craftedShield } = useRecoilValue(blacksmithInventory);
  const stageValue = useRecoilValue(stage);

  const [shieldClass, setShieldClass] = useState<ShieldClass>("small");
  const [shieldLevel, setShieldLevel] = useState(stageValue);

  const isShowingStagger = useRecoilValue(isShowing("stagger"));
  const skillShieldcraft = useRecoilValue(skills("shieldcraft"));

  const shield = generateShield({
    allowNSFW: allowNSFWValue,
    gearClass: shieldClass,
    hasPrefix: true,
    hasSuffix: Math.random() <= getGrowthSigmoid(shieldLevel),
    level: shieldLevel,
  });
  const { ranges, stagger, staminaCost, weight } = shield;
  const { Icon } = SHIELD_SPECIFICATIONS[shieldClass];
  const maximumShieldLevel = stageValue + BLACKSMITH_GEAR_LEVEL_MAXIMUM;

  return (
    <>
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
              value={shieldLevel}
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
              {SHIELD_CLASSES.map((shieldClass) => (
                <option key={shieldClass} value={shieldClass}>
                  {capitalizeAll(shieldClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${formatPercentage(ranges.block.minimum)}-${formatPercentage(
            ranges.block.maximum,
          )}`}
          Icon={IconBlock}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Block chance"
        />

        <IconDisplay
          contents={isShowingStagger ? formatPercentage(stagger) : LABEL_UNKNOWN}
          Icon={isShowingStagger ? IconShieldStagger : IconUnknown}
          iconProps={{ overlayPlacement: "left" }}
          tooltip={isShowingStagger ? "Stagger chance" : LABEL_UNKNOWN}
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

      {!skillShieldcraft && shieldClass === "tower" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedShield === null ? (
        <CraftGear gear={shield} />
      ) : (
        <CraftedGear gear={craftedShield} />
      )}
    </>
  );
}
