import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";
import type { ComparisonProps } from "@neverquest/types/props";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

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
            &nbsp;{formatValue({ value: cost })}
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
