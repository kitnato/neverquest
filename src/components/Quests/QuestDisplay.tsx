import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { QUEST_CLASS_ICONS, QUEST_COMPLETION_BONUS } from "@neverquest/data/quests";
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { questProgress } from "@neverquest/state/quests";
import type { ActiveQuest } from "@neverquest/types";
import type { Quest, QuestBonus, QuestClass } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function QuestDisplay({
  activeQuest: { description, progressionMaximum, status, title },
  quest,
  questClass,
}: {
  activeQuest: ActiveQuest;
  quest: Quest;
  questClass: QuestClass;
}) {
  const questProgressValue = useRecoilValue(questProgress(quest));

  const completeQuest = useCompleteQuest();

  const cappedProgress = Math.min(questProgressValue, progressionMaximum);
  const choiceID = `quest-completion-${quest}-${progressionMaximum}`;
  const hasCompletedQuest = typeof status === "string";

  return (
    <Stack className={hasCompletedQuest ? "opacity-50" : undefined} direction="horizontal" gap={3}>
      <CircularProgressbar
        maxValue={progressionMaximum}
        text={`${formatNumber({ format: "abbreviated", value: cappedProgress })}/${formatNumber({
          format: "abbreviated",
          value: progressionMaximum,
        })}`}
        value={cappedProgress}
      />

      <IconDisplay
        description={description}
        Icon={QUEST_CLASS_ICONS[questClass]}
        isFullWidth
        tooltip={capitalizeAll(questClass)}
      >
        {title}
      </IconDisplay>

      {questProgressValue >= progressionMaximum && (
        <ToggleButtonGroup
          name={choiceID}
          onChange={(value) =>
            completeQuest({
              bonus: value as QuestBonus,
              progress: progressionMaximum,
              quest,
            })
          }
          type="radio"
          value={status}
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
