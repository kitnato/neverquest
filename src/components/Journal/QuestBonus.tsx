import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { questsBonus } from "@neverquest/state/journal";
import type { QuestBonus } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function QuestBonus() {
  const questsBonusValue = useRecoilValue(questsBonus);

  return (
    <Stack gap={3}>
      <h6>Completion bonus</h6>

      <div className="mx-auto">
        <Stack direction="horizontal" gap={5}>
          {[
            { Icon: IconHealth, key: "healthBonus" },
            { Icon: IconStamina, key: "staminaBonus" },
            { Icon: IconDamage, key: "damageBonus" },
          ].map(({ Icon, key }) => (
            <IconDisplay Icon={Icon} key={key}>
              +
              {formatNumber({
                decimals: 0,
                format: "percentage",
                value: questsBonusValue[key as QuestBonus],
              })}
            </IconDisplay>
          ))}
        </Stack>
      </div>
    </Stack>
  );
}
