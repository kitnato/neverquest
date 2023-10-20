import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconStage from "@neverquest/icons/stage.svg?react";
import { stage } from "@neverquest/state/encounter";
import { formatValue } from "@neverquest/utilities/formatters";

export function Stage() {
  const stageValue = useRecoilValue(stage);

  useDeltaText({
    delta: "stage",
    stop: ({ current }) => current === 1,
    value: stage,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ value: stageValue })}</span>

          <FloatingTextQueue delta="stage" />
        </Stack>
      }
      Icon={IconStage}
      iconProps={{ overlayPlacement: "bottom" }}
      tooltip="Stage"
    />
  );
}
