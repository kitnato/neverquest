import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { MASTERIES } from "@neverquest/data/masteries";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { LABEL_AT_MAXIMUM } from "@neverquest/utilities/constants";

export function MasteryDisplay({ type }: { type: Mastery }) {
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(type));
  const { isUnlocked, progress, rank } = useRecoilValue(masteries(type));
  const masteryCostValue = useRecoilValue(masteryCost(type));

  const { description, Icon, name } = MASTERIES[type];
  const label = isMasteryAtMaximumValue ? LABEL_AT_MAXIMUM : `${progress}/${masteryCostValue}`;
  const value = isMasteryAtMaximumValue ? 100 : (progress / masteryCostValue) * 100;

  if (!isUnlocked) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <Stack className="w-100" direction="horizontal" gap={3}>
            <span>{rank}</span>

            <LabelledProgressBar label={label} value={value} variant="secondary" />
          </Stack>

          <FloatingText deltaType={type} isRelative />
        </Stack>
      }
      description={description}
      Icon={Icon}
      tooltip={name}
    />
  );
}
