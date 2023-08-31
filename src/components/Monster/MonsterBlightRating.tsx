import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconBlightRating } from "@neverquest/icons/blight-rating.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { monsterBlightChance } from "@neverquest/state/monster";
import { blightIncrement, isPoisoned } from "@neverquest/state/reserves";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_MAXIMUM,
} from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function MonsterBlightRating() {
  const blightIncrementValue = useRecoilValue(blightIncrement);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const monsterBlightChanceValue = useRecoilValue(monsterBlightChance);

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
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>{formatPercentage(monsterBlightChanceValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      {-blightIncrementValue}&nbsp;
                      <IconImage Icon={IconStamina} size="tiny" />
                      &nbsp;{LABEL_MAXIMUM}
                    </td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            {isPoisonedValue
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
