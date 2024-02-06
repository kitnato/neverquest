import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBlockChance from "@neverquest/icons/block-chance.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { shield } from "@neverquest/state/gear";
import { blockChance } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function BlockChance() {
  const blockChanceValue = useRecoilValue(blockChance);
  const shieldValue = useRecoilValue(shield);

  useDeltaText({
    delta: "blockChance",
    format: "percentage",
    state: blockChance,
  });

  if (blockChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBlockChance}
        tooltip="Total block chance"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
                          <span>On block:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                          <span>-{formatNumber({ value: shieldValue.burden })}</span>
                        </IconDisplay>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ format: "percentage", value: blockChanceValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="blockChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
