import { Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { QuestBonusDisplay } from "@neverquest/components/Quests/QuestBonusDisplay";
import { QuestTab } from "@neverquest/components/Quests/QuestTab";
import { QuestTabsNav } from "@neverquest/components/Quests/QuestTabsNav";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import { canTrackQuests } from "@neverquest/state/quests";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isShowingQuestBonus } from "@neverquest/state/ui";
import type { TabsData } from "@neverquest/types/components";
import { QUEST_BONUS_TYPES, type QuestClass } from "@neverquest/types/unions";

const TABS: TabsData<QuestClass> = [
  {
    Component: () => <QuestTab questClass="routine" />,
    Icon: IconRoutine,
    label: "routine",
  },
  {
    Component: () => <QuestTab questClass="conquest" />,
    Icon: IconConquest,
    label: "conquest",
  },
  {
    Component: () => <QuestTab questClass="triumph" />,
    Icon: IconTriumph,
    label: "triumph",
  },
];

export function Quests() {
  const canTrackQuestsValue = useRecoilValue(canTrackQuests);
  const isSkillAcquiredMemetics = useRecoilValue(isSkillAcquired("memetics"));
  const isShowingQuestBonusValue = useRecoilValue(isShowingQuestBonus);

  if (!isSkillAcquiredMemetics) {
    return (
      <span className="fst-italic">
        The journal is undecipherable. Perhaps someone versed in the alchemical arts can help ...
      </span>
    );
  }

  if (!canTrackQuestsValue) {
    return <span className="fst-italic">Time for contemplation must be made in retirement.</span>;
  }

  return (
    <Stack className="journal overflow-y-hidden" gap={3}>
      {isShowingQuestBonusValue && (
        <>
          <h6>Rewards</h6>

          <Stack className="mx-auto" direction="horizontal" gap={5}>
            {QUEST_BONUS_TYPES.map((questBonus) => (
              <QuestBonusDisplay bonus={questBonus} key={questBonus} />
            ))}
          </Stack>
        </>
      )}

      {isShowingQuestBonusValue && <h6>Progress</h6>}

      <TabContainer defaultActiveKey={TABS[0].label}>
        <Stack className="overflow-y-hidden" gap={1}>
          <QuestTabsNav tabs={TABS} />

          <TabContent className="d-flex flex-column overflow-y-hidden">
            {TABS.map(({ Component, label }) => (
              <TabPane eventKey={label} key={label}>
                <Component />
              </TabPane>
            ))}
          </TabContent>
        </Stack>
      </TabContainer>
    </Stack>
  );
}
