import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { infusionEffect } from "@neverquest/state/items";
import type { Attribute } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
  const infusionEffectEldritchCodex = useRecoilValue(infusionEffect("eldritch codex"));
  const ownedItemEldritchCodex = useRecoilValue(ownedItem("eldritch codex"));

  const { increment, powerBonus } = ATTRIBUTES[attribute];
  const Icon = {
    agility: IconDodge,
    dexterity: IconCriticalChance,
    endurance: IconStamina,
    fortitude: IconRegenerationAmount,
    perception: IconCriticalDamage,
    speed: IconAttackRate,
    strength: IconDamage,
    vigor: IconRegenerationRate,
    vitality: IconHealth,
  }[attribute];
  const operand = ["speed", "vigor"].includes(attribute) ? "-" : "+";

  return (
    <Stack gap={1}>
      <IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
        <span>
          {operand}

          {increment < 1 ? formatNumber({ format: "percentage", value: increment }) : increment}
        </span>
      </IconDisplay>

      {ownedItemEldritchCodex !== undefined && (
        <IconDisplay Icon={IconEldritchCodex} iconProps={{ className: "small" }}>
          <span>
            +
            {formatNumber({
              format: "percentage",
              value: powerBonus * (1 + infusionEffectEldritchCodex),
            })}
          </span>
        </IconDisplay>
      )}
    </Stack>
  );
}
