import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_AT_MAXIMUM } from "@neverquest/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { isShowingMastery } from "@neverquest/state/isShowing";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import { MasteryType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";
import { getDeltaTypeFromMasteryType } from "@neverquest/utilities/getters";

export function Mastery({ type }: { type: MasteryType }) {
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(type));
  const isShowingMasteryValue = useRecoilValue(isShowingMastery(type));
  const { progress, rank } = useRecoilValue(masteries(type));
  const masteryCostValue = useRecoilValue(masteryCost(type));

  const { description, Icon, name } = MASTERIES[type];
  const label = isMasteryAtMaximumValue ? LABEL_AT_MAXIMUM : `${progress}/${masteryCostValue}`;
  const value = isMasteryAtMaximumValue ? 100 : (progress / masteryCostValue) * 100;

  if (!isShowingMasteryValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <Stack className="w-100" direction="horizontal" gap={3}>
            <span>{rank}</span>

            <LabelledProgressBar label={label} value={value} variant={UIVariant.Secondary} />
          </Stack>

          <FloatingText type={getDeltaTypeFromMasteryType(type)} />
        </Stack>
      }
      description={description}
      Icon={Icon}
      tooltip={name}
    />
  );
}
