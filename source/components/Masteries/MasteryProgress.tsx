import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { isMasteryAtMaximum, masteryCost, masteryProgress } from "@neverquest/state/masteries";
import type { Delta, Mastery } from "@neverquest/types/unions";

export function MasteryProgress({ mastery }: { mastery: Mastery }) {
  const masteryProgressState = masteryProgress(mastery);
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(mastery));
  const masteryCostValue = useRecoilValue(masteryCost(mastery));
  const masteryProgressValue = useRecoilValue(masteryProgressState);

  const delta: Delta = `${mastery}Progress`;

  useDeltaText({
    delta,
    state: masteryProgressState,
  });

  return (
    <Stack className="w-100" direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverBody>{MASTERIES[mastery].instructions}</PopoverBody>
          </Popover>
        }
      >
        <div className="w-100">
          <LabelledProgressBar
            value={
              isMasteryAtMaximumValue
                ? PERCENTAGE_POINTS
                : (masteryProgressValue / masteryCostValue) * PERCENTAGE_POINTS
            }
            variant="secondary"
          >
            <span>
              {isMasteryAtMaximumValue
                ? LABEL_MAXIMUM
                : `${masteryProgressValue} / ${masteryCostValue}`}
            </span>
          </LabelledProgressBar>
        </div>
      </OverlayTrigger>

      <DeltasDisplay delta={delta} />
    </Stack>
  );
}
