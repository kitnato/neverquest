import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconProgress } from "@neverquest/icons/progress.svg";
import { deltas } from "@neverquest/state/deltas";
import { isWilderness, progress, progressMaximum } from "@neverquest/state/encounter";

export function Progress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  useDeltaText({
    atomDelta: deltas("progress"),
    atomValue: progress,
    stop: (_, current) => current === 0,
  });

  if (!isWildernessValue) {
    return null;
  }

  return (
    <div className="w-100">
      <IconDisplay
        contents={
          <Stack className="w-100" direction="horizontal">
            <LabelledProgressBar
              label={`${progressValue}/${progressMaximumValue}`}
              value={(progressValue / progressMaximumValue) * 100}
              variant="dark"
            />

            <FloatingText type="progress" />
          </Stack>
        }
        Icon={IconProgress}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Progress"
      />
    </div>
  );
}
