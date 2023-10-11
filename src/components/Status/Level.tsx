import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { absorbedEssence, level } from "@neverquest/state/attributes";
import { formatValue } from "@neverquest/utilities/formatters";

export function Level() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);
  const levelValue = useRecoilValue(level);

  useDeltaText({
    delta: "level",
    value: level,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Absorbed essence</PopoverHeader>

                <PopoverBody>
                  <Stack className="justify-content-center" direction="horizontal" gap={1}>
                    <IconImage Icon={IconEssence} size="small" />

                    {formatValue({ value: absorbedEssenceValue })}
                  </Stack>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{levelValue}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="level" />
        </Stack>
      }
      Icon={IconLevel}
      tooltip="Power level"
    />
  );
}
