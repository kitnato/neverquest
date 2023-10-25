import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconTabs } from "@neverquest/components/IconTabs";
import { QuestBonus } from "@neverquest/components/Journal/QuestBonus";
import { Quests } from "@neverquest/components/Journal/Quests";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import { questsBonus } from "@neverquest/state/journal";

export function Journal() {
  const questsBonusValue = useRecoilValue(questsBonus);

  const showBonus =
    Object.values(questsBonusValue).reduce((aggregator, current) => aggregator + current, 0) > 0;

  return (
    <Stack gap={5}>
      {showBonus && <QuestBonus />}

      <Stack gap={3}>
        {showBonus && <h6>Quests</h6>}

        <IconTabs
          tabs={[
            {
              Component: () => <Quests questClass="conquest" />,
              Icon: IconConquest,
              label: "conquests",
            },
            {
              Component: () => <Quests questClass="routine" />,
              Icon: IconRoutine,
              label: "routines",
            },
            {
              Component: () => <Quests questClass="triumph" />,
              Icon: IconTriumph,
              label: "triumphs",
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
