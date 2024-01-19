import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { attributePoints, powerLevel } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAttributePointCost, getAttributePoints } from "@neverquest/utilities/getters";

export function AttributePointProgress({ extraEssence }: { extraEssence?: number }) {
  const attributePointsValue = useRecoilValue(attributePoints);
  const essenceValue = useRecoilValue(essence);
  const powerLevelValue = useRecoilValue(powerLevel);

  const extraAttributePoints =
    getAttributePoints({
      essence: essenceValue + (extraEssence ?? 0),
      powerLevel: powerLevelValue,
    }) - attributePointsValue;
  const extraLevels = powerLevelValue + (extraEssence === undefined ? 0 : extraAttributePoints);
  const nextTotalCost =
    getAttributePointCost(extraLevels) +
    Array.from<undefined>({ length: attributePointsValue + extraAttributePoints }).reduce(
      (sum, _, index) => sum + getAttributePointCost(extraLevels + index + 1),
      0,
    );
  const totalEssence = extraEssence === undefined ? essenceValue : essenceValue + extraEssence;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody>
            {extraEssence === undefined ? "Current essence" : "Essence after collecting loot"}, and
            required essence for next attribute point.
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
