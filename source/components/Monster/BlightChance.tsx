import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY, LABEL_MAXIMUM, POPOVER_TRIGGER } from "@neverquest/data/general";
import { BLIGHT } from "@neverquest/data/monster";
import IconBlightChance from "@neverquest/icons/blight-chance.svg?react";
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react";
import IconPoisoned from "@neverquest/icons/poisoned.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { blightChance } from "@neverquest/state/monster";
import { isPoisoned } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function BlightChance() {
  const blightChanceValue = useRecoilValue(blightChance);
  const isPoisonedValue = useRecoilValue(isPoisoned);

  const { increment } = BLIGHT;

  if (blightChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBlightChance}
        tooltip="Blight chance"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td>
                      <span>Chance:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>
                          {formatNumber({ format: "percentage", value: blightChanceValue })}&nbsp;on
                        </span>

                        <IconDisplay
                          Icon={IconMonsterAttackRate}
                          iconProps={{ className: "small" }}
                        >
                          <Stack direction="horizontal" gap={1}>
                            <span>while</span>

                            <IconDisplay Icon={IconPoisoned} iconProps={{ className: "small" }}>
                              <span>poisoned</span>
                            </IconDisplay>
                          </Stack>
                        </IconDisplay>
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Effect:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>-{formatNumber({ format: "percentage", value: increment })}</span>

                        <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                          <span>{LABEL_MAXIMUM} increments</span>
                        </IconDisplay>
                      </Stack>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isPoisonedValue ? POPOVER_TRIGGER : []}
        >
          <span>
            {isPoisonedValue
              ? formatNumber({
                  format: "percentage",
                  value: blightChanceValue,
                })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
