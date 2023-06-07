import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { isShowing } from "@neverquest/state/isShowing";
import type { ComparisonProps } from "@neverquest/types/props";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";

export function WeightDetail({
  comparison = null,
  weight,
}: {
  comparison?: ComparisonProps;
  weight: number;
}) {
  const isShowingWeight = useRecoilValue(isShowing("weight"));

  return (
    <tr>
      {isShowingWeight ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

          <td>
            <IconImage Icon={IconEncumbrance} size="tiny" />
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
