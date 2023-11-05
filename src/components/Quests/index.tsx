import { Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { QuestBonusDisplay } from "@neverquest/components/Quests/QuestBonusDisplay";
import { Quests } from "@neverquest/components/Quests/Quests";
import { QuestTabsNav } from "@neverquest/components/Quests/QuestTabsNav";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import type { TabsData } from "@neverquest/types/props";
import { QUEST_BONUS_TYPES } from "@neverquest/types/unions";

const TABS: TabsData = [
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
];

export function Journal() {
  const isShowingQuestBonus = useRecoilValue(isShowing("questBonus"));

  return (
    <Stack className="journal overflow-y-hidden" gap={3}>
      {isShowingQuestBonus && (
        <>
          <h6>Completion bonus</h6>

          <Stack className="mx-auto" direction="horizontal" gap={5}>
            {QUEST_BONUS_TYPES.map((current) => (
              <QuestBonusDisplay bonus={current} key={current} />
            ))}
          </Stack>
        </>
      )}

      {isShowingQuestBonus && <h6>Quests</h6>}

      <TabContainer defaultActiveKey={TABS[0].label}>
        <Stack className="overflow-y-hidden" gap={1}>
          <QuestTabsNav tabs={TABS} />

          <hr />

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