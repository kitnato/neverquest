import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconBlightRating } from "@neverquest/icons/blight-rating.svg";
import { monsterBlightChance, monsterPoisonChance } from "@neverquest/state/monster";
import { blightIncrement, poisonDuration } from "@neverquest/state/reserves";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function MonsterBlightRating() {
  const blightIncrementValue = useRecoilValue(blightIncrement);
  const poisonDurationValue = useRecoilValue(poisonDuration);
  const monsterBlightChanceValue = useRecoilValue(monsterBlightChance);
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);

  if (monsterBlightChanceValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Blight rating details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance when poisoned:</td>

                    <td>{formatPercentage(monsterBlightChanceValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance of affliction:</td>

                    <td>{formatPercentage(monsterBlightChanceValue * monsterPoisonChanceValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>{`-${blightIncrementValue} stamina per affliction`}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            {poisonDurationValue > 0
              ? Math.round(monsterBlightChanceValue * blightIncrementValue * 100)
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      }
      Icon={IconBlightRating}
      isAnimated
      tooltip="Blight rating"
    />
  );
}
