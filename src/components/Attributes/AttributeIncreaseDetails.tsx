import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { ownedItem } from "@neverquest/state/items";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

const STATISTIC_ICON: Record<Attribute, SVGIcon> = {
  agility: IconDodge,
  dexterity: IconCriticalChance,
  endurance: IconStamina,
  fortitude: IconRegenerationAmount,
  perception: IconCriticalDamage,
  speed: IconAttackRate,
  strength: IconDamage,
  vigor: IconRegenerationRate,
  vitality: IconHealth,
};

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));

  const { increment, powerBonus } = ATTRIBUTES[attribute];
  const Icon = STATISTIC_ICON[attribute];
  const operand = ["speed", "vigor"].includes(attribute) ? "-" : "+";

  return (
    <>
      <Stack className="justify-content-center" direction="horizontal" gap={1}>
        <IconImage Icon={Icon} size="small" />

        {`${operand}${
          increment < 1
            ? formatNumber({ decimals: 0, format: "percentage", value: increment })
            : increment
        }`}
      </Stack>

      {hasTomeOfPower && (
        <Stack className="justify-content-center" direction="horizontal" gap={1}>
          <IconImage Icon={IconTomeOfPower} size="small" />

          {`+${formatNumber({ format: "percentage", value: powerBonus })}`}
        </Stack>
      )}
    </>
  );
}
