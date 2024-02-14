import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { powerLevel } from "@neverquest/state/attributes";
import { essence, essenceLoot } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAttributePointCost, getAttributePoints } from "@neverquest/utilities/getters";

export function AttributePointProgress({ isLoot }: { isLoot?: boolean }) {
  const essenceValue = useRecoilValue(essence);
  const essenceLootValue = useRecoilValue(essenceLoot);
  const powerLevelValue = useRecoilValue(powerLevel);

  const totalEssence = essenceValue + (isLoot ? essenceLootValue : 0);
  const nextTotalCost = Array.from<undefined>({
    length: getAttributePoints({
      essence: totalEssence,
      powerLevel: powerLevelValue,
    }),
  }).reduce(
    (sum, _, index) => sum + getAttributePointCost(powerLevelValue + index + 1),
    getAttributePointCost(powerLevelValue),
  );

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody>
            <span>
              {isLoot ? "Essence after collecting loot" : "Current essence"},&nbsp;and required
              essence for next attribute point.
            </span>
          </PopoverBody>
        </Popover>
      }
    >
      <div className="w-100">
        <LabelledProgressBar
          value={(totalEssence / nextTotalCost) * PERCENTAGE_POINTS}
          variant="secondary"
        >
          <IconDisplay Icon={IconEssence} iconProps={{ className: "small stencilled" }}>
            <span>
              {formatNumber({ value: totalEssence })}&nbsp;/&nbsp;
              {formatNumber({
                value: nextTotalCost,
              })}
            </span>
          </IconDisplay>
        </LabelledProgressBar>
      </div>
    </OverlayTrigger>
  );
}
