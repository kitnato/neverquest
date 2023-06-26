import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { BLACKSMITH_GEAR_LEVEL_MAXIMUM } from "@neverquest/data/caravan";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconDodgePenalty } from "@neverquest/icons/dodge-penalty.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconClass } from "@neverquest/icons/gear-class.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconArmorProtection } from "@neverquest/icons/protection.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ARMOR_CLASSES, type ArmorClass } from "@neverquest/LOCRA/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";
import { generateArmor } from "@neverquest/utilities/generators";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ArmorOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { armor: craftedArmor } = useRecoilValue(blacksmithInventory);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const skillArmorcraft = useRecoilValue(skills("armorcraft"));
  const stageValue = useRecoilValue(stage);

  const [armorClass, setArmorClass] = useState<ArmorClass>("hide");
  const [armorLevel, setArmorLevel] = useState(stageValue);

  const armor = generateArmor({
    allowNSFW: allowNSFWValue,
    gearClass: armorClass,
    hasPrefix: true,
    hasSuffix: Math.random() < getGrowthSigmoid(armorLevel),
    level: armorLevel,
  });
  const { deflection, protection, ranges, staminaCost, weight } = armor;
  const maximumArmorLevel = stageValue + BLACKSMITH_GEAR_LEVEL_MAXIMUM;

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
              {ARMOR_CLASSES.map((armorClass) => (
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

        {deflection > 0 && (
          <IconDisplay
            contents={
              isShowingDeflection
                ? `${formatPercentage(ranges.deflection.minimum)}-${formatPercentage(
                    ranges.deflection.maximum
                  )}`
                : LABEL_UNKNOWN
            }
            Icon={isShowingDeflection ? IconDeflection : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDeflection ? "Deflection chance" : LABEL_UNKNOWN}
          />
        )}

        {staminaCost > 0 && (
          <IconDisplay
            contents={
              isShowingDodge ? <DodgePenaltyContents staminaCost={staminaCost} /> : LABEL_UNKNOWN
            }
            Icon={isShowingDodge ? IconDodgePenalty : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDodge ? "Dodge penalty" : LABEL_UNKNOWN}
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

      {!skillArmorcraft && armorClass === "plate" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedArmor === null ? (
        <CraftGear gear={armor} />
      ) : (
        <CraftedGear gear={craftedArmor} />
      )}
    </>
  );
}
