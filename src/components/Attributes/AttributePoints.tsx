import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttributePoints } from "@neverquest/icons/attribute-points.svg";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { attributePoints, level } from "@neverquest/state/attributes";
import { formatValue } from "@neverquest/utilities/formatters";
import { getAttributePointCost } from "@neverquest/utilities/getters";

export function AttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints);
  const levelValue = useRecoilValue(level);

  useDeltaText({
    delta: "attributePoints",
    value: attributePoints,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <Stack direction="horizontal">
        <IconDisplay contents="" Icon={IconAttributePoints} tooltip="Available attribute points" />

        <FloatingTextQueue delta="attributePoints" />
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
