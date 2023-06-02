import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { BLACKSMITH_GEAR_LEVEL_MAXIMUM } from "@neverquest/data/caravan";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconClass } from "@neverquest/icons/gear-class.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { type ShieldClass, ShieldClasses } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { Showing, Skill } from "@neverquest/types/enums";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";
import { generateShield } from "@neverquest/utilities/generators";

export function ShieldOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { shield: craftedShield } = useRecoilValue(blacksmithInventory);
  const stageValue = useRecoilValue(stage);

  const [shieldClass, setShieldClass] = useState<ShieldClass>("small");
  const [shieldLevel, setShieldLevel] = useState(stageValue);

  const isShowingStagger = useRecoilValue(isShowing(Showing.Stagger));
  const skillShieldcraft = useRecoilValue(skills(Skill.Shieldcraft));

  const shield = generateShield({
    allowNSFW: allowNSFWValue,
    gearClass: shieldClass,
    hasPrefix: true,
    hasSuffix: true,
    level: shieldLevel,
  });
  const { ranges, stagger, staminaCost, weight } = shield;
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
              {ShieldClasses.map((shieldClass) => (
                <option key={shieldClass} value={shieldClass}>
                  {capitalizeAll(shieldClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={IconClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${formatPercentage(ranges.block.minimum)}-${formatPercentage(
            ranges.block.maximum
          )}`}
          Icon={IconBlock}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Block chance"
        />

        <IconDisplay
          contents={isShowingStagger ? formatPercentage(stagger) : LABEL_UNKNOWN}
          Icon={isShowingStagger ? IconStamina : IconUnknown}
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
