import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { MASTERIES } from "@neverquest/data/masteries";
import { ReactComponent as IconRank } from "@neverquest/icons/rank.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { LABEL_MAXIMUM, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MasteryDisplay({ mastery }: { mastery: Mastery }) {
  const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(mastery));
  const { isUnlocked, progress, rank } = useRecoilValue(masteries(mastery));
  const masteryCostValue = useRecoilValue(masteryCost(mastery));

  const { description, Icon, instructions } = MASTERIES[mastery];
  const label = isMasteryAtMaximumValue ? LABEL_MAXIMUM : `${progress}/${masteryCostValue}`;
  const value = isMasteryAtMaximumValue ? 100 : (progress / masteryCostValue) * 100;

  return (
    <div className={getAnimationClass({ name: "flipInX" })}>
      {isUnlocked ? (
        <IconDisplay
          contents={
            <Stack gap={1}>
              <div>
                <OverlayTrigger
                  overlay={
                    <Popover>
                      <Popover.Body>{description}</Popover.Body>
                    </Popover>
                  }
                  placement="right"
                >
                  <span>{capitalizeAll(mastery)}</span>
                </OverlayTrigger>
              </div>

              <Stack direction="horizontal">
                <Stack className="w-100" direction="horizontal" gap={3}>
                  <IconDisplay
                    contents={formatValue({ value: rank })}
                    Icon={IconRank}
                    iconProps={{ overlayPlacement: "bottom", size: "tiny" }}
                    tooltip="Rank"
                  />

                  <OverlayTrigger
                    overlay={
                      <Popover>
                        <Popover.Body>{instructions}</Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="w-100">
                      <LabelledProgressBar label={label} value={value} variant="secondary" />
                    </span>
                  </OverlayTrigger>
                </Stack>

                <FloatingText deltaType={mastery} />
              </Stack>
            </Stack>
          }
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
