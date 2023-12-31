import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { INOCULATED_DEFLECTION_BASE } from "@neverquest/data/traits";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconInoculated from "@neverquest/icons/inoculated.svg?react";
import { armor } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { deflectionChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Deflection() {
  const { deflection } = useRecoilValue(armor);
  const deflectionChanceValue = useRecoilValue(deflectionChance);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isTraitAcquiredInoculated = useRecoilValue(isTraitAcquired("inoculated"));

  useDeltaText({
    delta: "deflectionChance",
    format: "percentage",
    state: deflectionChance,
  });

  if (isShowingDeflection) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconDeflection}
        tooltip="Total deflection chance"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Deflection details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Armor:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconDeflection} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ format: "percentage", value: deflection })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconDisplay Icon={IconInoculated} iconProps={{ className: "small" }}>
                          <span>Inoculated:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <span>
                          +
                          {formatNumber({
                            format: "percentage",
                            value: INOCULATED_DEFLECTION_BASE,
                          })}
                        </span>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={isTraitAcquiredInoculated ? ["focus", "hover"] : []}
          >
            <span>
              {deflectionChanceValue === 0
                ? LABEL_EMPTY
                : formatNumber({ format: "percentage", value: deflectionChanceValue })}
            </span>
          </OverlayTrigger>

          <DeltasDisplay delta="deflectionChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
