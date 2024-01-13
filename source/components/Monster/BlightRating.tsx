import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import {
  LABEL_EMPTY,
  LABEL_MAXIMUM,
  PERCENTAGE_POINTS,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { BLIGHT } from "@neverquest/data/monster";
import IconBlight from "@neverquest/icons/blight.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { blightChance } from "@neverquest/state/monster";
import { isPoisoned } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function BlightRating() {
  const blightChanceValue = useRecoilValue(blightChance);
  const isPoisonedValue = useRecoilValue(isPoisoned);

  const { increment } = BLIGHT;

  if (blightChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBlight}
        tooltip="Blight rating"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td>
                      <span>Chance:</span>
                    </td>

                    <td>
                      <span>
                        {formatNumber({ format: "percentage", value: blightChanceValue })}&nbsp;on
                        hit (while poisoned)
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Effect:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>-{formatNumber({ format: "percentage", value: increment })}</span>

                        <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                          <span>{LABEL_MAXIMUM}</span>
                        </IconDisplay>
                      </Stack>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isPoisonedValue ? POPOVER_TRIGGER : []}
        >
          <span>
            {isPoisonedValue
              ? formatNumber({
                  value:
                    blightChanceValue *
                    PERCENTAGE_POINTS *
                    increment *
                    PERCENTAGE_POINTS *
                    PERCENTAGE_POINTS,
                })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
