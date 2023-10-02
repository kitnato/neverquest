import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { attributePoints, level } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatValue } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePointProgress() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const essenceValue = useRecoilValue(essence);
  const levelValue = useRecoilValue(level);

  const nextTotalCost = Array.from<number>(Array(attributePointsValue + levelValue + 1)).reduce(
    (aggregator, _, index) => aggregator + getAttributePointCost(index),
    0,
  );

  return (
    <OverlayTrigger overlay={<Tooltip>Essence required for next attribute point.</Tooltip>}>
      <div className="w-100">
        <LabelledProgressBar
          label={
            <Stack direction="horizontal" gap={1}>
              <IconImage Icon={IconEssence} isStencilled size="small" />

              {`${formatValue({ value: essenceValue })}/${formatValue({
                value: nextTotalCost,
              })}`}
            </Stack>
          }
          value={(essenceValue / nextTotalCost) * 100}
          variant="secondary"
        />
      </div>
    </OverlayTrigger>
  );
}
