import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ProgressMeter } from "@neverquest/components/Encounter/ProgressMeter";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconProgressReduction from "@neverquest/icons/progress-reduction.svg?react";
import IconProgress from "@neverquest/icons/progress.svg?react";
import { location, progress, progressReduction } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Progress() {
  const locationValue = useRecoilValue(location);
  const progressReductionValue = useRecoilValue(progressReduction);

  useDeltaText({
    delta: "progress",
    state: progress,
    stop: ({ current }) => current === 0,
  });

  if (locationValue === "wilderness") {
    return (
      <IconDisplay
        className="w-100"
        Icon={IconProgress}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Progress"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Monster density</PopoverHeader>

              <PopoverBody>
                <Stack className="justify-content-center" direction="horizontal" gap={1}>
                  <IconDisplay
                    Icon={IconProgressReduction}
                    iconProps={{ className: "small", isFlipped: true }}
                    tooltip="Monster density"
                  >
                    -
                    {formatNumber({
                      format: "percentage",
                      value: progressReductionValue,
                    })}
                  </IconDisplay>
                </Stack>
              </PopoverBody>
            </Popover>
          }
          placement="bottom"
          trigger={progressReductionValue > 0 ? ["focus", "hover"] : []}
        >
          <div>
            <ProgressMeter />
          </div>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
