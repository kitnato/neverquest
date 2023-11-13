import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import IconGearLevel from "@neverquest/icons/gear-level.svg?react";
import { showGearLevel } from "@neverquest/state/settings";
import type { Comparison } from "@neverquest/types/components";
import { formatNumber } from "@neverquest/utilities/formatters";

export function GearLevelDetail({ comparison, level }: { comparison: Comparison; level: number }) {
  const showGearLevelValue = useRecoilValue(showGearLevel);

  if (level === 0 || !showGearLevelValue) {
    return;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

      <td>
        <Stack direction="horizontal" gap={1}>
          <IconImage Icon={IconGearLevel} size="small" />

          {formatNumber({ value: level })}

          {comparison !== undefined && (
            <GearComparison
              difference={level - comparison.subtrahend}
              showing={comparison.showing}
            />
          )}
        </Stack>
      </td>
    </tr>
  );
}
