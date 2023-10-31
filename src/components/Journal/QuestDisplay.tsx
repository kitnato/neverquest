import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { QUEST_COMPLETION_BONUS } from "@neverquest/data/quests";
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import { questProgress } from "@neverquest/state/quests";
import type { QuestData } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestProgression,
  type QuestStatus,
} from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

const QUEST_CLASS_ICONS: Record<QuestClass, SVGIcon> = {
  conquest: IconConquest,
  routine: IconRoutine,
  triumph: IconTriumph,
};

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

  const cappedProgress = Math.min(questProgressValue, progressionMaximum);
  const questProgression = `${progressionMaximum}`;
  const choiceID = `quest-completion-${quest}-${questProgression}`;
  const hasCompletedQuest = typeof status !== "boolean" && QUEST_BONUS_TYPES.includes(status);

  return (
    <Stack direction="horizontal" gap={3}>
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
        {hidden !== undefined && hasCompletedQuest ? title.replace(LABEL_UNKNOWN, hidden) : title}
      </IconDisplay>

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
