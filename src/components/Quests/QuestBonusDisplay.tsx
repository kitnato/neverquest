import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { questsBonus } from "@neverquest/state/quests";
import type { SVGIcon } from "@neverquest/types/components";
import type { QuestBonus } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

const QUEST_BONUS: Record<QuestBonus, { Icon: SVGIcon; tooltip: string }> = {
  damageBonus: { Icon: IconDamage, tooltip: "Total damage bonus" },
  healthBonus: { Icon: IconHealth, tooltip: "Total health bonus" },
  staminaBonus: { Icon: IconStamina, tooltip: "Total stamina bonus" },
};

export function QuestBonusDisplay({ bonus }: { bonus: QuestBonus }) {
  const questsBonusState = questsBonus(bonus);

  const questsBonusValue = useRecoilValue(questsBonusState);

  const { Icon, tooltip } = QUEST_BONUS[bonus];

  useDeltaText({
    delta: bonus,
    format: "percentage",
    state: questsBonusState,
  });

  return (
    <IconDisplay Icon={Icon} key={bonus} tooltip={tooltip}>
      <Stack direction="horizontal" gap={1}>
        {`+${formatNumber({
          decimals: 0,
          format: "percentage",
          value: questsBonusValue,
        })}`}

        <DeltasDisplay delta={bonus} />
      </Stack>
    </IconDisplay>
  );
}
