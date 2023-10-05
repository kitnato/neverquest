import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { absorbedEssence, level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { formatValue } from "@neverquest/utilities/formatters";

export function Level() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);
  const levelValue = useRecoilValue(level);

  useDeltaText({
    delta: deltas("level"),
    value: level,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Absorbed essence</Popover.Header>

                <Popover.Body>
                  <Stack className="justify-content-center" direction="horizontal" gap={1}>
                    <IconImage Icon={IconEssence} size="small" />

                    {formatValue({ value: absorbedEssenceValue })}
                  </Stack>
                </Popover.Body>
              </Popover>
            }
          >
            <span>{levelValue}</span>
          </OverlayTrigger>

          <FloatingText delta="level" />
        </Stack>
      }
      Icon={IconLevel}
      tooltip="Power level"
    />
  );
}
