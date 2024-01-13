import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

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
  const formattedValue = formatNumber({ value: frailtyValue });

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
                  <Stack direction="horizontal" gap={1}>
                    <span>The</span>

                    <IconImage className="small" Icon={Icon} />

                    <span>{ownedItemFamiliar === undefined ? "Mysterious Egg" : "Familiar"}</span>

                    <span>seems to be withering its resolve.</span>
                  </Stack>

                  <Stack direction="horizontal" gap={1}>
                    <span>{formattedValue}&nbsp;reduced</span>

                    <IconImage className="small" Icon={IconMonsterHealth} />

                    <span>&</span>

                    <IconImage className="small" Icon={IconMonsterDamage} />
                  </Stack>
                </PopoverBody>
              </Popover>
            }
          >
            <span>-{formattedValue}</span>
          </OverlayTrigger>
        </Stack>
      </IconDisplay>
    );
  }
}
