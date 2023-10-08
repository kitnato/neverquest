import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconCriticalChance } from "@neverquest/icons/critical-chance.svg";
import { ReactComponent as IconCriticalDamage } from "@neverquest/icons/critical-damage.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconRegenerationAmount } from "@neverquest/icons/regeneration-amount.svg";
import { ReactComponent as IconRegenerationRate } from "@neverquest/icons/regeneration-rate.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ownedItem } from "@neverquest/state/items";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

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
  const formattedIncrement =
    increment < 1 ? formatValue({ format: "percentage", value: increment }) : increment;
  const operand = ["speed", "vigor"].includes(attribute) ? "-" : "+";

  return (
    <>
      <Stack className="justify-content-center" direction="horizontal" gap={1}>
        <IconImage Icon={Icon} size="small" />

        <span>{`${operand}${formattedIncrement}`}</span>
      </Stack>

      {hasTomeOfPower && (
        <Stack className="justify-content-center" direction="horizontal" gap={1}>
          <IconImage Icon={IconTomeOfPower} size="small" />

          {`+${formatValue({ format: "percentage", value: powerBonus })}`}
        </Stack>
      )}
    </>
  );
}
