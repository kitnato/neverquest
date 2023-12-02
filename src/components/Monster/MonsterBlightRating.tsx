import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY, LABEL_MAXIMUM } from "@neverquest/data/general";
import IconBlight from "@neverquest/icons/blight.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { blightChance } from "@neverquest/state/monster";
import { blightAmount, isPoisoned } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterBlightRating() {
  const blightAmountValue = useRecoilValue(blightAmount);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const monsterBlightChanceValue = useRecoilValue(blightChance);

  if (monsterBlightChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ name: "flipInX" })}
        Icon={IconBlight}
        tooltip="Blight rating"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Blight rating details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>
                      {formatNumber({ format: "percentage", value: monsterBlightChanceValue })}
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {-formatNumber({ value: blightAmountValue })}

                        <IconImage Icon={IconStamina} isSmall />

                        {LABEL_MAXIMUM}
                      </Stack>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isPoisonedValue ? ["hover", "focus"] : []}
        >
          <span>
            {isPoisonedValue
              ? formatNumber({ value: monsterBlightChanceValue * blightAmountValue * 100 })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
