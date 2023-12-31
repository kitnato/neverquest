import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { QUEST_CLASS_ICONS, QUEST_COMPLETION_BONUS } from "@neverquest/data/quests";
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { questProgress, questStatuses } from "@neverquest/state/quests";
import type { QuestData } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
} from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function QuestDisplay({
  activeQuest: { description, hidden, progressionIndex, progressionMaximum, title },
  quest,
  questClass,
}: {
  activeQuest: QuestData;
  quest: Quest;
  questClass: QuestClass;
}) {
  const questProgressValue = useRecoilValue(questProgress(quest));
  const questStatusValue = useRecoilValue(questStatuses(quest));

  const completeQuest = useCompleteQuest();

  const questStatus = questStatusValue[progressionIndex];

  if (questStatus === undefined) {
    return;
  }

  const hasCompletedQuest = new Set<string>(QUEST_BONUS_TYPES).has(questStatus);
  const isQuestOver = hasCompletedQuest || questStatus === "achieved";
  const cappedProgress = isQuestOver ? progressionMaximum : questProgressValue;
  const choiceID = `quest-completion-${quest}-${progressionMaximum}`;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <Stack
        className={hasCompletedQuest ? "opacity-50" : undefined}
        direction="horizontal"
        gap={3}
      >
        <CircularProgressbar
          maxValue={progressionMaximum}
          text={`${formatNumber({ format: "abbreviated", value: cappedProgress })} / ${formatNumber(
            {
              format: "abbreviated",
              value: progressionMaximum,
            },
          )}`}
          value={cappedProgress}
        />

        <IconDisplay
          description={
            hidden !== undefined && isQuestOver
              ? description.replace(LABEL_UNKNOWN, hidden)
              : description
          }
          Icon={QUEST_CLASS_ICONS[questClass]}
          tooltip={capitalizeAll(questClass)}
        >
          <span>{title}</span>
        </IconDisplay>
      </Stack>

      {questProgressValue >= progressionMaximum && (
        <ToggleButtonGroup
          className="ms-2"
          name={choiceID}
          onChange={(value) => {
            completeQuest({
              bonus: value as QuestBonus,
              progression: progressionMaximum,
              quest,
            });
          }}
          type="radio"
          value={hasCompletedQuest ? questStatus : undefined}
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
              <IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
                <span>
                  +
                  {formatNumber({
                    decimals: 0,
                    format: "percentage",
                    value: QUEST_COMPLETION_BONUS,
                  })}
                </span>
              </IconDisplay>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </div>
  );
}
