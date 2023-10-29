import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { QUEST_COMPLETION_BONUS } from "@neverquest/data/journal";
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { questProgress } from "@neverquest/state/journal";
import type { QuestData } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestProgression,
  type QuestStatus,
} from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function QuestDisplay({
  data: { description, hidden, progressionMaximum, title },
  quest,
  questClass,
  status,
}: {
  data: QuestData;
  quest: Quest;
  questClass: QuestClass;
  status: QuestStatus;
}) {
  const questProgressValue = useRecoilValue(questProgress(quest));

  const completeQuest = useCompleteQuest();

  const questProgression = `${progressionMaximum}`;
  const choiceID = `quest-completion-${quest}-${questProgression}`;
  const hasCompletedQuest = typeof status !== "boolean" && QUEST_BONUS_TYPES.includes(status);

  return (
    <Stack direction="horizontal" gap={3}>
      <IconDisplay description={description} Icon={IconRoutine} isFullWidth tooltip={questClass}>
        {hidden !== undefined && hasCompletedQuest ? title.replace(LABEL_UNKNOWN, hidden) : title}
      </IconDisplay>

      {progressionMaximum > 1 && (
        <CircularProgressbar
          maxValue={progressionMaximum}
          text={`${formatNumber({ value: questProgressValue })}/${formatNumber({
            value: progressionMaximum,
          })}`}
          value={questProgressValue}
        />
      )}

      {status !== false && (
        <ToggleButtonGroup
          name={choiceID}
          onChange={(value) =>
            completeQuest({
              bonus: value as QuestBonus,
              progression: questProgression as QuestProgression,
              quest,
            })
          }
          type="radio"
          value={status === true ? null : status}
        >
          {[
            { bonus: "healthBonus", Icon: IconHealth },
            { bonus: "staminaBonus", Icon: IconStamina },
            { bonus: "damageBonus", Icon: IconDamage },
          ].map(({ bonus, Icon }) => (
            <ToggleButton
              disabled={hasCompletedQuest}
              id={`${choiceID}-${bonus}`}
              key={bonus}
              value={bonus}
              variant="outline-dark"
            >
              <Stack direction="horizontal" gap={1}>
                <IconImage Icon={Icon} size="small" />

                {`+${formatNumber({
                  decimals: 0,
                  format: "percentage",
                  value: QUEST_COMPLETION_BONUS,
                })}`}
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </Stack>
  );
}
