import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { attributePoints, powerLevel } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePointProgress() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const essenceValue = useRecoilValue(essence);
  const powerLevelValue = useRecoilValue(powerLevel);

  const nextTotalCost =
    getAttributePointCost(powerLevelValue) +
    Array.from<undefined>({ length: attributePointsValue }).reduce(
      (sum, _, index) => sum + getAttributePointCost(powerLevelValue + index + 1),
      0,
    );

  return (
    <OverlayTrigger overlay={<Tooltip>Essence required for next attribute point.</Tooltip>}>
      <div className="w-100">
        <LabelledProgressBar
          value={(essenceValue / nextTotalCost) * PERCENTAGE_POINTS}
          variant="secondary"
        >
          <IconDisplay Icon={IconEssence} iconProps={{ className: "small stencilled" }}>
            <span>
              {formatNumber({ value: essenceValue })}&nbsp;/&nbsp;
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
