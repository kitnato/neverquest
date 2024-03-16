import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { GearComparison } from "@neverquest/components/Inventory/GearComparison"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import IconBurden from "@neverquest/icons/burden.svg?react"
import { isShowing } from "@neverquest/state/ui"
import type { Comparison } from "@neverquest/types/components"
import { formatNumber } from "@neverquest/utilities/formatters"

export function BurdenDetail({ burden, comparison }: { burden: number; comparison: Comparison }) {
  const isShowingStamina = useRecoilValue(isShowing(`stamina`))

  if (burden > 0) {
    return (
      <tr>
        {isShowingStamina ? (
          <>
            <td>
              <span>Burden:</span>
            </td>

            <td>
              <Stack direction="horizontal" gap={1}>
                <IconDisplay Icon={IconBurden} iconProps={{ className: `small` }}>
                  <span>{formatNumber({ value: burden })}</span>
                </IconDisplay>

                {comparison !== false && (
                  <GearComparison
                    difference={burden - comparison.subtrahend}
                    lowerIsPositive
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
    )
  }
}
