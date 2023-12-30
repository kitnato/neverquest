import { ARMOR_CLASS_TYPES, type ArmorClass } from "@kitnato/locran/build/types";
import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import { ARMOR_SPECIFICATIONS, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/gear";
import { GROWTH_MAXIMUM, LABEL_TRAINING_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconDodgePenalty from "@neverquest/icons/dodge-penalty.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconArmorProtection from "@neverquest/icons/protection.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowProfanity } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateArmor } from "@neverquest/utilities/generators";
import {
  getAffixStructure,
  getArmorRanges,
  getGearPrice,
  getSigmoid,
} from "@neverquest/utilities/getters";

export function ArmorOptions() {
  const [{ armor: craftedArmor }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const allowProfanityValue = useRecoilValue(allowProfanity);
  const isShowingDodgeChance = useRecoilValue(isShowing("dodgeChance"));
  const armorcraftValue = useRecoilValue(isSkillAcquired("armorcraft"));
  const stageValue = useRecoilValue(stage);

  const [armorClass, setArmorClass] = useState<ArmorClass>("light");
  const [armorLevel, setArmorLevel] = useState(Math.min(stageValue, GROWTH_MAXIMUM));

  const progressQuest = useProgressQuest();

  const factor = getSigmoid(armorLevel);
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass: armorClass,
  });
  const maximumArmorLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GROWTH_MAXIMUM);

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel maximum={maximumArmorLevel} state={[armorLevel, setArmorLevel]} />

        <IconDisplay
          Icon={ARMOR_SPECIFICATIONS[armorClass].Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        >
          <FormSelect
            onChange={({ target: { value } }) => {
              setArmorClass(value as ArmorClass);
            }}
            value={armorClass}
          >
            {ARMOR_CLASS_TYPES.map((currentArmorClass) => (
              <option key={currentArmorClass} value={currentArmorClass}>
                {capitalizeAll(currentArmorClass)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        <IconDisplay
          Icon={IconArmorProtection}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Protection"
        >
          {formatNumber({ value: protection.minimum })}&nbsp;-&nbsp;
          {formatNumber({
            value: protection.maximum,
          })}
        </IconDisplay>

        {deflection !== undefined && (
          <IconDisplay
            Icon={armorcraftValue ? IconDeflection : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={armorcraftValue ? "Deflection chance" : LABEL_UNKNOWN}
          >
            {armorcraftValue
              ? `${formatNumber({
                  format: "percentage",
                  value: deflection.minimum,
                })} - ${formatNumber({ format: "percentage", value: deflection.maximum })}`
              : LABEL_UNKNOWN}
          </IconDisplay>
        )}

        {staminaCost !== 0 && (
          <IconDisplay
            Icon={isShowingDodgeChance ? IconDodgePenalty : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDodgeChance ? "Dodge penalty" : LABEL_UNKNOWN}
          >
            {isShowingDodgeChance ? (
              <DodgePenaltyContents staminaCost={staminaCost} />
            ) : (
              LABEL_UNKNOWN
            )}
          </IconDisplay>
        )}

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >
          {formatNumber({ value: weight.minimum })}&nbsp;-&nbsp;
          {formatNumber({
            value: weight.maximum,
          })}
        </IconDisplay>
      </Stack>

      <hr />

      {!armorcraftValue && armorClass === "heavy" ? (
        <span className="fst-italic text-center">{LABEL_TRAINING_REQUIRED}</span>
      ) : craftedArmor === undefined ? (
        <CraftGear
          onCraft={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              armor: generateArmor({
                affixStructure: getAffixStructure(),
                allowProfanity: allowProfanityValue,
                gearClass: armorClass,
                level: armorLevel,
                prefixTags:
                  armorLevel <= maximumArmorLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
                    ? ["lowQuality"]
                    : armorLevel === maximumArmorLevel
                      ? ["highQuality"]
                      : undefined,
              }),
            }));

            progressQuest({ quest: "crafting" });
          }}
          price={getGearPrice({
            factor,
            ...ARMOR_SPECIFICATIONS[armorClass],
          })}
        />
      ) : (
        <CraftedGear
          gearItem={craftedArmor}
          onTransfer={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              armor: undefined,
            }));
          }}
        />
      )}
    </Stack>
  );
}
