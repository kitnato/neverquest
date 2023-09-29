import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconBlight } from "@neverquest/icons/blight.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { monsterBlightChance } from "@neverquest/state/monster";
import { blightAmount, isPoisoned } from "@neverquest/state/reserves";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_MAXIMUM,
} from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterBlightRating() {
  const blightAmountValue = useRecoilValue(blightAmount);
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

                    <td>
                      {formatValue({ format: "percentage", value: monsterBlightChanceValue })}
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>
                      {`-${formatValue({ value: blightAmountValue })}`}
                      &nbsp;
                      <IconImage Icon={IconStamina} size="tiny" />
                      &nbsp;{LABEL_MAXIMUM}
                    </td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
          trigger={isPoisonedValue ? ["hover", "focus"] : []}
        >
          <span>
            {isPoisonedValue
              ? formatValue({ value: monsterBlightChanceValue * blightAmountValue * 100 })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      }
      Icon={IconBlight}
      isAnimated
      tooltip="Blight rating"
    />
  );
}
