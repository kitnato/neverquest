import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Essence() {
  const essenceValue = useRecoilValue(essence);
  const isShowingEssence = useRecoilValue(isShowing("essence"));

  useDeltaText({
    delta: "essence",
    state: essence,
  });

  return (
    <Card className="border-0 px-2 py-1 overlay-modal-backdrop">
      <Stack
        className={
          isShowingEssence ? `visible ${getAnimationClass({ animation: "flipInX" })}` : "invisible"
        }
        direction="horizontal"
        gap={1}
      >
        <IconDisplay
          Icon={IconEssence}
          iconProps={{ overlayPlacement: "bottom" }}
          tooltip="Essence"
        >
          {formatNumber({ value: essenceValue })}
        </IconDisplay>

        <DeltasDisplay delta="essence" />
      </Stack>
    </Card>
  );
}
