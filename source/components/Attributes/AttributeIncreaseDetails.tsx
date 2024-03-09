import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import { attributeRank } from "@neverquest/state/attributes";
import { ownedItem } from "@neverquest/state/inventory";
import { infusionEffect } from "@neverquest/state/items";
import type { Attribute } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
  const attributeRankValue = useRecoilValue(attributeRank(attribute));
  const infusionEffectEldritchCodex = useRecoilValue(infusionEffect("eldritch codex"));
  const ownedItemEldritchCodex = useRecoilValue(ownedItem("eldritch codex"));

  const { descriptionIcons, format, increment, powerBonus, rankBonus } = ATTRIBUTES[attribute];

  return (
    <Stack gap={1}>
      <IconDisplay Icon={descriptionIcons[0]} iconProps={{ className: "small" }}>
        <span>
          {increment > 0 && "+"}

          {formatNumber({
            format,
            value:
              rankBonus === undefined
                ? increment
                : Math.min(increment + rankBonus.increment * attributeRankValue, rankBonus.maximum),
          })}
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
