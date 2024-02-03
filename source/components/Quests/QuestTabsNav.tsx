import { Badge, Nav, NavItem, NavLink, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconAttention from "@neverquest/icons/attention.svg?react";
import { canCompleteQuests } from "@neverquest/state/quests";
import type { TabsData } from "@neverquest/types/components";
import type { QuestClass } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function QuestTabsNav({ tabs }: { tabs: TabsData<QuestClass> }) {
  const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"));
  const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"));
  const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"));

  return (
    <Nav justify variant="pills">
      {tabs.map(({ Icon, label }) => (
        <NavItem key={label}>
          <NavLink className="d-flex justify-content-center" eventKey={label}>
            <IconDisplay Icon={Icon}>
              <Stack direction="horizontal" gap={2}>
                <span>{capitalizeAll(label)}</span>

                {((label === "conquest" && canCompleteConquests) ||
                  (label === "routine" && canCompleteRoutines) ||
                  (label === "triumph" && canCompleteTriumphs)) && (
                  <div
                    className={getAnimationClass({
                      animation: "pulse",
                      isInfinite: true,
                    })}
                  >
                    <Badge bg="secondary" className="align-middle">
                      <IconImage className="small" Icon={IconAttention} />
                    </Badge>
                  </div>
                )}
              </Stack>
            </IconDisplay>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
