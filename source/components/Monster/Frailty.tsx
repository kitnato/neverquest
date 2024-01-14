import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { INFUSABLES, TRINKETS } from "@neverquest/data/items";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconFrailty from "@neverquest/icons/frailty.svg?react";
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { frailty } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Frailty() {
  const frailtyValue = useRecoilValue(frailty);
  const ownedItemFamiliar = useRecoilValue(ownedItem("familiar"));

  const { Icon } =
    ownedItemFamiliar === undefined ? INFUSABLES["mysterious egg"] : TRINKETS.familiar;
  const formattedValue = formatNumber({ format: "percentage", value: frailtyValue });

  useDeltaText({
    delta: "frailty",
    state: frailty,
  });

  if (frailtyValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconFrailty}
        tooltip="Frailty"
      >
        <Stack gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <Stack gap={1}>
                    <div>
                      <span>The&nbsp;</span>

                      <IconImage className="small" Icon={Icon} />

                      <span>
                        &nbsp;{ownedItemFamiliar === undefined ? "Mysterious Egg" : "Familiar"}
                      </span>

                      <span>&nbsp;seems to be withering its resolve.</span>
                    </div>

                    <div>
                      <IconImage className="small" Icon={IconMonsterHealth} />

                      <span>&nbsp;and&nbsp;</span>

                      <IconImage className="small" Icon={IconMonsterDamage} />

                      <span>&nbsp;are reduced by&nbsp;{formattedValue}.</span>
                    </div>
                  </Stack>
                </PopoverBody>
              </Popover>
            }
            placement="right"
          >
            <span className="fitted">-{formattedValue}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="frailty" />
        </Stack>
      </IconDisplay>
    );
  }
}
