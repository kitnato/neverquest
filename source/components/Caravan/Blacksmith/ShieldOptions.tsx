import { SHIELD_CLASS_TYPES, type ShieldClass } from "@kitnato/locran/build/types";
import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_RANGE_MAXIMUM, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { GROWTH_MAXIMUM, LABEL_TRAINING_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general";
import IconBlock from "@neverquest/icons/block.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconStagger from "@neverquest/icons/stagger.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { generateShield } from "@neverquest/utilities/generators";
import {
  getAffixStructure,
  getFromRange,
  getShieldRanges,
  getSigmoid,
} from "@neverquest/utilities/getters";

export function ShieldOptions() {
  const allowProfanityValue = useRecoilValue(allowProfanity);
  const [{ shield: craftedShield }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const shieldcraftValue = useRecoilValue(isSkillAcquired("shieldcraft"));
  const stageValue = useRecoilValue(stage);

  const [shieldClass, setShieldClass] = useState<ShieldClass>("small");
  const [shieldLevel, setShieldLevel] = useState(Math.min(stageValue, GROWTH_MAXIMUM));

  const factor = getSigmoid(shieldLevel);
  const maximumShieldLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GROWTH_MAXIMUM);
  const { block, burden, stagger, weight } = getShieldRanges({
    factor,
    gearClass: shieldClass,
  });

  return (
    <Stack className="mx-auto w-50">
      <Stack className="mx-auto" gap={3}>
        <SetGearLevel maximum={maximumShieldLevel} state={[shieldLevel, setShieldLevel]} />

        <IconDisplay
          Icon={SHIELD_SPECIFICATIONS[shieldClass].Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        >
          <FormSelect
            onChange={({ target: { value } }) => {
              setShieldClass(value as ShieldClass);
            }}
            value={shieldClass}
          >
            {SHIELD_CLASS_TYPES.map((currentShieldClass) => (
              <option key={currentShieldClass} value={currentShieldClass}>
                {capitalizeAll(currentShieldClass)}
              </option>
            ))}
          </FormSelect>
        </IconDisplay>

        <IconDisplay
          Icon={IconBlock}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Block chance"
        >
          {formatNumber({ format: "percentage", value: block.minimum })}&nbsp;-&nbsp;
          {formatNumber({
            format: "percentage",
            value: block.maximum,
          })}
        </IconDisplay>

        {stagger !== undefined && (
          <IconDisplay
            Icon={shieldcraftValue ? IconStagger : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={shieldcraftValue ? "Stagger chance" : LABEL_UNKNOWN}
          >
            {shieldcraftValue
              ? `${formatNumber({ format: "percentage", value: stagger.minimum })} - ${formatNumber(
                  {
                    format: "percentage",
                    value: stagger.maximum,
                  },
                )}`
              : LABEL_UNKNOWN}
          </IconDisplay>
        )}

        <IconDisplay Icon={IconBurden} iconProps={{ overlayPlacement: "left" }} tooltip="Burden">
          {formatNumber({ value: burden.minimum })}&nbsp;-&nbsp;
          {formatNumber({
            value: burden.maximum,
          })}
        </IconDisplay>

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

      {!shieldcraftValue && shieldClass === "tower" ? (
        <span className="fst-italic text-center">{LABEL_TRAINING_REQUIRED}</span>
      ) : craftedShield === undefined ? (
        <CraftGear
          onCraft={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              shield: generateShield({
                affixStructure: getAffixStructure(),
                allowProfanity: allowProfanityValue,
                gearClass: shieldClass,
                level: shieldLevel,
                prefixTags:
                  shieldLevel <= maximumShieldLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
                    ? ["lowQuality"]
                    : shieldLevel === maximumShieldLevel
                      ? ["highQuality"]
                      : undefined,
              }),
            }));
          }}
          price={Math.round(
            getFromRange({
              factor,
              ...SHIELD_SPECIFICATIONS[shieldClass].price,
            }),
          )}
        />
      ) : (
        <CraftedGear
          gearItem={craftedShield}
          onTransfer={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              shield: undefined,
            }));
          }}
        />
      )}
    </Stack>
  );
}
