import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconPoisonRating } from "@neverquest/icons/poison-rating.svg";
import {
  monsterPoisonChance,
  monsterPoisonDuration,
  monsterPoisonMagnitude,
} from "@neverquest/state/monster";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function MonsterPoisonRating() {
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);
  const monsterPoisonDurationValue = useRecoilValue(monsterPoisonDuration);
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

                    <td>{`-${formatPercentage(monsterPoisonMagnitudeValue)} health`}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatMilliseconds(monsterPoisonDurationValue)}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            {Math.round(
              monsterPoisonChanceValue * monsterPoisonMagnitudeValue * monsterPoisonDurationValue
            )}
          </span>
        </OverlayTrigger>
      }
      Icon={IconPoisonRating}
      isAnimated
      tooltip="Poison rating"
    />
  );
}
