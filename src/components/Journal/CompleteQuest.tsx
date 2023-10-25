import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { QUEST_COMPLETION_BONUS } from "@neverquest/data/journal";
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { canCompleteQuest, questCompletion } from "@neverquest/state/journal";
import type { Quest, QuestBonus } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CompleteQuest({ quest }: { quest: Quest }) {
  const canCompleteQuestValue = useRecoilValue(canCompleteQuest(quest));
  const questCompletionValue = useRecoilValue(questCompletion(quest));

  const completeQuest = useCompleteQuest();

  const choiceID = `quest-completion-${quest}`;
  const hasCompletedQuest = questCompletionValue !== false;

  if (!canCompleteQuestValue) {
    return null;
  }

  return (
    <ToggleButtonGroup
      name={choiceID}
      onChange={(value) => completeQuest({ bonus: value as QuestBonus, quest })}
      type="radio"
      value={questCompletionValue}
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
  );
}
