import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM } from "@neverquest/data/general";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { isMasteryAtMaximum, masteryCost, masteryProgress } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";

export function MasteryProgress({ mastery }: { mastery: Mastery }) {
  const masteryProgressState = masteryProgress(mastery);
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(mastery));
  const masteryCostValue = useRecoilValue(masteryCost(mastery));
  const masteryProgressValue = useRecoilValue(masteryProgressState);

  useDeltaText({
    delta: "masteryProgress",
    stop: ({ current }) => current === 0,
    value: masteryProgressState,
  });

  return (
    <Stack className="w-100" direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Body>{MASTERIES[mastery].instructions}</Popover.Body>
          </Popover>
        }
      >
        <span className="w-100">
          <LabelledProgressBar
            label={
              isMasteryAtMaximumValue
                ? LABEL_MAXIMUM
                : `${masteryProgressValue}/${masteryCostValue}`
            }
            value={isMasteryAtMaximumValue ? 100 : (masteryProgressValue / masteryCostValue) * 100}
            variant="secondary"
          />
        </span>
      </OverlayTrigger>

      <FloatingTextQueue delta="masteryProgress" />
    </Stack>
  );
}
