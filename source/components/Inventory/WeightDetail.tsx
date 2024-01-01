import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import type { Comparison } from "@neverquest/types/components";
import { formatNumber } from "@neverquest/utilities/formatters";

export function WeightDetail({
  amount,
  comparison,
  weight,
}: {
  amount?: number;
  comparison?: Comparison;
  weight: number;
}) {
  const isShowingWeight = useRecoilValue(isShowing("weight"));

  return (
    <tr>
      {isShowingWeight ? (
        <>
          <td>
            <span>Weight:</span>
          </td>

          <td>
            <Stack direction="horizontal" gap={1}>
              <IconDisplay Icon={IconEncumbrance} iconProps={{ className: "small" }}>
                <span>{formatNumber({ value: weight })}</span>
              </IconDisplay>

              {comparison !== undefined && comparison !== false && (
                <GearComparison
                  difference={weight - comparison.subtrahend}
                  isDownPositive
                  showing={comparison.showing}
                />
              )}

              {amount !== undefined && amount > 1 && (
                <span>{` (${formatNumber({ value: weight * amount })})`}</span>
              )}
            </Stack>
          </td>
        </>
      ) : (
        <td className="text-end">
          <span>{LABEL_UNKNOWN}</span>
        </td>
      )}
    </tr>
  );
}
