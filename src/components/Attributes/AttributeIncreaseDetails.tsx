import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconCriticalChance } from "@neverquest/icons/critical-chance.svg";
import { ReactComponent as IconCriticalDamage } from "@neverquest/icons/critical-damage.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconLootBonus } from "@neverquest/icons/loot-bonus.svg";
import { ReactComponent as IconRegenerationAmount } from "@neverquest/icons/regeneration-amount.svg";
import { ReactComponent as IconRegenerationRate } from "@neverquest/icons/regeneration-rate.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ownedItem } from "@neverquest/state/items";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute } from "@neverquest/types/unions";
import { formatPercentage } from "@neverquest/utilities/formatters";

const STATISTIC_ICON: Record<Attribute, SVGIcon> = {
  agility: IconDodge,
  dexterity: IconCriticalChance,
  endurance: IconStamina,
  fortitude: IconRegenerationAmount,
  luck: IconLootBonus,
  perception: IconCriticalDamage,
  speed: IconAttackRate,
  strength: IconDamage,
  vigor: IconRegenerationRate,
  vitality: IconHealth,
};

export function AttributeIncreaseDetails({ type }: { type: Attribute }) {
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));

  const { increment, powerBonus } = ATTRIBUTES[type];
  const Icon = STATISTIC_ICON[type];
  const formattedIncrement = increment < 1 ? formatPercentage(increment) : increment;
  const operand = ["speed", "vigor"].includes(type) ? "-" : "+";

  return (
    <>
      <div>
        <IconImage Icon={Icon} size="tiny" />
        &nbsp;{operand}
        {formattedIncrement}
      </div>

      {hasTomeOfPower && (
        <div>
          <IconImage Icon={IconPower} size="tiny" />
          &nbsp;{`+${formatPercentage(powerBonus)}`}
        </div>
      )}
    </>
  );
}
