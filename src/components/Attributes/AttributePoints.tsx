import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAttributePoints from "@neverquest/icons/attribute-points.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { attributePoints, level } from "@neverquest/state/attributes";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const levelValue = useRecoilValue(level);

  useDeltaText({
    delta: "attributePoints",
    state: attributePoints,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <Stack direction="horizontal" gap={1}>
        <IconDisplay Icon={IconAttributePoints} tooltip="Available attribute points" />

        <FloatingTextQueue delta="attributePoints" />
      </Stack>

      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverHeader className="text-center">Attribute point cost</PopoverHeader>

            <PopoverBody>
              <Stack className="justify-content-center" direction="horizontal" gap={1}>
                <IconImage Icon={IconEssence} size="small" />

                {formatNumber({ value: getAttributePointCost(levelValue) })}
              </Stack>
            </PopoverBody>
          </Popover>
        }
      >
        <span>{attributePointsValue}</span>
      </OverlayTrigger>
    </Stack>
  );
}
