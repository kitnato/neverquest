import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAttributePoints from "@neverquest/icons/attribute-points.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { attributePoints, powerLevel } from "@neverquest/state/attributes";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const powerLevelValue = useRecoilValue(powerLevel);

  useDeltaText({
    delta: "attributePoints",
    state: attributePoints,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay Icon={IconAttributePoints} tooltip="Available attribute points" />

      <DeltasDisplay delta="attributePoints" />

      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverHeader className="text-center">Attribute point cost</PopoverHeader>

            <PopoverBody>
              <Stack className="justify-content-center" direction="horizontal" gap={1}>
                <IconImage Icon={IconEssence} isSmall />

                {formatNumber({ value: getAttributePointCost(powerLevelValue) })}
              </Stack>
            </PopoverBody>
          </Popover>
        }
        placement="left"
      >
        <span>{attributePointsValue}</span>
      </OverlayTrigger>
    </Stack>
  );
}