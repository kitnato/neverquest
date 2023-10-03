import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { isShowing } from "@neverquest/state/isShowing";
import type { ComparisonProps } from "@neverquest/types/props";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function WeightDetail({
  comparison = null,
  stack,
  weight,
}: {
  comparison?: ComparisonProps;
  stack?: number;
  weight: number;
}) {
  const isShowingWeight = useRecoilValue(isShowing("weight"));

  return (
    <tr>
      {isShowingWeight ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

          <td>
            <Stack direction="horizontal" gap={1}>
              <IconImage Icon={IconEncumbrance} size="small" />

              {formatValue({ value: weight })}

              {comparison !== null && (
                <GearComparison
                  difference={weight - comparison.subtrahend}
                  isDownPositive
                  showing={comparison.showing}
                />
              )}

              {stack !== undefined && stack > 1 && (
                <>{`(${formatValue({ value: weight * stack })})`}</>
              )}
            </Stack>
          </td>
        </>
      ) : (
        <td className="text-end">{LABEL_UNKNOWN}</td>
      )}
    </tr>
  );
}
