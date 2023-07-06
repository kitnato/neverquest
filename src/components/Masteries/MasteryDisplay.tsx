import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { MASTERIES } from "@neverquest/data/masteries";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { LABEL_AT_MAXIMUM, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MasteryDisplay({ type }: { type: Mastery }) {
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(type));
  const { isUnlocked, progress, rank } = useRecoilValue(masteries(type));
  const masteryCostValue = useRecoilValue(masteryCost(type));

  const { description, Icon } = MASTERIES[type];
  const label = isMasteryAtMaximumValue ? LABEL_AT_MAXIMUM : `${progress}/${masteryCostValue}`;
  const value = isMasteryAtMaximumValue ? 100 : (progress / masteryCostValue) * 100;

  return (
    <div className={getAnimationClass({ type: "flipInX" })}>
      {isUnlocked ? (
        <IconDisplay
          contents={
            <Stack gap={1}>
              <span>{capitalizeAll(type)}</span>
              <Stack direction="horizontal">
                <Stack className="w-100" direction="horizontal" gap={3}>
                  <span>{rank}</span>

                  <LabelledProgressBar label={label} value={value} variant="secondary" />
                </Stack>

                <FloatingText deltaType={type} />
              </Stack>
            </Stack>
          }
          description={description}
          Icon={Icon}
          tooltip="Mastery"
        />
      ) : (
        <IconDisplay
          contents={LABEL_UNKNOWN}
          description="Unlocked by acquiring a skill."
          Icon={IconUnknown}
          tooltip="Mastery"
        />
      )}
    </div>
  );
}
