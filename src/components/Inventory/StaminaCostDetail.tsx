import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import type { ComparisonProps } from "@neverquest/types/props";

export function StaminaCostDetail({
  comparison,
  cost,
}: {
  comparison: ComparisonProps;
  cost: number;
}) {
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));

  return (
    <tr>
      {isShowingStamina ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

          <td>
            <IconImage Icon={IconStamina} isSmall />
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
