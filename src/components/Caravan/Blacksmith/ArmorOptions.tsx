import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconDodgePenalty from "@neverquest/icons/dodge-penalty.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconArmorProtection from "@neverquest/icons/protection.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { ARMOR_CLASS_TYPES, type ArmorClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateArmor } from "@neverquest/utilities/generators";
import {
  getArmorRanges,
  getGearPrice,
  getGrowthSigmoid,
  getNameStructure,
} from "@neverquest/utilities/getters";

export function ArmorOptions() {
  const [{ armor: craftedArmor }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const armorcraftValue = useRecoilValue(isSkillAcquired("armorcraft"));
  const stageValue = useRecoilValue(stage);

  const [armorClass, setArmorClass] = useState<ArmorClass>("light");
  const [armorLevel, setArmorLevel] = useState(stageValue);

  const factor = getGrowthSigmoid(armorLevel);
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass: armorClass,
  });
  const maximumArmorLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel state={[armorLevel, setArmorLevel]} />

        <IconDisplay
          Icon={ARMOR_SPECIFICATIONS[armorClass].Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        >
          <FormSelect
            onChange={({ target: { value } }) => setArmorClass(value as ArmorClass)}
            value={armorClass}
          >
            {ARMOR_CLASS_TYPES.map((current) => (
              <option key={current} value={current}>
                {capitalizeAll(current)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        <IconDisplay
          Icon={IconArmorProtection}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Protection"
        >{`${formatNumber({ value: protection.minimum })}-${formatNumber({
          value: protection.maximum,
        })}`}</IconDisplay>

        {deflection !== null && (
          <IconDisplay
            Icon={armorcraftValue ? IconDeflection : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={armorcraftValue ? "Deflection chance" : LABEL_UNKNOWN}
          >
            {armorcraftValue
              ? `${formatNumber({
                  format: "percentage",
                  value: deflection.minimum,
                })}-${formatNumber({ format: "percentage", value: deflection.maximum })}`
              : LABEL_UNKNOWN}
          </IconDisplay>
        )}

        {staminaCost !== 0 && (
          <IconDisplay
            Icon={isShowingDodge ? IconDodgePenalty : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDodge ? "Dodge penalty" : LABEL_UNKNOWN}
          >
            {isShowingDodge ? <DodgePenaltyContents staminaCost={staminaCost} /> : LABEL_UNKNOWN}
          </IconDisplay>
        )}

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >{`${formatNumber({ value: weight.minimum })}-${formatNumber({
          value: weight.maximum,
        })}`}</IconDisplay>
      </Stack>

      <hr />

      {!armorcraftValue && armorClass === "heavy" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedArmor === null ? (
        <CraftGear
          onCraft={() =>
            setBlacksmithInventory((current) => ({
              ...current,
              armor: generateArmor({
                allowNSFW: allowNSFWValue,
                gearClass: armorClass,
                level: armorLevel,
                nameStructure: getNameStructure(),
                prefixTags:
                  armorLevel <= stageValue - GEAR_LEVEL_RANGE_MAXIMUM
                    ? ["lowQuality"]
                    : armorLevel === maximumArmorLevel
                    ? ["highQuality"]
                    : undefined,
              }),
            }))
          }
          price={getGearPrice({
            factor,
            ...ARMOR_SPECIFICATIONS[armorClass],
          })}
        />
      ) : (
        <CraftedGear
          gearItem={craftedArmor}
          onTransfer={() => setBlacksmithInventory((current) => ({ ...current, armor: null }))}
        />
      )}
    </Stack>
  );
}
