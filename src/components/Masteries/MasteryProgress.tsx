import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM } from "@neverquest/data/general";
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
    stop: ({ current }) => current === 0,
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
        <span className="w-100">
          <LabelledProgressBar
            value={isMasteryAtMaximumValue ? 100 : (masteryProgressValue / masteryCostValue) * 100}
            variant="secondary"
          >
            {isMasteryAtMaximumValue
              ? LABEL_MAXIMUM
              : `${masteryProgressValue}/${masteryCostValue}`}
          </LabelledProgressBar>
        </span>
      </OverlayTrigger>

      <FloatingTextQueue delta={delta} />
    </Stack>
  );
}
