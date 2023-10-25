import { Stack } from "react-bootstrap";
import { type RecoilValueReadOnly, useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { ConquestDisplay } from "@neverquest/components/Journal/ConquestDisplay";
import { RoutineDisplay } from "@neverquest/components/Journal/RoutineDisplay";
import { TriumphDisplay } from "@neverquest/components/Journal/TriumphDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { CONQUESTS_COUNT, ROUTINES_COUNT, TRIUMPHS_COUNT } from "@neverquest/data/journal";
import {
  conquestsCompleted,
  routinesCompleted,
  triumphsCompleted,
} from "@neverquest/state/journal";
import {
  CONQUEST_TYPES,
  type Conquest,
  type QuestClass,
  ROUTINE_TYPES,
  type Routine,
  TRIUMPH_TYPES,
  type Triumph,
} from "@neverquest/types/unions";

const QUEST_CLASSES: Record<
  QuestClass,
  {
    completed: RecoilValueReadOnly<number>;
    count: number;
    types: typeof CONQUEST_TYPES | typeof ROUTINE_TYPES | typeof TRIUMPH_TYPES;
  }
> = {
  conquest: {
    completed: conquestsCompleted,
    count: CONQUESTS_COUNT,
    types: CONQUEST_TYPES,
  },
  routine: {
    completed: routinesCompleted,
    count: ROUTINES_COUNT,
    types: ROUTINE_TYPES,
  },
  triumph: {
    completed: triumphsCompleted,
    count: TRIUMPHS_COUNT,
    types: TRIUMPH_TYPES,
  },
};

export function Quests({ questClass }: { questClass: QuestClass }) {
  const { completed, count, types } = QUEST_CLASSES[questClass];

  const questsCompletedValue = useRecoilValue(completed);

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Completion</h6>

        <LabelledProgressBar value={(questsCompletedValue / count) * 100} variant="dark">
          <Stack direction="horizontal">
            {`${questsCompletedValue}/${count}`}

            <FloatingTextQueue delta="routines" />
          </Stack>
        </LabelledProgressBar>
      </Stack>

      <Stack gap={3}>
        {types.map((current) => {
          switch (questClass) {
            case "conquest": {
              return <ConquestDisplay conquest={current as Conquest} key={current} />;
            }
            case "routine": {
              return <RoutineDisplay key={current} routine={current as Routine} />;
            }
            case "triumph": {
              return <TriumphDisplay key={current} triumph={current as Triumph} />;
            }
          }
        })}
      </Stack>
    </Stack>
  );
}
