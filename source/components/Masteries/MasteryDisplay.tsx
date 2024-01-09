import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryProgress } from "@neverquest/components/Masteries/MasteryProgress";
import { MasteryRank } from "@neverquest/components/Masteries/MasteryRank";
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { MASTERIES } from "@neverquest/data/masteries";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { canTrainMastery } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Mastery } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MasteryDisplay({ mastery }: { mastery: Mastery }) {
  const canTrainMasteryValue = useRecoilValue(canTrainMastery(mastery));
  const isSkillAcquiredRequired = useRecoilValue(isSkillAcquired(MASTERIES[mastery].requiredSkill));

  const { description, Icon } = MASTERIES[mastery];

  return (
    <div className={getAnimationClass({ animation: "flipInX" })}>
      {isSkillAcquiredRequired ? (
        <IconDisplay
          className={`${canTrainMasteryValue ? "" : "opacity-50"}`}
          description={
            <Stack direction="horizontal">
              <Stack className="w-100" direction="horizontal" gap={3}>
                <MasteryRank mastery={mastery} />

                <MasteryProgress mastery={mastery} />
              </Stack>

              <DeltasDisplay delta={mastery} />
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
            <span className="fitted">{capitalizeAll(mastery)}</span>
          </OverlayTrigger>
        </IconDisplay>
      ) : (
        <IconDisplay description={LABEL_SKILL_REQUIRED} Icon={IconUnknown} tooltip="Mastery">
          <span>{LABEL_UNKNOWN}</span>
        </IconDisplay>
      )}
    </div>
  );
}
