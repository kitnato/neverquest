import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";
import type { ComparisonProps } from "@neverquest/types/props";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";

export function StaminaCostDetail({
  comparison,
  cost,
}: {
  comparison: ComparisonProps;
  cost: number;
}) {
  const isShowingStamina = useRecoilValue(isShowing("stamina"));

  return (
    <tr>
      {isShowingStamina ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

          <td>
            <IconImage Icon={IconStamina} size="tiny" />
            &nbsp;{cost}
            {comparison !== null && (
              <GearComparison
                difference={cost - comparison.subtrahend}
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
