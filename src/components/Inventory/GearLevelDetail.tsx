import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import IconGearLevel from "@neverquest/icons/gear-level.svg?react";
import { showGearLevel } from "@neverquest/state/settings";
import type { ComparisonProps } from "@neverquest/types/props";
import { formatValue } from "@neverquest/utilities/formatters";

export function GearLevelDetail({
  comparison,
  level,
}: {
  comparison: ComparisonProps;
  level: number;
}) {
  const showGearLevelValue = useRecoilValue(showGearLevel);

  if (level === 0 || !showGearLevelValue) {
    return null;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

      <td>
        <Stack direction="horizontal" gap={1}>
          <IconImage Icon={IconGearLevel} size="small" />

          {formatValue({ value: level })}

          {comparison !== null && (
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
