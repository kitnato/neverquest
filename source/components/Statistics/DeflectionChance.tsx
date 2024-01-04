import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { INOCULATED_DEFLECTION_BASE } from "@neverquest/data/traits";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconInoculated from "@neverquest/icons/inoculated.svg?react";
import { armor } from "@neverquest/state/gear";
import { deflectionChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function DeflectionChance() {
  const { deflection } = useRecoilValue(armor);
  const deflectionChanceValue = useRecoilValue(deflectionChance);
  const isTraitAcquiredInoculated = useRecoilValue(isTraitAcquired("inoculated"));

  const isEmpty = deflectionChanceValue === 0;

  useDeltaText({
    delta: "deflectionChance",
    format: "percentage",
    state: deflectionChance,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
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
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Armor:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconDeflection} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ format: "percentage", value: deflection })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td>
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
            <span>{formatNumber({ format: "percentage", value: deflectionChanceValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="deflectionChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
