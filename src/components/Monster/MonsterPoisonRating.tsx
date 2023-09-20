import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconPoison } from "@neverquest/icons/poison.svg";
import {
  monsterPoisonChance,
  monsterPoisonLength,
  monsterPoisonMagnitude,
} from "@neverquest/state/monster";
import { CLASS_TABLE_CELL_ITALIC, LABEL_MAXIMUM } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

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
              <Popover.Header className="text-center">Poison rating details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>{formatPercentage(monsterPoisonChanceValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      {`-${formatPercentage(monsterPoisonMagnitudeValue)}`}&nbsp;
                      <IconImage Icon={IconHealth} size="tiny" />
                      &nbsp;{LABEL_MAXIMUM}
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatTime(monsterPoisonLengthValue)}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            {Math.round(
              monsterPoisonChanceValue * monsterPoisonMagnitudeValue * monsterPoisonLengthValue,
            )}
          </span>
        </OverlayTrigger>
      }
      Icon={IconPoison}
      isAnimated
      tooltip="Poison rating"
    />
  );
}
