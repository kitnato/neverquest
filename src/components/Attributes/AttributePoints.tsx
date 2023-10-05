import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttributePoints } from "@neverquest/icons/attribute-points.svg";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { attributePoints, level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { formatValue } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const levelValue = useRecoilValue(level);

  const deltaAttributePoints = deltas("attributePoints");

  useDeltaText({
    delta: deltaAttributePoints,
    value: attributePoints,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <Stack direction="horizontal">
        <IconDisplay contents="" Icon={IconAttributePoints} tooltip="Available attribute points" />

        <FloatingText delta="attributePoints" />
      </Stack>

      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Header className="text-center">Attribute point cost</Popover.Header>

            <Popover.Body>
              <Stack className="justify-content-center" direction="horizontal" gap={1}>
                <IconImage Icon={IconEssence} size="small" />

                {formatValue({ value: getAttributePointCost(levelValue) })}
              </Stack>
            </Popover.Body>
          </Popover>
        }
      >
        <span>{attributePointsValue}</span>
      </OverlayTrigger>
    </Stack>
  );
}
