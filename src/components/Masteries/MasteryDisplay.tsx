import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryProgress } from "@neverquest/components/Masteries/MasteryProgress";
import { MasteryRank } from "@neverquest/components/Masteries/MasteryRank";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { MASTERIES } from "@neverquest/data/masteries";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { isMasteryUnlocked } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MasteryDisplay({ mastery }: { mastery: Mastery }) {
  const isMasteryUnlockedValue = useRecoilValue(isMasteryUnlocked(mastery));

  const { description, Icon } = MASTERIES[mastery];

  return (
    <div className={getAnimationClass({ name: "flipInX" })}>
      {isMasteryUnlockedValue ? (
        <IconDisplay
          contents={
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
          }
          description={
            <Stack direction="horizontal">
              <Stack className="w-100" direction="horizontal" gap={3}>
                <MasteryRank mastery={mastery} />

                <MasteryProgress mastery={mastery} />
              </Stack>

              <FloatingText delta={mastery} />
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
