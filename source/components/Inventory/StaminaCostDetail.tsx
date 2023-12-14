import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import type { Comparison } from "@neverquest/types/components";
import { formatNumber } from "@neverquest/utilities/formatters";

export function StaminaCostDetail({ comparison, cost }: { comparison: Comparison; cost: number }) {
  const isShowingStamina = useRecoilValue(isShowing("stamina"));

  return (
    <tr>
      {isShowingStamina ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>
            <span>Stamina cost:</span>
          </td>

          <td>
            <Stack direction="horizontal" gap={1}>
              <IconImage className="small" Icon={IconStamina} />

              <span>{formatNumber({ value: cost })}</span>

              {comparison !== false && (
                <GearComparison
                  difference={cost - comparison.subtrahend}
                  isDownPositive
                  showing={comparison.showing}
                />
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
