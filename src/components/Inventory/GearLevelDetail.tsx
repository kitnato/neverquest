import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { showGearLevel } from "@neverquest/state/settings";
import type { ComparisonProps } from "@neverquest/types/props";

export function GearLevelDetail({
  comparison,
  level,
}: {
  comparison: ComparisonProps;
  level: number;
}) {
  const showGearLevelValue = useRecoilValue(showGearLevel);

  if (!showGearLevelValue) {
    return null;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

      <td>
        <IconImage Icon={IconGearLevel} size="tiny" />
        &nbsp;{level}
        {comparison !== null && (
          <GearComparison
            difference={level - comparison.subtrahend}
            showingType={comparison.showingType}
          />
        )}
      </td>
    </tr>
  );
}
