import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { GEAR_LEVEL_OFFSET, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconDodgePenalty } from "@neverquest/icons/dodge-penalty.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconClass } from "@neverquest/icons/gear-class.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconArmorProtection } from "@neverquest/icons/protection.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { type ArmorClass, ArmorClasses } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";
import { generateArmor } from "@neverquest/utilities/generators";

export function ArmorOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { armor: craftedArmor } = useRecoilValue(blacksmithInventory);
  const levelValue = useRecoilValue(level);

  const [armorClass, setArmorClass] = useState<ArmorClass>("hide");
  const [armorLevel, setArmorLevel] = useState(levelValue);

  const skillArmorsValue = useRecoilValue(skills(SkillType.Armors));
  const skillDodgeValue = useRecoilValue(skills(SkillType.Dodge));

  const armor = generateArmor({
    allowNSFW: allowNSFWValue,
    gearClass: armorClass,
    hasPrefix: true,
    hasSuffix: true,
    level: armorLevel,
  });
  const { deflectionChance, protection, ranges, staminaCost, weight } = armor;
  const maximumArmorLevel = levelValue + GEAR_LEVEL_OFFSET;

  return (
    <>
      <Stack className="mx-auto" gap={3}>
        <IconDisplay
          contents={
            <FormControl
              max={maximumArmorLevel}
              min={1}
              onChange={({ target: { value } }) => {
                if (!value) {
                  return;
                }

                const parsedValue = Number.parseInt(value);

                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumArmorLevel) {
                  return;
                }

                setArmorLevel(parsedValue);
              }}
              type="number"
              value={armorLevel}
            />
          }
          Icon={IconGearLevel}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setArmorClass(value as ArmorClass)}
              value={armorClass}
            >
              {ArmorClasses.map((armorClass) => (
                <option key={armorClass} value={armorClass}>
                  {capitalizeAll(armorClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={IconClass}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={protection}
          Icon={IconArmorProtection}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Protection"
        />

        {deflectionChance > 0 && (
          <IconDisplay
            contents={`${formatPercentage(ranges.deflectionChance.minimum)}-${formatPercentage(
              ranges.deflectionChance.maximum
            )}`}
            Icon={IconDeflection}
            iconProps={{ overlayPlacement: "left" }}
            tooltip="Deflection chance"
          />
        )}

        {staminaCost > 0 && (
          <IconDisplay
            contents={
              skillDodgeValue ? <DodgePenaltyContents staminaCost={staminaCost} /> : LABEL_UNKNOWN
            }
            Icon={skillDodgeValue ? IconDodgePenalty : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={skillDodgeValue ? "Dodge penalty" : LABEL_UNKNOWN}
          />
        )}

        <IconDisplay
          contents={weight}
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {!skillArmorsValue && armorClass === "plate" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedArmor === null ? (
        <CraftGear gear={armor} />
      ) : (
        <CraftedGear gear={craftedArmor} />
      )}
    </>
  );
}
