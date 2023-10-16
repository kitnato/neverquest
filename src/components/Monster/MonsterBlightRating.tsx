import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { ReactComponent as IconBlight } from "@neverquest/icons/blight.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { blightChance } from "@neverquest/state/monster";
import { blightAmount, isPoisoned } from "@neverquest/state/reserves";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterBlightRating() {
  const blightAmountValue = useRecoilValue(blightAmount);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const monsterBlightChanceValue = useRecoilValue(blightChance);

  if (monsterBlightChanceValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Blight rating details</PopoverHeader>

              <PopoverBody>
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
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconStamina} size="small" />

                        {`-${formatValue({ value: blightAmountValue })}`}
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
