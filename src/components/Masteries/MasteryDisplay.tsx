import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryProgress } from "@neverquest/components/Masteries/MasteryProgress";
import { MasteryRank } from "@neverquest/components/Masteries/MasteryRank";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { MASTERIES } from "@neverquest/data/masteries";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { isMasteryUnlocked } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MasteryDisplay({ mastery }: { mastery: Mastery }) {
  const isMasteryUnlockedValue = useRecoilValue(isMasteryUnlocked(mastery));

  const { description, Icon } = MASTERIES[mastery];

  return (
    <div className={`mastery-display ${getAnimationClass({ name: "flipInX" })}`}>
      {isMasteryUnlockedValue ? (
        <IconDisplay
          description={
            <Stack direction="horizontal">
              <Stack className="w-100" direction="horizontal" gap={3}>
                <MasteryRank mastery={mastery} />

                <MasteryProgress mastery={mastery} />
              </Stack>

              <FloatingTextQueue delta={mastery} />
            </Stack>
          }
          Icon={Icon}
          tooltip="Mastery"
        >
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>{description}</PopoverBody>
              </Popover>
            }
            placement="right"
          >
            <span>{capitalizeAll(mastery)}</span>
          </OverlayTrigger>
        </IconDisplay>
      ) : (
        <IconDisplay
          description="Unlocked by acquiring a skill."
          Icon={IconUnknown}
          tooltip="Mastery"
        >
          {LABEL_UNKNOWN}
        </IconDisplay>
      )}
    </div>
  );
}
