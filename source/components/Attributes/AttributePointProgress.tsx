import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
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
      <span className="w-100">
        <LabelledProgressBar value={(essenceValue / nextTotalCost) * 100} variant="secondary">
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconEssence} isSmall isStencilled />

            {`${formatNumber({ value: essenceValue })}/${formatNumber({
              value: nextTotalCost,
            })}`}
          </Stack>
        </LabelledProgressBar>
      </span>
    </OverlayTrigger>
  );
}
