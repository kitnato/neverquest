import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { hasKnapsack } from "@neverquest/state/inventory";
import type { ComparisonProps } from "@neverquest/types/props";

export function WeightDetail({
  comparison = null,
  weight,
}: {
  comparison?: ComparisonProps;
  weight: number;
}) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);

  return (
    <tr>
      {hasKnapsackValue ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

          <td>
            <IconImage Icon={IconEncumbrance} isSmall />
            &nbsp;{weight}
            {comparison !== null && (
              <GearComparison
                difference={weight - comparison.subtrahend}
                isDownPositive
                showingType={comparison.showingType}
              />
            )}
          </td>
        </>
      ) : (
        <td className="text-end">{LABEL_UNKNOWN}</td>
      )}
    </tr>
  );
}
