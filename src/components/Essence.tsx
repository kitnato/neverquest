import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
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
    value: essence,
  });

  return (
    <Card
      className="overlay-modal-backdrop"
      style={{
        border: "none",
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
      }}
    >
      <Stack
        className={isShowingEssence ? ` ${getAnimationClass({ name: "flipInX" })}` : undefined}
        direction="horizontal"
        style={{
          visibility: isShowingEssence ? "visible" : "hidden",
        }}
      >
        <IconDisplay
          Icon={IconEssence}
          iconProps={{ overlayPlacement: "bottom" }}
          tooltip="Essence"
        >
          {formatNumber({ value: essenceValue })}
        </IconDisplay>

        <FloatingTextQueue delta="essence" />
      </Stack>
    </Card>
  );
}
