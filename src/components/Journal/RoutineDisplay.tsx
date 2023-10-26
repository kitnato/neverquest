import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CompleteQuest } from "@neverquest/components/Journal/CompleteQuest";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ROUTINES } from "@neverquest/data/journal";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import { routineProgress } from "@neverquest/state/journal";
import type { Routine } from "@neverquest/types/unions";

export function RoutineDisplay({ routine }: { routine: Routine }) {
  const routineProgressValue = useRecoilValue(routineProgress(routine));

  const { description, progression, title } = ROUTINES[routine];

  const showProgression = progression !== undefined;

  return (
    <Stack direction="horizontal" gap={3}>
      <IconDisplay
        description={
          showProgression ? (
            <LabelledProgressBar
              value={(routineProgressValue / progression[0]) * 100}
              variant="dark"
            >
              {`${routineProgressValue}/${progression[0]}`}
            </LabelledProgressBar>
          ) : (
            description
          )
        }
        Icon={IconRoutine}
        isFullWidth
        tooltip="Routine"
      >
        {showProgression ? (
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>{description}</PopoverBody>
              </Popover>
            }
            placement="right"
          >
            <span style={{ width: "max-content" }}>{title}</span>
          </OverlayTrigger>
        ) : (
          title
        )}
      </IconDisplay>

      <CompleteQuest quest={routine} />
    </Stack>
  );
}
