import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_MAXIMUM } from "@neverquest/data/general";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconPoison from "@neverquest/icons/poison.svg?react";
import { poisonChance } from "@neverquest/state/monster";
import { poisonLength, poisonMagnitude } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterPoisonRating() {
  const poisonChanceValue = useRecoilValue(poisonChance);
  const poisonLengthValue = useRecoilValue(poisonLength);
  const poisonMagnitudeValue = useRecoilValue(poisonMagnitude);

  if (poisonChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconPoison}
        tooltip="Poison rating"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Poison rating details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>{formatNumber({ format: "percentage", value: poisonChanceValue })}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`-${formatNumber({
                          format: "percentage",
                          value: poisonMagnitudeValue,
                        })}`}

                        <IconImage Icon={IconHealth} isSmall />

                        {LABEL_MAXIMUM}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatNumber({ format: "time", value: poisonLengthValue })}</td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
        >
          <span>
            {formatNumber({
              value: poisonChanceValue * poisonMagnitudeValue * poisonLengthValue,
            })}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
