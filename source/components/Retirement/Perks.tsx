import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react";
import IconMonsterReduction from "@neverquest/icons/monster-reduction.svg?react";
import { stageMaximum } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getPerkEffect } from "@neverquest/utilities/getters";

export function Perks() {
  const stageMaximumValue = useRecoilValue(stageMaximum);

  return (
    <Stack gap={3}>
      <h6>Perks</h6>

      <IconDisplay Icon={IconEssenceBonus} tooltip="Essence loot bonus">
        +
        {formatNumber({
          format: "percentage",
          value: getPerkEffect({ perk: "essenceBonus", stage: stageMaximumValue }),
        })}
      </IconDisplay>

      <IconDisplay
        Icon={IconMonsterReduction}
        iconProps={{ isFlipped: true }}
        tooltip="Monster reduction"
      >
        <span>
          -
          {formatNumber({
            format: "percentage",
            value: getPerkEffect({ perk: "monsterReduction", stage: stageMaximumValue }),
          })}
        </span>
      </IconDisplay>
    </Stack>
  );
}
