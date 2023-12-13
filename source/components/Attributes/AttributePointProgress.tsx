import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
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
      (aggregator, _, index) => aggregator + getAttributePointCost(powerLevelValue + index + 1),
      0,
    );

  return (
    <OverlayTrigger overlay={<Tooltip>Essence required for next attribute point.</Tooltip>}>
      <div className="w-100">
        <LabelledProgressBar
          value={(essenceValue / nextTotalCost) * PERCENTAGE_POINTS}
          variant="secondary"
        >
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconEssence} isSmall isStencilled />

            <span>{`${formatNumber({ value: essenceValue })}/${formatNumber({
              value: nextTotalCost,
            })}`}</span>
          </Stack>
        </LabelledProgressBar>
      </div>
    </OverlayTrigger>
  );
}
