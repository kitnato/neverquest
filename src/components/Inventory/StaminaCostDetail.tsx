import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/internal";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";
import type { ComparisonProps } from "@neverquest/types/props";

export function StaminaCostDetail({
  comparison,
  cost,
}: {
  comparison: ComparisonProps;
  cost: number;
}) {
  const isShowingStamina = useRecoilValue(isShowing(Showing.Stamina));

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
