import { SHIELD_CLASS_TYPES, type ShieldClass } from "@kitnato/locran/build/types";
import { useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/CraftGear";
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_RANGE_MAXIMUM, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import IconBlock from "@neverquest/icons/block.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconStaggerChance from "@neverquest/icons/stagger-chance.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stageMaximum } from "@neverquest/state/encounter";
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
  const [{ shield: craftedShield }, setBlacksmithInventory] = useRecoilState(blacksmithInventory);
  const isSkillAcquiredShieldcraft = useRecoilValue(isSkillAcquired("shieldcraft"));
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const [shieldClass, setShieldClass] = useState<ShieldClass>("small");
  const [shieldLevel, setShieldLevel] = useState(Math.min(stageMaximumValue, LEVELLING_MAXIMUM));

  const factor = getSigmoid(shieldLevel);
  const maximumShieldLevel = Math.min(
    stageMaximumValue + GEAR_LEVEL_RANGE_MAXIMUM,
    LEVELLING_MAXIMUM,
  );
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
            Icon={isSkillAcquiredShieldcraft ? IconStaggerChance : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isSkillAcquiredShieldcraft ? "Stagger chance" : LABEL_UNKNOWN}
          >
            {isSkillAcquiredShieldcraft
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
          <span>
            {formatNumber({ value: burden.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              value: burden.maximum,
            })}
          </span>
        </IconDisplay>

        <IconDisplay
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        >
          <span>
            {formatNumber({ value: weight.minimum })}&nbsp;-&nbsp;
            {formatNumber({
              value: weight.maximum,
            })}
          </span>
        </IconDisplay>
      </Stack>

      <hr />

      {!isSkillAcquiredShieldcraft && shieldClass === "tower" ? (
        <span className="fst-italic text-center">{LABEL_SKILL_REQUIRED}</span>
      ) : craftedShield === undefined ? (
        <CraftGear
          onCraft={() => {
            setBlacksmithInventory((currentBlacksmithInventory) => ({
              ...currentBlacksmithInventory,
              shield: generateShield({
                affixStructure: getAffixStructure(),
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
