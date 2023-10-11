import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_MAXIMUM } from "@neverquest/data/general";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconPoison } from "@neverquest/icons/poison.svg";
import {
  monsterPoisonChance,
  monsterPoisonLength,
  monsterPoisonMagnitude,
} from "@neverquest/state/monster";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterPoisonRating() {
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);
  const monsterPoisonLengthValue = useRecoilValue(monsterPoisonLength);
  const monsterPoisonMagnitudeValue = useRecoilValue(monsterPoisonMagnitude);

  if (monsterPoisonChanceValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Poison rating details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>
                      {formatValue({ format: "percentage", value: monsterPoisonChanceValue })}
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`-${formatValue({
                          format: "percentage",
                          value: monsterPoisonMagnitudeValue,
                        })}`}

                        <IconImage Icon={IconHealth} size="small" />

                        {LABEL_MAXIMUM}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatValue({ format: "time", value: monsterPoisonLengthValue })}</td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
        >
          <span>
            {formatValue({
              value:
                monsterPoisonChanceValue * monsterPoisonMagnitudeValue * monsterPoisonLengthValue,
            })}
          </span>
        </OverlayTrigger>
      }
      Icon={IconPoison}
      isAnimated
      tooltip="Poison rating"
    />
  );
}
