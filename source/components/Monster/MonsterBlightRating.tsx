import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_MAXIMUM,
  PERCENTAGE_POINTS,
} from "@neverquest/data/general";
import IconBlight from "@neverquest/icons/blight.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { blightChance } from "@neverquest/state/monster";
import { blightAmount, isPoisoned } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterBlightRating() {
  const blightAmountValue = useRecoilValue(blightAmount);
  const blightChanceValue = useRecoilValue(blightChance);
  const isPoisonedValue = useRecoilValue(isPoisoned);

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
              <PopoverHeader className="text-center">
                <span>Blight rating details</span>
              </PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>Chance:</span>
                    </td>

                    <td>
                      <span>
                        {formatNumber({ format: "percentage", value: blightChanceValue })}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>Effect:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>{-formatNumber({ value: blightAmountValue })}</span>

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
          trigger={isPoisonedValue ? ["focus", "hover"] : []}
        >
          <span>
            {isPoisonedValue
              ? formatNumber({ value: blightChanceValue * blightAmountValue * PERCENTAGE_POINTS })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
