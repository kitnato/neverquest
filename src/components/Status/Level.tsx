import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconLevel from "@neverquest/icons/level.svg?react";
import { absorbedEssence, level } from "@neverquest/state/attributes";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Level() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);
  const levelValue = useRecoilValue(level);

  useDeltaText({
    delta: "level",
    state: level,
  });

  return (
    <IconDisplay Icon={IconLevel} tooltip="Power level">
      <Stack direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Absorbed essence</PopoverHeader>

              <PopoverBody>
                <Stack className="justify-content-center" direction="horizontal" gap={1}>
                  <IconImage Icon={IconEssence} size="small" />

                  {formatNumber({ value: absorbedEssenceValue })}
                </Stack>
              </PopoverBody>
            </Popover>
          }
        >
          <span>{levelValue}</span>
        </OverlayTrigger>

        <FloatingTextQueue delta="level" />
      </Stack>
    </IconDisplay>
  );
}
